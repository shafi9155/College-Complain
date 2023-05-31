const express = require("express");
const router = express.Router();

const Staff = require("../models/Staff");

const { body, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchStaff = require('../middleware/fetchStaff')

const   JWT_SECRET = 'mynameisyasif';

// create staff
router.post(
  "/createStaff",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    // body("password").isLength({ min: 8 }),
    body("mobileNo").isLength({ min: 10 }),
  ],
   async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    let staff = await Staff.findOne({email:req.body.email})
    if(staff){
        return res.status(400).json({success,error:"email already exists enter a different email"})
    }

    const salt = await bcrypt.genSalt(10);
    const password="12345678"
    const secPass = await bcrypt.hash(password,salt);

    staff = await Staff.create({
        name: req.body.name,
        role: req.body.role,
        password: secPass,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        avatar: req.body.avatar,
        department:req.body.department
      })
      // const data = {
      //   staff:{
      //     id:staff.id
      //   }
      // }
      // const authtoken = jwt.sign(data,JWT_SECRET);
      // success = true;
      res.json({
        _id:staff.id,
        name:staff.name,
        // enrollmentNo:staff.enrollmentNo,
        email:staff.email,
        mobileNo:staff.mobileNo,
        Role:staff.role,
        Department:staff.department,
       token:generateToken(staff.id)
    })

    }catch(error){
        console.error(error.message);
        res.status(500).send("some eroor occured")
    }
} 


);


//login Staff
router.post(
  "/Stafflogin",
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

    try {
    let staff = await Staff.findOne({email:req.body.email})
    if(!staff){
      return res.status(400).json({error:"Invalid Credentials"})
    }
    
    const passwordCompare = await bcrypt.compare(req.body.password,staff.password);
    if(!passwordCompare){
      return res.status(400).json({error:"Invalid Credentials"})
    }
    
    const data = {
      staff:{
        id:staff.id
      }
    }
  //  const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
   // res.json({success,authtoken});
    res.json({
      _id:staff.id,
      name:staff.name,
      enrollmentNo:staff.enrollmentNo,
      email:staff.email,
      mobileNo:staff.mobileNo,
      Role:staff.role,
      Department:staff.department,
     token:generateToken(staff.id)
  })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interneral server error")
    }
  }
);

//creating session
router.post(
  "/getStaff", fetchStaff,
   async (req, res) => {
   try {
    const  staffId = req.staff.id;
    const staff = await Staff.findById(staffId).select("-password");
    res.send(staff)

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Interneral server error")
   }
  }

);

//reset pass
router.post(
  "/resetpass", fetchStaff,
   async (req, res) => {
    console.log( req.staff.id)
    const salt = await bcrypt.genSalt(10);
    const password=req.body.password;
    const secPass = await bcrypt.hash(password,salt);

   try {
    const  staffId = req.staff.id;
    const staff = await Staff.findById(staffId);
  
      if (!user) {
        throw new Error('User not found');
      }
    
      user.password = secPass;
      await user.save();
    
      console.log('User password updated');
    } catch (error) {
      console.error(error);
    }
  }

);


const generateToken=(id)=>{
  console.log(id);
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:'30d',
  })
}

//get staff 
router.get(
  "/getStaffData/:id",
   async (req, res) => {
   try {
    const  staffId = req.params.id;
    const staff = await Staff.findById(staffId).select("-password");
    res.send(staff)

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Interneral server error")
   }
  }

);
//delete user
router.delete(
  "/deleteuser/:id",
   async (req, res) => {
   try {
    const  staffId = req.params.id;
    const staff = await Staff.findByIdAndRemove(staffId)
    res.send(staff)

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Interneral server error")
   }
  }

);
//Get all staff
router.get(
  "/getallStaffData",
   async (req, res) => {
   try {
   
    const staff = await Staff.find();
    res.send(staff)

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Interneral server error")
   }
  }

);
module.exports = router;
