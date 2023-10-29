const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js');
const genl_routes = require('./router/general.js');
const {mongodb}=require('./router/booksdb.js');
const cookie=require("cookie-parser");

const app = express();
app.use(cookie());
app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))


 
const PORT =5000;

mongodb;
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
