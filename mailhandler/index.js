const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Configure your SMTP transport (replace with your real SMTP credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'info@helixcraftworks.com',
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error occurred while sending email:', err); // Log the error for debugging
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Mail handler listening on port ${PORT}`);
});