const password = document.getElementById("pass");
const submit = document.getElementById("submit");
const anchor = document.getElementById("a");
const name = document.getElementById("name");
const email = document.getElementById("email");
const tel = document.getElementById("tel");

let otpVal = Math.floor(Math.random() * 10000);


document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    let emailBody =`your otp is${otpVal}`;
    alert(`otp value is:${otpVal}`);
    Email.send({
        SecureToken : "bb00bd7e-2917-4fdb-8339-54d10888c406",
        To : email.value,
        From : "kiaackerman03@gmail.com",
        Subject : "Email Verification",
        Body : emailBody
    }).then(
      message => {
        if(message==="ok"){
            alert("otp sent");
        }
        
      }
    );
    document.getElementById("otp").style.display = 'block';
})



window.addEventListener("load", () => {
    document.getElementById("otp").style.display="none";
})

document.getElementById("pass").addEventListener("keyup", (e) => {
    const value = e.currentTarget.value;
    if(value.length !=10 || name.value ==="" || tel.value ==="" || email.value ===""){
    submit.disabled = true;
    }
    else{
        submit.disabled = false;
        submit.classList.add("hover");
    }
});




//otp part---------------



const verify = document.querySelector(".verify");
const input = document.getElementById("otpval");



verify.addEventListener("click",()=> {
    if(input.value == otpVal){
        window.location.href="signin.html";
    }
    else{
        alert("invalid otp");
    }
})








// document.getElementById('signupForm').addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const formData = new FormData(this);
//     const data = {
//         name: formData.get('name'),
//         email: formData.get('email'),
//         phone: formData.get('phone'),
//         password: formData.get('password')
//     };

//     const response = await fetch('/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });

//     if (response.ok) {
//         alert('Signup successful!');
//     } else {
//         alert('Signup failed.');
//     }
// });




const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2003@Arpana',
    database: 'signup_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
// Signup Page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Signup Form POST Endpoint
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const INSERT_USER_QUERY = `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?)`;
    db.query(INSERT_USER_QUERY, [name, email, phone, password], (err, result) => {
        if (err) {
            res.status(500).send('Error saving user to database');
            throw err;
        }
        res.redirect('/signup-success'); // Redirect to success page after signup
    });
});

// Signup Success Page
app.get('/signup-success', (req, res) => {
    res.send('Signup Successful!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






