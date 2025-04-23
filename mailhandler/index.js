const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const RECAPTCHA_SECRET = "6LfPSiErAAAAAEojh54-n6dc44WpEyOBNXU-FqEJ";

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
  const { name, email, subject, message, recaptcha } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: "All fields are required. Even the boring ones." });
  }
  if (!recaptcha) {
    return res.status(400).json({ success: false, error: "reCAPTCHA is missing. Robots, begone!" });
  }
  // Verify reCAPTCHA
  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptcha}`
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return res.status(400).json({ success: false, error: "reCAPTCHA failed. Either you're a robot, or you clicked too fast. Try again, human!" });
    }
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'info@helixcraftworks.com',
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error occurred while sending email or verifying reCAPTCHA:', err);
    res.status(500).json({ success: false, error: "Our server tripped over a toolbox. Try again later, or send a carrier pigeon!" });
  }
});

app.listen(PORT, () => {
  console.log(`Mail handler listening on port ${PORT}`);
});