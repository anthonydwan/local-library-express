import { Schema, model, Types } from "mongoose";

enum instanceStatus {
  AVAILABLE = "Available",
  MAINTENANCE = "Maintenance",
  LOANED = "Loaned",
  RESERVED = "Reserved",
}

interface BookInstance {
  book: Types.ObjectId;
  imprint: String;
  status: instanceStatus;
  due_back: Date;
}

let BookInstanceSchema = new Schema<BookInstance>({
  book: { type: Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: instanceStatus,
    default: instanceStatus.MAINTENANCE,
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for book's URL
BookInstanceSchema.virtual("url").get(function (this: any) {
  return "/catalog/bookinstance/" + this._id;
});

// Export model
module.exports = model<BookInstance>("BookInstance", BookInstanceSchema);

