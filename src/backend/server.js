import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// Enable CORS so your Vercel frontend can send requests
app.use(cors());
app.use(express.json());

// Database Connection Pool using Environment Variables (Render / TiDB)
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kindergarten_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 4000,
  // SSL Configuration required by TiDB Cloud
  ssl: process.env.DB_HOST ? {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  } : false
});

// Test Connection on Server Startup
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Successfully connected to Database! 🎉');
    connection.release();
  }
});

// Registration Endpoint
app.post('/api/register', (req, res) => {
  const { childName, parentName, age, phone, email, message } = req.body;

  if (!childName || !parentName || !age || !phone) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const sql = `
    INSERT INTO registrations (child_name, parent_name, age, phone, email, message) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.execute(
    sql,
    [childName, parentName, age, phone, email || null, message || null],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to submit registration.' });
      }
      return res.status(201).json({ message: 'Registration submitted successfully!' });
    }
  );
});

// Listen on Render's dynamic PORT variable (defaults to 5000 locally)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

// Admin Auth Middleware Helper
const checkAdminAuth = (req, res, next) => {
  const adminPassword = req.headers['x-admin-password'];
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (adminPassword !== expectedPassword) {
    return res.status(401).json({ error: 'Access denied: Invalid password' });
  }
  next();
};

// GET: Retrieve all registrations (Admin only)
app.get('/api/admin/registrations', checkAdminAuth, (req, res) => {
  const sql = 'SELECT * FROM registrations ORDER BY created_at DESC';
  db.execute(sql, (err, results) => {
    if (err) {
      console.error('Error fetching registrations:', err);
      return res.status(500).json({ error: 'Failed to fetch data.' });
    }
    return res.json(results);
  });
});

// DELETE: Remove a registration by ID (Admin only)
app.delete('/api/admin/registrations/:id', checkAdminAuth, (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM registrations WHERE id = ?';
  db.execute(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).json({ error: 'Failed to delete record.' });
    }
    return res.json({ message: 'Record deleted successfully!' });
  });
});;