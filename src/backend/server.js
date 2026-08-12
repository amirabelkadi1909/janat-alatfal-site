import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password (leave empty for default XAMPP)
  database: 'kindergarten_db'
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database!');
    connection.release();
  }
});

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

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});