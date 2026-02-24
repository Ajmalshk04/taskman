import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'coupons.db');

const db = new sqlite3.Database(dbPath);

export function initializeDatabase() {
  db.serialize(() => {
    // Create coupons table
    db.run(`
      CREATE TABLE IF NOT EXISTS coupons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        discount_percent INTEGER NOT NULL,
        description TEXT,
        is_used INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create signups table
    db.run(`
      CREATE TABLE IF NOT EXISTS signups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        coupon_code TEXT,
        signed_up_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (coupon_code) REFERENCES coupons(code)
      )
    `);

    // Seed initial coupons if table is empty
    db.get('SELECT COUNT(*) as count FROM coupons', (err, row) => {
      if (row.count === 0) {
        const initialCoupons = [
          { code: 'TASKMAN20', discount: 20, desc: '20% off your first month' },
          { code: 'TASKMAN25', discount: 25, desc: '25% off your first month' },
          { code: 'TASKMAN30', discount: 30, desc: '30% off your first month' },
          { code: 'WELCOME15', discount: 15, desc: '15% off your first month' },
          { code: 'WELCOME35', discount: 35, desc: '35% off your first month' },
          { code: 'SAVE50', discount: 50, desc: '50% off your first month' },
        ];

        initialCoupons.forEach(coupon => {
          db.run(
            'INSERT INTO coupons (code, discount_percent, description) VALUES (?, ?, ?)',
            [coupon.code, coupon.discount, coupon.desc]
          );
        });
      }
    });
  });
}

export function getCoupon() {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM coupons WHERE is_used = 0 ORDER BY RANDOM() LIMIT 1',
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
}

export function markCouponAsUsed(couponCode) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE coupons SET is_used = 1 WHERE code = ?',
      [couponCode],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}

export function recordSignup(name, email, couponCode) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO signups (name, email, coupon_code) VALUES (?, ?, ?)',
      [name, email, couponCode],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}
