const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserModel = require('../models/studentSchema');
const dotenv=require("dotenv")
const url = require('url');


const token = crypto.randomBytes(20).toString('hex');

router.post('/reset-password', async (req, res) => {
     const { email } = req.body;
     console.log(email);    

     UserModel.findOneAndUpdate({ email: req.body.email }, { resetToken: token, resetTokenExpiry: Date.now() + 3600000 }, { new: true }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({ error: 'User not found' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: "lucyf7612@gmail.com",
              pass: "otaz ljls dzzz emvt"
            }
          });

        //   console.log(transporter)

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

          const mailOptions = {
            from: "lucyf7612@gmail.com",
            to: user.email,
            subject: 'Password reset request',
            html: `Hi ${user.name},<br><br>You have requested to reset your password. Please click on the following link to reset your password:<br><br><a href="${resetLink}">${resetLink}</a><br><br>If you did not request this, please ignore this email and your password will remain unchanged.<br><br>Thanks,<br>The Example Team`
          };

        //   console.log(mailOptions)

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(400).json({ error: 'Could not send reset email' });
            } else {
              console.log('Reset email sent: ' + info.response);
              return res.json({ message: 'Password reset email sent successfully' });
            }
        });
    });
     
      
});

router.post('/newpassword', async (req, res) => {
  const {token1, password ,email} = req.body;

  if (token1 !== token) {
    res.status(400).send('Invalid or expired token');
    return;
  }

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }
  
    user.password = password;
    await user.save();
  
    console.log('User password updated');
  } catch (error) {
    console.error(error);
  }
  
 
  
});


module.exports = router;