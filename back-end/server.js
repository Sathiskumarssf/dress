const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors  = require('cors')
const app = express();
app.use(cors())
const port = 5000;

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'signup',
  port: 3306
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const sql = `INSERT INTO login (email, password) VALUES (?, ?)`;
  
     
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

app.post('/login', (req, res) => {

  const { email, password } = req.body;

  const sql = 'SELECT * FROM login WHERE email = ? and password = ?';
  db.query(sql, [email,password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'User login successfully' });
  });
}
)
// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
