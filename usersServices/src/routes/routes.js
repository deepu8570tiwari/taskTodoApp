const express= require("express");
const router=express.Router();
const {createUser, getAllUser}=require("../controllers/users");
router.post("/users", createUser);
router.get("/users", getAllUser);
module.exports=router;