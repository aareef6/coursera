const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require("./booksdb.js");
const {Book}=require("./booksdb.js");
const {authtoken}=require("../midleware/auth.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login",async (req,res) => {
  //Write your code here
  const password=await User.findOne({password:req.body.password});
  if(password){
    const token= jwt.sign(
      {
          id:password._id,
      },
      "qwerty"
      
  )
  res.cookie("jwtoken",token,{httpOnly:true});
    res.status(200).json({message: "Yet to be implemented"});
  }
  else{
    res.status(400).json({message:"check your passward"})
  }
});

//delete a book review
regd_users.delete("/auth/review/:id",authtoken,async (req, res) => {
  const books=await Book.findById(req.params.id);
  if (books) {
    res.status(200).json({message:"successfully deleted"})
  }
  else {
    res.status(404).send('Product not found');
  }
})

// Add a book review
regd_users.post("/auth/review/:id",authtoken,async (req, res) => {
  //Write your code here
  const books=await Book.findById(req.params.id);
  if (books) {
    const alreadyReviewed = books.reviews.find(
      (r) => r.user.toString() === req.data.id.toString()
    )

    if (alreadyReviewed) {
      let review = {
        comment:req.body.comment,
        user: req.data.id,
      }
  
      books.reviews.push(review);
  
      await books.save();
      res.status(200).send("your review is modifyed");
    }else{

    let review = {
      comment:req.body.comment,
      user: req.data.id,
    }

    books.reviews.push(review);

    await books.save()
    res.status(200).json({ message: 'Review added' });
  }
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports=regd_users;

