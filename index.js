const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//initilaze
booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://simran:simran@library.nsxgufs.mongodb.net/Booky")
  .then(() => {
    console.log("Successfully connected to MongoDB !");
  });

const database = require("./database/database");

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

/*
ROUTE - /
Description - Home page
Access - public
Parameters - none
method - get
*/
booky.get("/", (req, res) => {
  return res.json({ img: "Home Page of booky !!" });
});

/*
ROUTE - /book
Description - get all books
Access - public
Parameters - none
method - get
*/
booky.get("/book", async (req, res) => {
  const GetAllBooks = await BookModel.find();
  return res.json({ GetAllBooks });
});

/*
ROUTE - /book/:isbn
Description - get a specific books
Access - public
Parameters - isbn
method - get
*/
booky.get("/book/:isbn", async (req, res) => {
  const getBook = await BookModel.findOne({ ISBN: req.params.isbn });
  if (!getBook) {
    return res.json({
      error: `the book not found for ISBN ${req.params.isbn}`,
    });
  }
  return res.json(getBook);
});

/*
ROUTE - /book/c/:category
Description - get a list books based on category
Access - public
Parameters - category
method - get
*/
booky.get("/book/c/:category", async (req, res) => {
  const getBook = await BookModel.find({ category: req.params.category });
  if (!getBook) {
    return res.json({
      error: `the book not found for category ${req.params.category}`,
    });
  }
  return res.json(getBook);
});

/*
ROUTE - /book/lan/:lan
Description - get a list books based on language
Access - public
Parameters - language
method - get
*/
booky.get("/book/lan/:lan", async (req, res) => {
  const getBook = await BookModel.find({ language: req.params.lan });
  if (!getBook) {
    return res.json({
      error: `the book not found for language ${req.params.lan}`,
    });
  }
  return res.json(getBook);
});

/*
ROUTE - /author
Description - get all authors
Access - public
Parameters - none
method - get
*/
booky.get("/author", async (req, res) => {
  const getAuthors = await AuthorModel.find();
  return res.json({ author: getAuthors });
});

/*
ROUTE - /author
Description - get a specific author
Access - public
Parameters - id
method - get
*/
booky.get("/author/:id", async (req, res) => {
  const getAuthor = await AuthorModel.findOne({ Id: req.params.id });
  if (!getAuthor) {
    return res.json({ error: `not found author of id ${req.params.id}` });
  }
  return res.json({ getAuthor });
});

/*
ROUTE - /author/book/
Description - get a list of authors based on book
Access - public
Parameters - isbn
method - get
*/
booky.get("/author/book/:isbn", async (req, res) => {
  const getAuthors = await AuthorModel.findOne({ books: req.params.isbn });
  if (!getAuthors) {
    return res.json({ error: `Author not found of isbn ${req.params.isbn}` });
  }
  return res.json({ getAuthors });
});

/*
ROUTE - /publication
Description - get all publication
Access - public
Parameters - none
method - get
*/
booky.get("/publication", async (req, res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json({ getAllPublication });
});

/*
ROUTE - /publication
Description - get a specific publication
Access - public
Parameters - id
method - get
*/
booky.get("/publication/:id", async (req, res) => {
  const getPublication = await PublicationModel.findOne({ Id: req.params.id });
  if (!getPublication) {
    return res.json({ error: `Publication not found of id ${req.params.id}` });
  }
  return res.json({ getPublication });
});

/*
ROUTE - /publication/book/
Description - get a list of publication based on book
Access - public
Parameters - isbn
method - get
*/
booky.get("/publication/book/:isbn", async (req, res) => {
  const getPublication = await PublicationModel.findOne({
    books: req.params.isbn,
  });
  if (!getPublication) {
    return res.json({
      error: `Publication not found of isbn ${req.params.isbn}`,
    });
  }
  return res.json({ getPublication });
});

/*
ROUTE - /book/new
Description - add a new book
Access - public
Parameters - none
method - post
*/
booky.post("/book/new", (req, res) => {
  const newBook = req.body;
  const addbook = BookModel.create(newBook);
  return res.json({ Status: "Success", Book: addbook });
});

/*
ROUTE - /author/new
Description - add a new author
Access - public
Parameters - none
method - post
*/
booky.post("/author/new", async (req, res) => {
  const newAuthor = req.body;
  const addAuthor = await AuthorModel.create(newAuthor);
  return res.json({ Status: "Success", Author: addAuthor });
});

/*
ROUTE - /publication/new
Description - add a new publication
Access - public
Parameters - none
method - post
*/
booky.post("/publication/new", async (req, res) => {
  const newPublication = req.body;
  const addPublication = await PublicationModel.create(newPublication);
  return res.json({ Status: "Success", Publication: addPublication });
});

/*
ROUTE - /book/update/author
Description - update or add a new publication in book
Access - public
Parameters - isbn
method - Put
body - pubId
*/
booky.put("/book/update/publication/:isbn", async (req, res) => {
  //update publication in book
  const pubId = req.body.pubId;
  const UpdateBook = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    { $addToSet: { publication: pubId } },
    { new: true }
  );

  //update book in publication
  const UpdatePublication = await PublicationModel.findOneAndUpdate(
    { Id: pubId },
    { $addToSet: { books: req.params.isbn } },
    { new: true }
  );
  return res.json({
    Book: UpdateBook,
    Publication: UpdatePublication,
    msg: "successfully updated !!",
  });
});

/*
ROUTE - /book/delete
Description - delete a book
Access - public
Parameters - isbn
method - delete
body - none
*/
booky.delete("/book/delete/:isbn", async (req, res) => {
  //finding out book from database and filter it out
  const deletedBook = await BookModel.findOneAndDelete(
    { ISBN: req.params.isbn },
    { new: true }
  );
  return res.json({
    Book: deletedBook,
    Message: "Book is deleted successfully !!",
  });
});

/*
ROUTE - /book/auhtor/delete
Description - delete a author from book
Access - public
Parameters - isbn, auhtorId
method - delete
body - none
*/
booky.delete("/book/author/delete/:isbn", async (req, res) => {
  const authorId = req.body.authorId;
  //delete a author from book
  const deletedAuthor = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    { $unset : { author: authorId } },
    { new: true }
  );
  return res.json({
    Book: deletedAuthor,
    Message: `Successfully deleted author ${authorId} from book ${req.params.isbn}`,
  });
});

/*
ROUTE - /book/delete/author
Description - delete a author from book and vise versa
Access - public
Parameters - isbn, auhtorId
method - delete
body - none
*/
booky.delete("/book/delete/author/:isbn", async (req, res) => {
  const authorId = req.body.authorId;
  //delete a author from a book
  const UpdatedBook = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    { $unset : { author: authorId } },
    { new: true }
  );
  //delete a book from author
  const UpdatedAuthor = await AuthorModel.findOneAndUpdate(
  {Id : authorId},
  { $unset : {books:req.params.isbn}},
  {new : true});

  return res.json({
    book: UpdatedBook,
    Author: UpdatedAuthor,
    Message: "Successfully deleted !!",
  });
});

booky.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
