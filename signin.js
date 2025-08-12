


const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const connection = createConnection(
    {
        host: "localhost",
        user: "root",
        password: "2003@Arpana",
        database: "signup_db",
        insecureAuth : true
    }
);

connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database successfully!")
})

app.get("/",function(reg,res){
    res.sendFile(_dirname + "/signin.html");
})




app.post("/",encoder,function(req,res){
    var change = req.body.change;
    var password = req.body.password;

    connection.query("select *from users where name=? and password= ?",[change,password],function(error,results,fields){
        if(results.length > 0){
            res.redirect("/search");
        }else{
            res.redirect("/signin");
            alert("Wrong Password or Email");
        }
        res.end();
    })
})

app.get("/index",function(req,res){
    res.sendFile(_dirname+ "/search.html")
})
app.listen(4000);














