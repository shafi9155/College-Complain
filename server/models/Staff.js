const mongoose=require("mongoose");

const staffSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name']
    },
    role:{
        type:String,
      required:[true,'Please enter staff role '],
    },
    department:{
        type:String,
      required:[true,'Please enter department'],
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
const Staff = mongoose.model('staff',staffSchema);
module.exports = Staff;