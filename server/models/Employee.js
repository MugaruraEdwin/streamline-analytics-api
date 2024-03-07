import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    }, 
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    confirmpassword:{ 
        type:String,
        required:true,
        trim:true
    }
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)

export default EmployeeModel;