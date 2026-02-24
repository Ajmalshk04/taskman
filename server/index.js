import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeDatabase, getCoupon } from './db.js';
import { sendCouponEmail } from './email.js';
import { validateEmail, validateName } from './validation.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Debug: Log environment variables
console.log('Environment loaded:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Missing');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set' : '✗ Missing');
console.log('PORT:', PORT);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database
initializeDatabase();

// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    const nameError = validateName(name);
    const emailError = validateEmail(email);

    if (nameError) {
      return res.status(400).json({ error: nameError });
    }
    if (emailError) {
      return res.status(400).json({ error: emailError });
    }

    // Get a random coupon
    const coupon = await getCoupon();
    if (!coupon) {
      return res.status(500).json({ error: 'No coupons available' });
    }

    // Send email with coupon
    await sendCouponEmail(email, name, coupon);

    res.json({ 
      success: true, 
      message: 'Signup successful! Check your email for your coupon.',
      coupon: coupon.code 
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle duplicate email
    if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('email')) {
      return res.status(400).json({ error: 'This email is already registered' });
    }
    
    res.status(500).json({ error: 'Failed to process signup' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
