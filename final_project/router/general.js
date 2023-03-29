const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const bookISBN = req.params.isbn;
  const filteredBooks = Object.keys(books)
    .filter((book) => book.includes(bookISBN))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: books[key]
        });
  }, {});
  return res.send(filteredBooks);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const bookAuthor = req.params.author;
  const bookResult = [];
  for (let key in books) {
    if (books[key].author.includes(bookAuthor)) {
       bookResult.push(books[key]);
    }
  }
  return res.send(bookResult[0]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const bookTitle = req.params.title;
    const bookResult = [];
    for (let key in books) {
      if (books[key].title.includes(bookTitle)) {
         bookResult.push(books[key]);
      }
    }
    return res.send(bookResult[0]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const bookISBN = req.params.isbn;
  const filteredBooks = Object.keys(books)
    .filter((book) => book.includes(bookISBN))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: books[key].reviews
        });
  }, {});
  return res.send(filteredBooks[3]);
});

module.exports.general = public_users;
