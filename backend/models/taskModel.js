const mongoose = require("mongoose");

const taskschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please add a task"]
        },
        completed: {
            type: Boolean,
            require: true,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Task", taskschema);