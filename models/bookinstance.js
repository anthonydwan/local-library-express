"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookInstance = void 0;
var mongoose_1 = require("mongoose");
var instanceStatus;
(function (instanceStatus) {
    instanceStatus["AVAILABLE"] = "Available";
    instanceStatus["MAINTENANCE"] = "Maintenance";
    instanceStatus["LOANED"] = "Loaned";
    instanceStatus["RESERVED"] = "Reserved";
})(instanceStatus || (instanceStatus = {}));
var BookInstanceSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Types.ObjectId, ref: "Book", required: true },
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
BookInstanceSchema.virtual("url").get(function () {
    return "/catalog/bookinstance/" + this._id;
});
// Export model
var BookInstance = (0, mongoose_1.model)("BookInstance", BookInstanceSchema);
exports.BookInstance = BookInstance;
