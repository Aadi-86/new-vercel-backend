import mongoose from "mongoose";

const SignupModelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const SignupModel = mongoose.model("SignUp",SignupModelSchema)
export default SignupModel