const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2003@Arpana', // Replace with your actual password
    database: 'animal_sanctuary_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL Database.');
});

// Serve static files from 'zoo' directory
app.use(express.static(path.join(__dirname, 'zoo')));

// Serve search.html when accessing '/search'
app.get('/search-specie', (req, res) => {
    res.sendFile(path.join(__dirname, 'zoo', 'search.html'));
});


app.get('/search-specie', (req, res) => {
    const { specie_name } = req.query;
    console.log('Searching for specie:', specie_name);

    const sql = 'SELECT * FROM animal WHERE specie_name LIKE ?';
    db.query(sql, [`%${specie_name}%`], (err, results) => {
        if (err) {
            console.error('Error searching specie:', err);
            res.status(500).send('Server error'); // Internal server error
        } else if (results.length === 0) {
            res.status(404).send('Species not found'); // No species found
        } else {
            console.log('Found species:', results);
            res.status(200).json(results); // Send results as JSON
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
