import { NextFunction, Request, Response } from "express";
import { AuthorType, BookType } from "../models/modelTypes";
import { body, validationResult } from "express-validator";

let Author = require("../models/author");
let Book = require("../models/book");
let async = require("async");

// Display list of all Authors
const author_list = (req: Request, res: Response, next: NextFunction) =>
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec((err: string, list_authors: Object) => {
      if (err) return next(err);
      res.render("author_list", {
        title: "Author List",
        author_list: list_authors,
      });
    });

// Display detail page for a specific Author
const author_detail = (req: Request, res: Response, next: NextFunction) => {
  async.parallel(
    {
      author: (callback: any) => Author.findById(req.params.id).exec(callback),
      authors_books: (callback: any) =>
        Book.find({ author: req.params.id }, "title summary").exec(callback),
    },
    (err: String, results: { author: AuthorType; authors_books: BookType }) => {
      if (err) return next(err);
      if (results.author == null) {
        let e = new Error("Author not found");
        res.status(404);
        return next(e);
      }
      res.render("author_detail", {
        title: "Author Detail",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );
};

// Display Author create form on GET
const author_create_get = (req: Request, res: Response) =>
  res.render("author_form", { title: "Create Author" });

// Handle Author create on POST
const author_create_post = [
  // Validate and sanitize fields
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  //  Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      //  Data from form is valid

      // Create an Author object with escaped and trimmed data.
      let author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });

      author.save((err: string) => {
        if (err) return next(err);
        // Successful - reditect to new author record.
        res.redirect(author.url);
      });
    }
  },
];

// Display Author delete form on GET
const author_delete_get = (req: Request, res: Response, next: NextFunction) =>
  async.parallel(
    {
      author: (callback: any) => Author.findById(req.params.id).exec(callback),
      authors_books: (callback: any) =>
        Book.find({ author: req.params.id }).exec(callback),
    },
    (
      err: string,
      results: { author: AuthorType; authors_books: BookType[] }
    ) => {
      if (err) return next(err);
      if (results.author == null) res.redirect("/catalog/authors");
      res.render("author_delete", {
        title: "Delete Author",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );

// Handle Author delete on POST
const author_delete_post = (req: Request, res: Response, next: NextFunction) =>
  async.parallel(
    {
      author: (callback: any) =>
        Author.findById(req.body.authorid).exec(callback),
      authors_books: (callback: any) =>
        Book.find({ author: req.body.authorid }).exec(callback),
    },
    (
      err: string,
      results: { author: AuthorType; authors_books: BookType[] }
    ) => {
      if (err) return next(err);
      // Success
      if (results.authors_books.length > 0) {
        res.render("author_delete", {
          title: "Delete Author",
          author: results.author,
          author_books: results.authors_books,
        });
        return;
      } else {
        // Author has no books. Delete object and redirect to the list of authors.
        Author.findByIdAndRemove(
          req.body.authorid,
          function deleteAuthor(err: string) {
            if (err) return next(err);
            // Success - go to author list
            res.redirect("/catalog/authors");
          }
        );
      }
    }
  );

// Display Author update form on GET
const author_update_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author update GET");

// Display Author update form on POST
const author_update_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author update POST");

export {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
};
