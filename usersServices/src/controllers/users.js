const User= require("../models/users");
const createUser= async(req, res)=>{
    const {name, email}=req.body;
    try {
        const users= new User({name, email});
        await users.save();
        res.status(200).json(users)
    } catch (error) {
        console.error("Error Saving:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}
module.exports= {createUser}