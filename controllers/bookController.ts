
import { BookInstance } from "../models/bookinstance";
import { Request, Response } from "express";

// Display list of all bookinstances
const bookinstance_list = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance list");

// Display detail page for a specific bookinstance
const bookinstance_detail = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: BookInstance detail: " + req.params.id);

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
