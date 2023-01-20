const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        // const connect = await mongoose.connect()
        mongoose.connect("mongodb://localhost:27017/TaskManagerDB", {
            //    useNewUrlParser: true,
            //    useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (err) {
console.log(err);
    }
};

module.exports = connectdb;