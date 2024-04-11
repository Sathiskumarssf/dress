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
  const { email, password ,name,address} = req.body;
  const sql = `INSERT INTO login (email, password, name, address) VALUES (?, ?, ?, ?)`;
  
     
  db.query(sql, [email, password,name,address], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
      
    }
  });
});


app.post('/remove_product', (req, res) => {
  const { itermcode } = req.body;
  const sql = `DELETE FROM checkout  WHERE iterms_code = ?`;
  
  console.log(itermcode);   
  db.query(sql, [itermcode], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.status(200).json({ message: 'User registered successfully' });
      }
  });
});
app.post('/userinformation', (req, res) => {
  const { useremail } = req.body;
  const sql = `SELECT  name, address FROM login WHERE email = ?`;
  
    
  db.query(sql, [useremail], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
        res.send(result);
      }
  });
});
 


//checkout end point
app.post('/checkout', (req, res) => {
  const {path,name,prize,gender,code,useremail } = req.body;
  const sql = `INSERT INTO checkout(path, name,  prize , gender, iterms_code,useremail) VALUES (?,?,?,?,?,?)`;
  
     
  db.query(sql, [ path,name,prize,gender,code,useremail], (err, result) => {
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

    res.send(results);
  });
}
)
 

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get("/products", (req, res) => {
  const { query } = req.query; // Extract the query parameter from the URL query string
  const sql = "SELECT * FROM products WHERE name LIKE ?";
  const searchTerm = `%${query}%`;
  console.log(query);
  db.query(sql, [searchTerm], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while fetching products' });
    } else {
      res.send(result);
    }
  });
});

app.get("/checkoutproducts", (req, res) => {
  const { useremail } = req.query; // Use req.query to access query parameters
  const sql = "SELECT `path`, `name`, `prize`, `gender`, `iterms_code` FROM `checkout` WHERE useremail = ?";
  db.query(sql, [useremail], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Something went wrong while fetching checkout products" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Root endpoint
 

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});