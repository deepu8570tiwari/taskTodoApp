const Task = require("../models/task");
const { getChannel } = require("../config/rabbitMQ");

const createTask = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const taskCreated = new Task({ title, description, userId });
    await taskCreated.save();

    const message = { taskId: taskCreated._id, userId, title };
    const channel = getChannel(); // ✅ get the already-connected channel

    if (!channel) {
      return res.status(503).json({ message: "RabbitMQ is not connected" });
    }

    channel.sendToQueue("task_created", Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    res.status(200).json({ message: "Task created successfully", task: taskCreated });
  } catch (error) {
    console.error("Error Saving:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTasks= async(req, res)=>{
    try {
        const tasks= await Task.find();
        res.status(200).json({message:"List of all Tasks",tasks:tasks})
    } catch (error) {
        console.error("Error Saving:",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}
module.exports={createTask,getTasks}