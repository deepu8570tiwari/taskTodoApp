const Task= require("../models/task");
const createTask=async(req,res)=>{
    const {title,description, userId}=req.body;
    try {
        const taskCreated=new Task({title, description,userId});
        await taskCreated.save();
        res.status(200).json({message:"Task created successfully", task:taskCreated});
    } catch (error) {
        console.error("Error Saving:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}
const getTasks= async(req, res)=>{
    try {
        const tasks= await Task.find();
        res.status(200).json({message:"List of all Tasks",tasks:tasks})
    } catch (error) {
        console.error("Error Saving:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}
module.exports={createTask,getTasks}