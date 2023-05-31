const asyncHandler=require('express-async-handler');
const Complain = require('../models/complain');
const Student=require('../models/studentSchema')
const Staff = require('../models/Staff');


const StaffHierarchy={
  Mess: ["Mess Committee", "Mess Manager", "Assistant Registrar","Deputy Registrar", "Director"],
  Hostel: ["Hostel Committee","Assistant Warden", "Deputy Registrar","Director"],
  Academics: ["Faculty", "Head of Department", "Dean","Director"],
}
const registerComplain=asyncHandler( async(req,res)=>{
   
    const {title,desc,complain_type,complain_regarding}=req.body;
   // console.log(req)
     if(!title||!desc||!complain_type||!complain_regarding){
        res.status(400);
        throw new Error('Please add all data')
     }
     
    //  console.log(req.body.photo)
    let photo;
  //  console.log(req.files)
  //   if(req.files){
  //     let path=''
  //     req.files.forEach(function(files,index,arr){
  //       path=path+files.path+','
  //     })
  //     path=path.substring(0,path.lastIndexOf(","))
  //     photo=path
  //   }
    //Create Complain
     const complain= await Complain.create({
     title,
     desc,
     photo,
      status:"Open",
      comments:[],
      user_id:req.student.id,
      complain_type,
      complain_regarding,
      assigned:{assignedto:null,role:StaffHierarchy[complain_regarding][0],time:Date.now()}
    
     })
     if(complain){
        res.status(201).json({
            _id:complain.id,
            title:complain.title,
            desc:complain.desc,
            complain_type:complain.complain_type,
            complain_regarding:complain.complain_regarding,
          })
     }
     else{
        res.status(400)
        throw new Error('Invalid data')
     }
})
//Delete Complain

const deleteComplain=asyncHandler(async(req,res)=>{
  
   try {
      const compl = await Complain.findById(req.params._id);
      const user=await Student.findById(compl.user_id);
     if (user.name === req.body.user) {
        try {
          await compl.delete();
          res.status(200).json("Complain has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
})
//Get Complain
const getComplain=asyncHandler(async(req,res)=>{
 
   try {
     
      const compl = await Complain.findById(req.params._id);
    
      res.status(200).json(compl);
    } 
    catch (err) {
      res.status(500).json(err);
    }
})
const getEveryComplain=asyncHandler(async(req,res)=>{
 
  try {
     const compl = await Complain.find();
   
     res.status(200).json(compl);
   } 
   catch (err) {
     res.status(500).json(err);
   }
})
//Get complain of user

const getAllComplain=asyncHandler(async(req,res)=>{
  const userid = req.student.id;
 
  try {
    let complains;
    if (userid) {
      complains = await Complain.find({ user_id:userid }).sort({ createdAt: 'desc'}).exec();
    }  else {
      complains = await Complain.find();
    }
    res.status(200).json(complains);
  } catch (err) {
    res.status(500).json(err);
  }
 
})

//Get all public Complain
const getPublicComplain=asyncHandler(async(req,res)=>{
  
  try {
    let complains;

      complains = await Complain.find({complain_type:"Public"}).sort({ createdAt: 'desc'}).exec();;
    
    res.status(200).json(complains);
  } catch (err) {
    res.status(500).json(err);
  }
 
})
//Get all open complaint
const getnewComplaint=asyncHandler(async(req,res)=>{

  
  try {
    let result = [];
 
   let complains
    complains= await Complain.find();
     complains.map((cpl)=>{
      const lastindex = cpl.assigned.length -1;
     
      if(cpl.assigned[lastindex].role === req.params.Role && cpl.assigned[lastindex].assignedto === null ){
        result.push(cpl);
      }
    });

      res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
 
})
//Get all active complain
const getactiveComplaint=asyncHandler(async(req,res)=>{
  
  try {
    let result = [];
 
    let complains
     complains= await Complain.find();
      complains.map((cpl)=>{
       const lastindex = cpl.assigned.length -1;
      
       if(cpl.assigned[lastindex].role === req.params.Role && cpl.assigned[lastindex].assignedto !== null && 
        cpl.status==='IN_PROGRESS' ){
         result.push(cpl);
       }
     });
 
       res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
 
})
//get all closed complain
const getclosedComplaint=asyncHandler(async(req,res)=>{
  
  try {
    let result = [];
 
    let complains
     complains= await Complain.find();
      complains.map((cpl)=>{
       const lastindex = cpl.assigned.length -1;
      
       if(cpl.assigned[lastindex].role === req.params.Role && cpl.assigned[lastindex].assignedto !== null && 
        cpl.status==='Closed' ){
         result.push(cpl);
       }
     });
 
       res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
 
})
const assignComplaint =asyncHandler(async(req,res)=>{
 
  try {
  const complaint = await Complain.findById(req.params._id);
     const staff=await Staff.findById(req.body.assignedTo)
     const l=complaint.assigned.length;

    complaint.assigned[l-1]={
      assignedto :req.body.assignedTo,
    role:staff.role,
     time:complaint.assigned[l-1].time
    };
    complaint.status = 'IN_PROGRESS';
   
    await complaint.save().then(function(err) {
      if (!err) {
        res.status(200).json();
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    console.error(err);
  }})

  const escalateComplaint =asyncHandler(async(req,res)=>{
  try {
      const complaint = await Complain.findById(req.params._id);
      const l=complaint.assigned.length;
        const currentLevel = complaint.assigned[l-1].role;
          const hierarchy = StaffHierarchy[req.body.department];
         const currentLevelIndex = hierarchy.indexOf(currentLevel);

    if (currentLevelIndex === hierarchy.length - 1) {
      // We've reached the highest level of authority for this department
      res.status(400).json("Reached Highest Level");
    }
    complaint.assigned.push({
      role:hierarchy[currentLevelIndex+1],
      assignedto: null,
      time:Date.now()
    });
      
        await complaint.save().then(function(err) {
          if (!err) {
            res.send("Successfully Added to the DataBase.");
          } else {
            res.send(err);
          }
        });
            } catch (err) {
            console.error(err);
          }})
  
    const closeComplaint =asyncHandler(async(req,res)=>{
      try {
          const complaint = await Complain.findById(req.params._id);
             complaint.status="Closed"
           await complaint.save()
         .then(function(err) {
        if (!err) {
          res.send("Successfully Added to the DataBase.");
        } else {
          res.send(err);
        }
      })
          }
           catch (err) {
          console.error(err);
        }})
      
        const upvoteComplaint =asyncHandler(async(req,res)=>{
          try {
              const complaint = await Complain.findById(req.params._id);
              const userId=req.student.id
                 complaint.upvotes.push(userId)
               await complaint.save()
             .then(function(err) {
            if (!err) {
              res.status(200).json();
            } else {
              res.send(err);
            }
          })
              }
               catch (err) {
              console.error(err);
            }})
          
    

  
module.exports={registerComplain,upvoteComplaint,getclosedComplaint,getactiveComplaint,getnewComplaint,getEveryComplain,escalateComplaint,closeComplaint,deleteComplain,getComplain,getAllComplain,getPublicComplain,assignComplaint}