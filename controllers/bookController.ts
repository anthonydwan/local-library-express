import { Request, Response } from "express";

const index = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Site Home Page");

// Display list of all bookinstances
const book_list = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book list");

// Display detail page for a specific bookinstance
const book_detail = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);

// Display bookinstance create form on GET
const book_create_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book create GET");

// Handle bookinstance create on POST
const book_create_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Book create POST");

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