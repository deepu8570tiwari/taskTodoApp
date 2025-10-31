const express= require("express");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const connectDB=require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const app=express();
app.use(bodyParser.json());
dotenv.config();
app.use("/api/v1", taskRoutes);
app.listen(process.env.NODE_PORT,()=>{
    console.log(`Server is running on ${process.env.NODE_PORT}`);
    connectDB();
})