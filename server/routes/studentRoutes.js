const express=require('express')
const router=express.Router();
const {registerStudent,getStudent,loginStudent,getallStudent, getStudentbyid}=require('../controllers/studentController')
const {protect}=require('../middleware/authmiddleware')
router.post('/',registerStudent)
router.post('/login',loginStudent)
router.get('/me',protect,getStudent)

router.get('/getallStudent',getallStudent)
router.get('/getStudent/:_id',getStudentbyid)

module.exports=router