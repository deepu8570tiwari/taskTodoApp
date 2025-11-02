const amqp = require("amqplib");
const dotenv = require("dotenv");
dotenv.config();

let channel = null;

const connectRabbitMq = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      const connection = await amqp.connect({
        protocol: process.env.RabbitMQ_protocol,
        hostname: process.env.RabbitMQ_hostname,
        port: process.env.RabbitMQ_port,
        username: process.env.RabbitMQ_username,
        password: process.env.RabbitMQ_password,
      });

      channel = await connection.createChannel();
      console.log("✅ Connected successfully to RabbitMQ");
      await channel.assertQueue("task_created");
      return channel;
    } catch (error) {
      console.error(`❌ Failed to connect to RabbitMQ, retries left: ${retries - 1}`);
      retries -= 1;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("RabbitMQ connection failed after multiple retries");
};

// export a getter for channel
const getChannel = () => channel;

module.exports = { connectRabbitMq, getChannel };
