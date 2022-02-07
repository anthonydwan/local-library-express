import { Schema, model, Types } from "mongoose";

interface Genre {
  name: String;
}

let GenreSchema = new Schema<Genre>({
  name: { type: String, required: true, maxlength: 100, minlength: 3 },
});

// Virtual for book's URL
GenreSchema.virtual("url").get(function (this: any) {
  return "/catalog/genre/" + this._id;
});

// Export model
module.exports = model<Genre>("Genre", GenreSchema);
