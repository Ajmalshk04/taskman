# TaskMan Landing Page - Setup Guide

## Backend Setup (Coupon & Email System)

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Service

#### Using Gmail (Recommended for testing)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate an [App Password](https://myaccount.google.com/apppasswords)
4. Copy the 16-character password

#### Using Other Email Services
- **SendGrid**: Use API key as password
- **Mailgun**: Configure SMTP credentials
- **AWS SES**: Use SMTP credentials

### 3. Create `.env` File
Copy `.env.example` to `.env` and fill in your credentials:

```env
PORT=3001
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 4. Run the Backend Server
```bash
npm run server
```

The server will start on `http://localhost:3001`

### 5. Run the Frontend (in another terminal)
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Database

The system uses SQLite3 for simplicity. The database file (`coupons.db`) is automatically created in the `server/` directory.

### Database Schema

**Coupons Table:**
- `id`: Primary key
- `code`: Unique coupon code
- `discount_percent`: Discount percentage
- `description`: Coupon description
- `is_used`: Flag to track if coupon has been used
- `created_at`: Timestamp

**Signups Table:**
- `id`: Primary key
- `name`: User's name
- `email`: User's email
- `coupon_code`: Associated coupon code
- `signed_up_at`: Timestamp

### Initial Coupons
The system seeds 6 sample coupons on first run:
- TASKMAN20 (20% off)
- TASKMAN25 (25% off)
- TASKMAN30 (30% off)
- WELCOME15 (15% off)
- WELCOME35 (35% off)
- SAVE50 (50% off)

You can add more coupons by modifying `server/db.js` or directly in the database.

## Form Validation

The signup form includes validation for:
- **Name**: 2-100 characters, letters/spaces/hyphens/apostrophes only
- **Email**: Valid email format, max 254 characters

## Troubleshooting

### "Failed to connect to server"
- Ensure backend is running: `npm run server`
- Check that port 3001 is not in use
- Verify CORS is enabled

### "Email sending failed"
- Check `.env` credentials are correct
- Verify 2FA and App Password for Gmail
- Check email service status
- Review server logs for detailed error

### Database issues
- Delete `server/coupons.db` to reset
- Restart the server to reinitialize

## Production Deployment

For production:
1. Use environment variables from your hosting platform
2. Consider using a managed database (PostgreSQL, MySQL)
3. Use a production email service (SendGrid, Mailgun, AWS SES)
4. Enable HTTPS
5. Add rate limiting to `/api/signup`
6. Implement CSRF protection
7. Add request validation middleware
