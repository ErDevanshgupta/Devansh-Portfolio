const nodemailer = require('nodemailer');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = require('../config/env');

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

// Email sent TO you when someone contacts you
const sendContactNotification = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from: `"Portfolio" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: `[Portfolio Contact] ${subject}`,
    html: `
      <h2>New message from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  });
};

// Auto-reply sent TO the person who contacted you
const sendAutoReply = async ({ name, email }) => {
  await transporter.sendMail({
    from: `"Devansh Gupta" <${EMAIL_USER}>`,
    to: email,
    subject: 'Thanks for reaching out!',
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for your message! I've received it and will get back to you within 24-48 hours.</p>
      <p>Best,<br>Devansh Gupta</p>
    `
  });
};

module.exports = { sendContactNotification, sendAutoReply };
