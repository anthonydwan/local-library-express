import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BookInstanceType, BookType } from "../models/modelTypes";
import { bookCrtlIndexType } from "./controllerTypes";
let Book = require("../models/book");
let async = require("async");

let BookInstance = require("../models/bookinstance");
// Display list of all bookinstances
const bookinstance_list = (req: Request, res: Response, next: NextFunction) => {
  BookInstance.find()
    .populate("book")
    .exec((err: string, list_bookinstances: Object) => {
      if (err) return next(err);
      // successful, so render
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      });
    });
};

// Display detail page for a specific bookinstance
const bookinstance_detail = (req: Request, res: Response, next: NextFunction) =>
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err: String, bookinstance: any) => {
      if (err) return next;
      if (bookinstance == null) {
        let e = new Error("Book copy not found");
        res.status(404);
        return next(e);
      }
      res.render("bookinstance_detail", {
        title: "Copy: " + bookinstance.book.title,
        bookinstance: bookinstance,
      });
    });

// Display bookinstance create form on GET
const bookinstance_create_get = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  Book.find({}, "title").exec((err: string, books: BookType[]) => {
    if (err) return next(err);
    // Successful, so render.
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    });
  });

// Handle bookinstance create on POST
const bookinstance_create_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after valiation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    let bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Book.find({}, "title").exec((err: any, books: BookType[]) => {
        if (err) return next(err);
        // Successful, so render.
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance: bookinstance,
        });
      });
      return;
    } else {
      // Data from form is valid.
      bookinstance.save((err: string) => {
        if (err) return next(err);
        // Successful - redirect to new record.
        res.redirect(bookinstance.url);
      });
    }
  },
];

// Display bookinstance delete frorm on GET
const bookinstance_delete_get = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  async.parallel(
    {
      bookinstance: (callback: any) =>
        BookInstance.findById(req.params.id).exec(callback),
      books: (callback: any) => Book.find(callback),
    },
    (err: string, results: { bookinstance: BookInstanceType }) => {
      if (err) return next(err);
      if (results.bookinstance == null) res.redirect("/catalog/bookinstances");
      res.render("bookinstance_delete", {
        title: "BookInstance Delete",
        bookinstance: results.bookinstance,
      });
    }
  );

// Handle bookinstance delete on POST
const bookinstance_delete_post = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  async.parallel(
    {
      bookinstance: (callback: any) =>
        BookInstance.findById(req.body.bookinstanceid).exec(callback),
    },
    (err: string, results: { bookinstance: BookInstanceType[] }) => {
      if (err) return next(err);
      // Success
      {
        // Delete
        BookInstance.findByIdAndRemove(
          req.body.bookinstanceid,
          function deleteBookInstance(err: string) {
            if (err) return next(err);
            // Success - go to bookinstance
            res.redirect("/catalog/bookinstances");
          }
        );
      }
    }
  );

// Display bookinstance update form on GET
const bookinstance_update_get = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  async.parallel(
    {
      book_instance: (callback: any) =>
        BookInstance.findById(req.params.id).populate("book").exec(callback),
      books: (callback: any) => Book.find(callback),
    },
    (
      err: string,
      results: { book_instance: BookInstanceType; books: BookType[] }
    ) => {
      if (err) return next(err);
      if (results.book_instance == null) {
        let e = new Error("Book Instance not found");
        res.status(404);
        return next(e);
      }
      // success
      res.render("bookinstance_form", {
        title: "Update Book Instance",
        book: results.book_instance,
        book_list: results.books,
        selected_book: results.book_instance.book._id,
      });
    }
  );

// Display bookinstance update form on POST
const bookinstance_update_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    let book_instance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id, //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.

      async.parallel(
        {
          books: (callback: any) => {
            Book.find(callback);
          },
        },
        (err: string, results: { books: BookType[] }) => {
          if (err) {
            return next(err);
          }

          res.render("bookinstance_form", {
            title: "Update BookInstance",
            book_instance: book_instance,
            book_list: results.books,
            selected_book: book_instance.book._id,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid. Update the record.
      BookInstance.findByIdAndUpdate(
        req.params.id,
        book_instance,
        {},
        (err: string, thebookinstance: any) => {
          if (err) {
            return next(err);
          }
          // Successful - redirect to book detail page.
          res.redirect(thebookinstance.url);
        }
      );
    }
  },
];

export {
  bookinstance_list,
  bookinstance_detail,
  bookinstance_create_get,
  bookinstance_create_post,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
};
