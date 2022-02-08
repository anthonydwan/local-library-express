import { NextFunction, Request, Response } from "express";
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
const bookinstance_create_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance create GET");

// Handle bookinstance create on POST
const bookinstance_create_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance create POST");

// Display bookinstance delete frorm on GET
const bookinstance_delete_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance delete GET");

// Handle bookinstance delete on POST
const bookinstance_delete_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance delete POST");

// Display bookinstance update form on GET
const bookinstance_update_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance update GET");

// Display bookinstance update form on POST
const bookinstance_update_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance update POST");

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
