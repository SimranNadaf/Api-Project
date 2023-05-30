const express = require("express");

//initilaze
booky = express();

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
    const getPublication = database.Publications.filter((Publication) =>
      Publication.Id === req.params.id
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
      return res.json({ error: `Publication not found of isbn ${req.params.isbn}` });
    }
    return res.json({ getPublication });
  });
  

booky.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
