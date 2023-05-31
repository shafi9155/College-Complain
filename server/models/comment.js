const mongoose=require('mongoose');
const comment=new mongoose.Schema({
   
    desc:{
        type:String,
        required:"true"
    },
    photo:{
        type:Array,
    },
    complain_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'COMPLAIN'
    },
    name:{
        type:String,
        required:"true"
    },
    role:{
        type:String,
        required:"true"
    }
},{
    timestamps: true
    
})
const Comment=mongoose.model('COMMENT',comment);
module.exports=Comment;