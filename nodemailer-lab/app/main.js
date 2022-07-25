// https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324
// https://nodemailer.com/about/
// https://ethereal.email

// NOTE: This demo uses https://ethereal.email to test this out. This service does not send out emails.
// Emails sent using this SMTP are stored on the server and can be accessed by the link provided
// in the console.

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    // host: "smtp.gmail.com",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass  // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: testAccount.user, // sender address
    to: "kyle.smith@acme.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Just testing the nodemailer package!", // plain text body
    html: "Just testing the <b><i>nodemailer</i></b> package!", // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
