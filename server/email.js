import nodemailer from 'nodemailer';
import { recordSignup } from './db.js';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify connection on startup
    transporter.verify((error, success) => {
      if (error) {
        console.error('Email transporter error:', error.message);
      } else {
        console.log('Email transporter ready');
      }
    });
  }
  return transporter;
}

export async function sendCouponEmail(email, name, coupon) {
  const transporter = getTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your TaskMan Coupon: ${coupon.code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to TaskMan, ${name}!</h2>
        
        <p style="color: #666; font-size: 16px;">
          Thank you for signing up. We're excited to have you on board!
        </p>
        
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="color: #999; margin: 0 0 10px 0; font-size: 14px;">Your exclusive coupon code:</p>
          <h1 style="color: #007bff; margin: 0; font-size: 32px; letter-spacing: 2px;">
            ${coupon.code}
          </h1>
          <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
            ${coupon.description}
          </p>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Use this code when you start your free trial to get ${coupon.discount_percent}% off your first month.
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Best regards,<br/>
          The TaskMan Team
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await recordSignup(name, email, coupon.code);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Email sending error:', error.message);
    throw error;
  }
}
