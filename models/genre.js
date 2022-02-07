"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
var mongoose_1 = require("mongoose");
var GenreSchema = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 100, minlength: 3 },
});
// Virtual for book's URL
GenreSchema.virtual("url").get(function () {
    return "/catalog/genre/" + this._id;
});
// Export model
var Genre = (0, mongoose_1.model)("Genre", GenreSchema);
exports.Genre = Genre;
