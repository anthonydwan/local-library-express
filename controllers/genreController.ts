import { Genre } from "../models/genre";
import { Request, Response } from "express";

// Display list of all genres
const genre_list = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre list");

// Display detail page for a specific genre
const genre_detail = (req: Request, res: Response) =>
  res.send("NOT IMPLEMENTED: Genre detail: " + req.params.id);

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
