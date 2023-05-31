const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler')
const Student=require('../models/studentSchema');
const Staff = require('../models/Staff');

const protect=asyncHandler(async(req,res,next)=>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        // Get token from header
        token=req.headers.authorization.split(' ')[1]
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
     //   console.log(decoded.id)

        //Get user from  the token
        req.student= await Student.findById(decoded.id).select('-password')
       
       
       // console.log(req.student);
        next();
    }catch(error){
    console.log(error);
    res.status(401)
       throw new Error('Not autherized');
    }
  }
  if(!token){
    res.status(401)
    throw new Error('Not autherized,no token');

  }
})



module.exports={protect}