import { Request, Response } from "express";

// Display list of all Authors
const author_list = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author list");

// Display detail page for a specific Author
const author_detail = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author detail: " + req.params.id);

// Display Author create form on GET
const author_create_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author create GET");

// Handle Author create on POST
const author_create_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author create POST");

// Display Author delete frorm on GET
const author_delete_get = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author delete GET");

// Handle Author delete on POST
const author_delete_post = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Author delete POST");

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
