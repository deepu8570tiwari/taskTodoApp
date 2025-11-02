const amqp = require("amqplib");
const dotenv=require("dotenv");
dotenv.config();
let channel;
const connectRabbitMq = async () => {
    try {
        const connection = await amqp.connect({
            protocol:process.env.RabbitMQ_protocol,
            hostname: process.env.RabbitMQ_hostname,
            port: process.env.RabbitMQ_port,
            username: process.env.RabbitMQ_username,
            password:process.env.RabbitMQ_password
        });

        channel = await connection.createChannel();
        await channel.assertQueue("task_created");
        console.log("Notification service is listening to your message");
        channel.consume("task_created",(msg)=>{
            const taskData=JSON.parse(msg.content.toString())
            console.log("Notification : New task:", taskData.title);
            console.log("Notification : New task:", taskData);
            channel.ack(msg);
        })
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
    }
};
module.exports= {connectRabbitMq};