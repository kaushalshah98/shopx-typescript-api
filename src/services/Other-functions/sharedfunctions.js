const { nodemailer } = require('../../config/connection');

let sendmail = async (receiver, subject, message, callback) => {
  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', //true for 465, false for other ports
    auth: {
      user: 'shopx589@gmail.com',
      pass: 'shopx@2020'
    }
  });

  let mailOptions = {
    from: 'shopx589@gmail.com', //sender address
    to: receiver, //list of receivers
    subject: subject, // subject line
    //text: message, //body
    html: message
  };

  transporter.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      callback(res);
    }
  });
};
module.exports = { sendmail };
