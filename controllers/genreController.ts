import { NextFunction, Request, Response } from "express";
import { BookType, GenreType } from "../models/modelTypes";

let Genre = require("../models/genre");
let Book = require("../models/book");
let async = require("async");

// Display list of all genres
const genre_list = (req: Request, res: Response, next: NextFunction) =>
  Genre.find()
    .sort([["name", "ascending"]])
    .exec((err: string, list_genre: Object) => {
      if (err) next(err);
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
      if (err) next(err);
      if (results.genre == null) {
        var e = new Error("Genre not found");
        res.status(404);
        next(e);
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
  res.send("NOT IMPLEMENTED: Genre create GET");

// Handle genre create on POST
const genre_create_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre create POST");

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
