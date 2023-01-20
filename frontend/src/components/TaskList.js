import TaskForm from "./TaskForm"
import Task from "./Task"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import loadingImg from "../assets/loader.gif";

const TaskList = () => {
  const [task, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isloading, SetIsloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const [formData, setFromData] = useState({
    name: "",
    completed: false
  })
  const { name } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFromData({ ...formData, [name]: value })
  };

  const getTasks = async () => {
    SetIsloading(true)
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks");
      setTasks(data);
      // console.log(response);
      SetIsloading(false);
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
      SetIsloading(false);
    }
  };

  useEffect(() => {
    getTasks()
  }, []);

  const createTask = async (e) => {
    e.preventDefault()
    // console.log(formData);
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post("http://localhost:5000/api/tasks", formData);
      toast.success("Task added successfully");
      setFromData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const cTask = task.filter((task) => {
      return task.completed === true
    })
    setCompletedTasks(cTask);
  }, [task]);


  const getSingleTask = async (task) => {
    setFromData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };


  const updateTask = async (e) => {
    e.preventDefault()
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskID}`, formData);
      setFromData({ ...formData, name: "" })
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    }
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2> Task Manager </h2>
      <TaskForm name={name} handleInputChange={handleInputChange} creatTask={createTask} isEditing={isEditing}
        updateTask={updateTask} />
      {task.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {task.length}
          </p>
          <p>
            <b>Task Completed:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {
        isloading && (
          <div className="--flex-center">
            <img src={loadingImg} alt="LOADING" />
          </div>
        )
      }
      {
        !isloading && task.length === 0 ? (
          <p className="--py"> No task added. Please add a task</p>
        ) : (
          <>
            {task.map((task, index) => {
              return (
                <Task key={task._id} task={task} index={index} deleteTask={deleteTask}
                  getSingleTask={getSingleTask} setToComplete={setToComplete} />
              )
            })}
          </>

        )
      }

    </div>
  )
}

export default TaskList;