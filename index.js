const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const { urlencoded } = require('body-parser');
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "meteor0323",
    database: "loginAndSignup",
});
app.get("/",(req,res)=>{
    // const sqlInsert = "INSERT INTO movie_reviews (movie_Name,movie_reviews) VALUES ('inception','good movie');"
    // db.query(sqlInsert,(err,result)=>{
    //     res.send("hel");
    // })
    const sqlSelect = "SELECT * FROM user_account";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
    
});
app.post("/signup",(req, res)=>{
    const userName = req.body.userName;
    const  userAccount= req.body.userAccount;
    const password = req.body.password;
    
    const sqlInsert = "INSERT INTO user_account (userAccount,userPassword,userName) VALUES (?,?,?);"
    db.query(sqlInsert,[userName,userAccount,password],(err,result)=>{
        console.log(result);
    })
})
app.post("/login",(req, res)=>{
    const  userAccount= req.body.userAccount;
    const password = req.body.password;
    
    const sqlGet = "SELECT * FROM user_account WHERE userAccount = ? AND userPassword = ?"
    db.query(sqlGet,[userAccount,password],(err,result)=>{
        if(result.l){
            res.send({err:err});
        }
        else{
            if(result.length >0){
                res.send(result)
            } else {
                res.send({message: "wrong username/password combination"})
            }
        }
    })
})
app.listen(3001,()=>{
    console.log("running on port 3001");
});