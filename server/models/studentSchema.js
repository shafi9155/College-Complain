const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name']
    },
    enrollmentNo:{
        type:String,
        required:[true,'Please enter your enrollment number'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please enter your email id'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
    },
    
    mobileNo :{
        type:Number,
        required:[true,'Please enter your mobile Number'],
    },
    avatar:{
        type:String
    }
})
const Student=mongoose.model('STUDENT',studentSchema);
module.exports=Student;