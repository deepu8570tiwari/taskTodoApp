const express= require("express");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const {connectRabbitMq}=require("./configs/rabbitMQ");
const app=express();
app.use(bodyParser.json());
dotenv.config();
app.listen(process.env.NODE_PORT, async () => {
  console.log(`Server is running on ${process.env.NODE_PORT}`);
  await connectRabbitMq(); // connect once here, before any controller uses it
});