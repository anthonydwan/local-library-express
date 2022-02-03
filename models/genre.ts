import { Schema, model, Types } from "mongoose";

enum instanceStatus {
  AVAILABLE = "Available",
  MAINTENANCE = "Maintenance",
  LOANED = "Loaned",
  RESERVED = "Reserved",
}

interface Genre {
  name: String;
}

let Genre = new Schema<Genre>({
  name: { type: String, required: true, maxlength: 100, minlength: 3 },
});

// Virtual for book's URL
Genre.virtual("url").get(function (this: any) {
  return "/catalog/genre/" + this._id;
});

// Export model
module.exports = model<Genre>("Genre", Genre);
