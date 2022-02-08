import { NextFunction, Request, Response } from "express";
import { BookType, GenreType } from "../models/modelTypes";
import { body, validationResult } from "express-validator";
import { isBuffer } from "util";

let Genre = require("../models/genre");
let Book = require("../models/book");
let async = require("async");

// Display list of all genres
const genre_list = (req: Request, res: Response, next: NextFunction) =>
  Genre.find()
    .sort([["name", "ascending"]])
    .exec((err: string, list_genre: Object) => {
      if (err) return next(err);
      res.render("genre_list", {
        title: "Genre List",
        genre_list: list_genre,
      });
    });

// Display detail page for a specific genre
const genre_detail = (req: Request, res: Response, next: NextFunction) => {
  async.parallel(
    {
      genre: (callback: any) => {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books: (callback: any) => {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err: string, results: { genre: GenreType; genre_books: BookType }) => {
      if (err) return next(err);
      if (results.genre == null) {
        var e = new Error("Genre not found");
        res.status(404);
        return next(e);
      }
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

// Display genre create form on GET
const genre_create_get = (req: Request, res: Response) =>
  res.render("genre_form", { title: "Create Genre" });

// Handle genre create on POST
const genre_create_post = [
  // Validate and sanitize the name field
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors cfrom a request
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data
    let genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with santized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec(
        (err: String, found_genre: any) => {
          if (err) return next(err);
          if (found_genre) {
            res.redirect(found_genre.url);
          } else {
            genre.save((err: string) => {
              if (err) return next(err);
              // Genre saved. Redirect to genre detail page.
              res.redirect(genre.url);
            });
          }
        }
      );
    }
  },
];

// Display genre delete frorm on GET
const genre_delete_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre delete GET");

// Handle genre delete on POST
const genre_delete_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre delete POST");

// Display genre update form on GET
const genre_update_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre update GET");

// Display genre update form on POST
const genre_update_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre update POST");

export {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post,
};
