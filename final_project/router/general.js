const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const {User}=require("./booksdb.js");
const {Book}=require("./booksdb.js");
const public_users = express.Router();


public_users.post("/register",async (req,res) => {
  //Write your code here
  try{
    const user=new User({
      userName:req.body.userName,
      password:req.body.password
    })
    const data=await user.save();
    res.status(200).json({message: "Yet to be implemented"});
    console.log(data);
  }catch(err){
    res.status(500).json({message: "something unofficial in register"});
    console.log(err);
  }
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  let books=await Book.find();
  if (books){
   res.status(200).json({message:books});
  }
  else{
    res.status(400).send("book is not reteriving");
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:id',async function (req, res) {
  let books=await Book.findById(req.params.id);
  if (books){
   res.status(200).json({message:books});
  }
  else{
    res.status(400).send("book is not reteriving");
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  let books=await Book.findOne({author:req.params.author});
  if (books){
    res.status(200).json({message:books});
   }
   else{
     res.status(400).send("book is not reteriving");
   }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  let books=await Book.findOne({title:req.params.title});
  if (books){
    res.status(200).json({message:books});
   }
   else{
     res.status(400).send("book is not reteriving");
   }
});

//  Get book review
public_users.get('/review/:id',async function (req, res) {
  //Write your code here
  let books=await Book.findById(req.params.id);
  if(books){
    res.status(200).json({message:books.reviews});
  }else{
    res.status(400).send("not have book");
  }
});

// Add books
public_users.post('/add',async(req,res)=>{
  const book=new Book({
    title:req.body.title,
    author:req.body.author
  })
  await book.save().then((data)=>{
    res.status(200).json({message:data})
  }).catch((e)=>{
    console.log(e);
  })
})

module.exports = public_users;
