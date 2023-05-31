const express=require('express')
const router=express.Router();
const {protect}=require("../middleware/authmiddleware")
const {registerComplain,assignComplaint,getclosedComplaint,getactiveComplaint, getComplain,deleteComplain,getAllComplain,getPublicComplain,getEveryComplain, escalateComplaint, closeComplaint, getnewComplaint, upvoteComplaint} =require('../controllers/complainController');
const {upload}=require("../middleware/upload")
router.get('/compl/:_id',getComplain);
router.delete('/delete/:_id',deleteComplain);
router.put('/assignComplain/:_id',assignComplaint)
router.post('/register',protect,upload.array('photo', 5),registerComplain);
router.put('/escalateComplain/:_id',escalateComplaint);
router.put('/closeComplain/:_id',closeComplaint);
router.get('/newComplain/:Role',getnewComplaint);
router.get('/activeComplain/:Role',getactiveComplaint);
router.get('/closedComplain/:Role',getclosedComplaint);
router.get('/',protect,getAllComplain);
router.get('/allComplain',getEveryComplain);
router.get('/PublicComplain',getPublicComplain);
router.put('/upvote/:_id',protect,upvoteComplaint);
module.exports=router