"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: mongoose_1.Types.ObjectId, ref: "Author", required: true },
    summary: { type: String, required: true },
    isbn: { type: String, reuquired: true },
    genre: { type: mongoose_1.Types.ObjectId, ref: "Genre" },
});
// Virtual for book's URL
BookSchema.virtual("url").get(function () {
    return "/catalog/book/" + this._id;
});
// Export model
module.exports = mongoose_1.model("Book", BookSchema);
