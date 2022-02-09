import { Types } from "mongoose";

export interface AuthorType {
  first_name: String;
  family_name: String;
  date_of_birth?: Date;
  date_of_death?: Date;
}

export interface BookType {
  title: String;
  author: Types.ObjectId;
  summary: String;
  isbn: String;
  genre: Types.ObjectId[];
}

export enum instanceStatus {
  AVAILABLE = "Available",
  MAINTENANCE = "Maintenance",
  LOANED = "Loaned",
  RESERVED = "Reserved",
}

export interface BookInstanceType {
  book: Types.ObjectId;
  imprint: String;
  status: instanceStatus;
  due_back: Date;
}

export interface GenreType {
  name: String;
}
