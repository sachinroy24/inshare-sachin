const nodemailer=require("nodemailer");

 async function sendMail({from,to,subject,text,html}){

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
       
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, // generated ethereal user
          pass: process.env.MAIL_PASS // generated ethereal password
        }
      });

      let info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text  body
        html: html, // html body
      });
    //  console.log(info);
    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou.
};

module.exports=sendMail;