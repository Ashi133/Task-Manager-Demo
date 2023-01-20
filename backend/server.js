//const dotenv = require("dotenv").config();
const express = require("express");
// const connectdb = require("./config/connectiondb");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./route/taskRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/tasks",taskRoutes);


//const logger = (req, res, next) => {
//  console.log("middleware ran");  
// console.log(req.method);
//next();
//};

//Routes start from here
//Get Route
app.get("/", (req, res) => {
    res.send("Task Created");
});


// connectdb();
const PORT = 5000;

// const startServer = async () => {
//     try {
//         await connectdb();
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);  //npm run backend //npm start
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };

// startServer();
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/taskmanagerDB")
    .then(() => console.log("Connection Successfully"))
    .catch((error) => console.log(error));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  //npm run backend //npm start
});
