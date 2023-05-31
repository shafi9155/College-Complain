const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");

const { body, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchAdmin = require('../middleware/fetchAdmin')

const   JWT_SECRET = 'mynameisyasif';

// create admin
router.post(
  "/createAdmin",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 8 }),
  ],
   async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    let admin = await Admin.findOne({email:req.body.email})
    if(admin){
        return res.status(400).json({success,error:"email already exists enter a different email"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    
    admin = await Admin.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      
      })
      // const data = {
      //   admin:{
      //     id:admin.id
      //   }
      // }
      // const authtoken = jwt.sign(data,JWT_SECRET);
      // success = true;
      res.json({
        _id:admin.id,
        name:admin.name,
        email:admin.email,
       token:generateToken(admin.id)
    })
      //res.json({success,authtoken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("some eroor occured")
    }
} 


);


//login admin
router.post(
  "/Adminlogin",
 
  [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
   async (req, res) => {
   
    let success = false;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body)
    try {
    let admin = await Admin.findOne({email:req.body.email})
    if(!admin){
      return res.status(400).json({error:"Invalid Credentials"})
    }
    
    const passwordCompare = await bcrypt.compare(req.body.password,admin.password);
    if(!passwordCompare){
      return res.status(400).json({error:"Invalid Credentials"})
    }
  const data = {
      admin:{
        id:admin.id
      }
    }
   
   res.json({
    _id:admin.id,
    name:admin.name,
    email:admin.email, 
   token:generateToken(admin.id)
})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interneral server error")
    }
  }
);

//creating session
router.post(
  "/getAdmin", fetchAdmin,
   async (req, res) => {
   try {
   const  adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.send(admin)

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Interneral server error")
   }
  }

);
const generateToken=(id)=>{
  console.log(id);
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:'30d',
  })
}
module.exports = router;
