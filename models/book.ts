import { Schema, model, Types } from "mongoose";

interface Book {
  title: String;
  author: Types.ObjectId;
  summary: String;
  isbn: String;
  genre?: Types.ObjectId;
}

let BookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, reuquired: true },
  genre: { type: Types.ObjectId, ref: "Genre" },
});

// Virtual for book's URL
BookSchema.virtual("url").get(function (this: any) {
  return "/catalog/book/" + this._id;
});

// Export model
module.exports = model<Book>("Book", BookSchema);
