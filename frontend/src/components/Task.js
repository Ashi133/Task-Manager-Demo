import { useEffect, useState } from "react";
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {

  const [seconds, setSeconds] = useState(0);
  const [mintutes, setMinutes] = useState(0);

  var timer=null;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) { 
      setMinutes(mintutes + 1);
      setSeconds(0);
      }
    }, 1000)

    return () => clearInterval(timer);
  });

  const start = () => {
    setSeconds(0);
    setMinutes(0);
  }

  const stop = () => {
    clearInterval(timer);
  }

  return (
  <>
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(task)} />
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
        <div className='button-wrap'>
          <h5>{mintutes < 10 ? "0" + mintutes : mintutes}:{seconds < 10 ? "0" + seconds : seconds}</h5>
          <button className='button btn-start' onClick={start}>Start</button>
          <button className='button btn-stop' onClick={stop}>Stop</button>
        </div>
      </div>
    </div>
   
    </>
    
    
  )
}

export default Task;