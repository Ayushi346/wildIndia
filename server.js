const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2003@Arpana', // Replace with your actual password if you have set one
    database: 'signup_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

app.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;

    const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('User registered');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
