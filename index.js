const express = require("express");
const bodyParser = require("body-parser");

//initilaze
booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

//database
const database = require("./database");

/*
ROUTE - /book
Description - get all books
Access - public
Parameters - none
method - get
*/
booky.get("/book", (req, res) => {
  return res.json(database.Books);
});

/*
ROUTE - /book/:isbn
Description - get a specific books
Access - public
Parameters - isbn
method - get
*/
booky.get("/book/:isbn", (req, res) => {
  const getBook = database.Books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getBook.length === 0) {
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
booky.get("/book/c/:category", (req, res) => {
  const getBook = database.Books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (getBook.length === 0) {
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
booky.get("/book/lan/:lan", (req, res) => {
  const getBook = database.Books.filter(
    (book) => book.language === req.params.lan
  );
  if (getBook.length === 0) {
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
booky.get("/author", (req, res) => {
  return res.json(database.Authors);
});

/*
ROUTE - /author
Description - get a specific author
Access - public
Parameters - id
method - get
*/
booky.get("/author/:id", (req, res) => {
  const getAuthor = database.Authors.filter(
    (author) => author.Id === req.params.id
  );
  if (getAuthor.length === 0) {
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
booky.get("/author/book/:isbn", (req, res) => {
  const getAuthors = database.Authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (getAuthors.length === 0) {
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
booky.get("/publication", (req, res) => {
  return res.json(database.Publications);
});

/*
ROUTE - /publication
Description - get a specific publication
Access - public
Parameters - id
method - get
*/
booky.get("/publication/:id", (req, res) => {
  const getPublication = database.Publications.filter(
    (Publication) => Publication.Id === req.params.id
  );
  if (getPublication.length === 0) {
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
booky.get("/publication/book/:isbn", (req, res) => {
  const getPublication = database.Publications.filter((Publication) =>
    Publication.books.includes(req.params.isbn)
  );
  if (getPublication.length === 0) {
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
  database.Books.push(newBook);
  return res.json({ Status: "Success", Books: database.Books });
});

/*
ROUTE - /author/new
Description - add a new author
Access - public
Parameters - none
method - post
*/
booky.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.Authors.push(newAuthor);
  return res.json({ Status: "Success", Authors: database.Authors });
});

/*
ROUTE - /publication/new
Description - add a new publication
Access - public
Parameters - none
method - post
*/
booky.post("/publication/new", (req, res) => {
  const newPublication = req.body;
  database.Publications.push(newPublication);
  return res.json({ Status: "Success", Publications: database.Publications });
});

/*
ROUTE - /book/update/author
Description - update or add a new publication in book
Access - public
Parameters - isbn
method - Put
body - pubId
*/
booky.put("/book/update/publication/:isbn", (req, res) => {
  //update book in publication
  const pubId = req.body.pubId;
  database.Publications.forEach((pub) => {
    if (pub.Id === pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //update publication in book
  database.Books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = pubId;
    }
    return;
  });

  return res.json({
    Books: database.Books,
    Publications: database.Publications,
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
booky.delete("/book/delete/:isbn", (req, res) => {
  //finding out book from database and filter it out
  const newBooks = database.Books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.Books = newBooks;
  return res.json({
    Books: database.Books,
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
booky.delete("/book/author/delete/:isbn/:authorId", (req, res) => {
  //delete a author from book
  database.Books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthor = book.author.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.author = newAuthor;
      return;
    }
  });
  return res.json({
    Books: database.Books,
    Message: `Successfully deleted author ${req.param.auhtorId} from book ${req.params.isbn}`,
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
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  //delete a author from a book
  database.Books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthor = book.author.filter((author) => 
        author !== parseInt(req.params.authorId)
      );
      book.author = newAuthor;
    }
  });

  //delete a book from author
  database.Authors.forEach((author) => {
    if (author.Id === req.params.authorId) {
      const newBooks = author.books.filter((book) => 
        book !== req.params.isbn
      );
      author.books = newBooks;
    }
  });
  return res.json({
    books: database.Books,
    Authors: database.Authors,
    Message: "Successfully deleted !!",
  });
});

booky.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
