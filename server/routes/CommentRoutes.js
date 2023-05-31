const express=require('express')
const router=express.Router();
const {protect}=require("../middleware/authmiddleware")
const {addComment, getallComment} =require("../controllers/commentController")
router.post('/send',addComment);
router.get('/:_id',getallComment);
module.exports=router