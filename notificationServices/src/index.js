const express= require("express");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const connectDB=require("./config/database");
const userRoutes = require("./routes/routes");
const app=express();
app.use(bodyParser.json());
dotenv.config();
app.use("/api/v1", userRoutes);
app.listen(process.env.NODE_PORT,()=>{
    console.log(`Server is running on ${process.env.NODE_PORT}`);
    connectDB();
})