const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-feedback', async (req, res) => {
    const { name, email, message, rating } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'srimanikandanenterprises23@gmail.com',         // <-- replace this
            pass: 'waxi vzpo vgkz siux'             // <-- replace this
        }
    });

    const mailOptions = {
        from: email,
        to: 'srimanikandanenterprises23@gmail.com',              // <-- replace this
        subject: `New Order from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Order sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send Order.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.post('/send-feedback', async (req, res) => {
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: 'srimanikandanenterprises23@gmail.com',
      subject: `📩 New Feedback from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending feedback email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Feedback sent successfully!' });
    });
  });
  app.post('/send-rating', async (req, res) => {
    const { name, email, rating } = req.body;
  
    const mailOptions = {
      from: email,
      to: 'srimanikandanenterprises23@gmail.com',
      subject: `⭐ New Rating from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nRating Given: ${rating} Stars`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending rating email:', error);
        return res.status(500).json({ message: 'Error sending rating email' });
      }
      res.status(200).json({ message: 'Rating sent successfully!' });
    });
  });
    
