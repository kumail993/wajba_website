
const express=require('express');
const router=express.Router();
var db=require('./server.js');
const nodemailer = require("nodemailer");

const app = express();

router.route('/contactus').post((req, res) => {
    const { name, email, phone, message } = req.body;
    console.log(req.body);


    // Create a transporter object using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use a supported email service (e.g., 'Gmail', 'Outlook')
      auth: {
        user: 'no.reply.wajba@gmail.com', // Your email address
        pass: 'lskisxmisxmnqjqr' // Your email password or app-specific password
      }
    });
  
    // Email message details
    const mailOptions = {
      from: 'no.reply.wajba@gmail.com',
      to: email, // Admin's email address
      subject: 'New Contact Form ',
      html: `<html>

      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: white;
          }
      
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
          }
      
          .header {
            color: #ff8c00;
            font-size: 24px;
            margin-bottom: 10px;
            text-align: center;
          }
      
          .info {
            font-size: 18px;
            margin-bottom: 15px;
          }
      
          .message {
            font-size: 16px;
            margin-top: 20px;
          }
      
          .footer {
            font-size: 14px;
            margin-top: 20px;
            color: #fff;
            background-color: #ff8c00;
            padding: 10px;
            text-align: center;
          }
      
          .logo {
            display: block;
            margin: 0 auto;
            text-align: center;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="header">Contact Us Form Submission</div>
          <div class="info">
            <p><strong>Name:</strong>${name}</p>
            <p><strong>Email:</strong>${email}</p>
            <p><strong>Phone:</strong>${phone}</p>
            <p><strong>Message:</strong></p>
            <p> ${message}</p>
          </div>
          <div class="footer">
            Best regards,<br />
            Your Contact Us Team
          </div>
        </div>
      </body>
      
      </html>
      `
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Form submitted successfully!' });
      }
    });
    
  });



module.exports =router;