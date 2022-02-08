import { Schema, model, Types } from "mongoose";
import { DateTime } from "luxon";
import { BookInstanceType, instanceStatus } from "../models/modelTypes";

let BookInstanceSchema = new Schema<BookInstanceType>({
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

BookInstanceSchema.virtual("due_back_formatted").get(function (this: any) {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = model<BookInstanceType>("BookInstance", BookInstanceSchema);
