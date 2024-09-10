const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lucinda.botsford@ethereal.email',
        pass: 'F89JdefBSkhjxxE2fm'
    }
});

  const mailOptions = {
    from: 'lucinda.botsford@ethereal.email',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
