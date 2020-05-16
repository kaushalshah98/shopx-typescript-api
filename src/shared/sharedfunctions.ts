import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import Mail from 'nodemailer/lib/mailer';

export class SendMail {
  public sendmail = async (receiver: string, subject: string, message: string, callback: any) => {
    // create reusable transporter object using the default SMTP transport
    const transporter: Mail = nodemailer.createTransport({
      service: 'gmail', // true for 465, false for other ports
      auth: {
        user: 'shopx589@gmail.com',
        pass: 'shopx@2020'
      }
    });

    const mailOptions: MailOptions = {
      from: 'shopx589@gmail.com', // sender address
      to: receiver, // list of receivers
      subject, // subject line
      // text: message, //body
      html: message
    };

    transporter.sendMail(mailOptions, (error: Error | null, res: any): void => {
      if (error) {
        callback(error);
      } else {
        callback(res);
      }
    });
  };
}
