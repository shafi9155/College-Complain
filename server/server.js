const express=require("express")
const nodemailer = require("nodemailer");
const dotenv=require("dotenv")
const bodyParser = require("body-parser");
const multer=require('multer');
var cors = require('cors')
const app=express();
app.use(express.json());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config({path:'./config.env'});

const PORT=process.env.PORT;

app.use('/uploads',express.static('uploads'))


//Database Connection
require('./db/config')

app.use('/api/students',require('./routes/studentRoutes'))

app.use('/api/complain',require('./routes/ComplainRoutes'))
app.use('/api/recovery',require('./routes/resetPass'))

app.use('/api/complain/comments',require('./routes/CommentRoutes'))

app.use('/api/admin',require('./routes/Admin'))
app.use('/api/staff',require('./routes/Staff'))

//listening
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT} `)
})
