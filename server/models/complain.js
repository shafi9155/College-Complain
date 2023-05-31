const mongoose=require("mongoose");
const complain=new mongoose.Schema({
       title:{
        type:String,
        required:true
       },
       desc:{
        type:String,
        required:true
       },
       photo:{
        type:String,
       },
       status:{
        type:String,
       },
       assigned: [{
        assignedto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff'},
        role:{
          type:String
        },
        time:{
          type:Date,
        }
      }],
       user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'STUDENT'
       },
       complain_type:{
        type:String,
        required:true,
       },
       
       complain_regarding:{
        type:String,
        required:true,
       },
       upvotes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'STUDENT'
        }
      ]
},
{
    timestamps: true
    
}
)
const Complain=mongoose.model('COMPLAIN',complain);
module.exports=Complain;