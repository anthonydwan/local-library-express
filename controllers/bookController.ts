import { NextFunction, Request, Response } from "express";
import {
  BookType,
  BookInstanceType,
  AuthorType,
  GenreType,
} from "../models/modelTypes";
import { bookCrtlIndexType } from "./controllerTypes";
import { body, validationResult } from "express-validator";

const Book = require("../models/book");
const BookInstance = require("../models/bookinstance");
const Author = require("../models/author");
const Genre = require("../models/genre");

let async = require("async");

const index = (req: Request, res: Response) => {
  async.parallel(
    {
      book_count: (callback: any) => Book.countDocuments({}, callback),
      book_instance_count: (callback: any) =>
        BookInstance.countDocuments({}, callback),
      book_instance_available_count: (callback: any) =>
        BookInstance.countDocuments({ status: "Available" }, callback),
      author_count: (callback: any) => Author.countDocuments({}, callback),
      genre_count: (callback: any) => Genre.countDocuments({}, callback),
    },
    (err: string, results: bookCrtlIndexType) =>
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      })
  );
};

// Display list of all bookinstances
const book_list = (req: Request, res: Response, next: NextFunction) =>
  Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec((err: string, list_books: Object) => {
      if (err) return next(err);
      // successful, so render
      res.render("book_list", { title: "Book List", book_list: list_books });
    });

// Display detail page for a specific bookinstance
const book_detail = (req: Request, res: Response, next: NextFunction) => {
  async.parallel(
    {
      book: (callback: any) => {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: (callback: any) => {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    (
      err: String,
      results: { book: BookType; book_instance: BookInstanceType }
    ) => {
      if (err) return next(err);
      if (results.book == null) {
        let e = new Error("Book not found");
        res.status(404);
        return next(e);
      }
      res.render("book_detail", {
        title: results.book.title,
        book: results.book,
        book_instances: results.book_instance,
      });
    }
  );
};

// Display bookinstance create form on GET
const book_create_get = (req: Request, res: Response, next: NextFunction) =>
  async.parallel(
    {
      authors: (callback: any) => Author.find(callback),
      genres: (callback: any) => Genre.find(callback),
    },
    (err: string, results: { authors: AuthorType; genres: GenreType }) => {
      if (err) return next(err);
      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres,
      });
    }
  );

// Handle bookinstance create on POST
const book_create_post = [
  // Convert the genre to an array.
  (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.genre instanceof Array)) {
      typeof req.body.genre === "undefined"
        ? (req.body.genre = [])
        : (req.body.genre = new Array(req.body.genre));
    }
    next();
  },
  //  Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.

    var book: any = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          authors: (callback: any) => Author.find(callback),
          genres: (callback: any) => Genre.find(callback),
        },
        (err: string, results: { authors: AuthorType; genres: any }) => {
          if (err) return next(err);

          // Mark our selected genres as checked.
          for (let i = 0; i < results.genres.length; i++) {
            if (book.genre.indexOf(results.genres[i]._id > -1)) {
              results.genres[i].checked = "true";
            }
          }
          res.render("book_form", {
            title: "Create Book",
            authors: results.authors,
            genres: results.genres,
            book: book,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid. Save book.
      book.save((err: string) => {
        if (err) return next(err);
        // successful - redirect to new book record.
        res.redirect(book.url);
      });
    }
  },
];

// Display bookinstance delete frorm on GET
const book_delete_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book delete GET");

// Handle bookinstance delete on POST
const book_delete_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book delete POST");

// Display bookinstance update form on GET
const book_update_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book update GET");

// Display bookinstance update form on POST
const book_update_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book update POST");

export {
  index,
  book_list,
  book_detail,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
};
