const mongoose=require("mongoose");
const TaskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    }
},{timestamps:true});
const Task=mongoose.model("tasks",TaskSchema);
module.exports=Task;