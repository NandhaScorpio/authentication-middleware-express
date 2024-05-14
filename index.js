const express = require("express");
const jwt = require('jsonwebtoken');
const authorize = require("./authorization-middleware")
const config = require("./config")
const app = express();

const port = 5000;
//Request a Token
//DISCLAIMER: User should be authenticated!!!
app.get("/token",(req,res)=>{
    const payload = {
        name:"Jimmy",
        scopes:"customer:read"
    }

    const token = jwt.sign(payload, config.JWT_SECRET)
    res.send(token)
})

app.get("/customer", authorize("customer:read"), (req,res)=>{
    res.send("Customer Information")
})

app.listen(port, () => console.log("Server is running on the port 5000..."));
