//takes custome message, userEmailID and send Email to user
import nodemailer from 'nodemailer';

export async function notifyByEmail(userEmail: string, message: string) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOTIFICATION_SENDER_EMAIL,
      pass: process.env.NOTIFICATION_SENDER_PASS,
    },
  });
  let mailDetails = {
    from: `"Price Tracker App" <${process.env.NOTIFICATION_SENDER_EMAIL}>`,
    to: userEmail,
    subject: 'Price Tracker App Notification',
    text: message,
  };
  transporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.error('Error Occurs: ', err);
    } else {
      console.log('Email sent successfully');
    }
  });
}
