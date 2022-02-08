"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var luxon_1 = require("luxon");
var modelTypes_1 = require("../models/modelTypes");
var BookInstanceSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Types.ObjectId, ref: "Book", required: true },
    imprint: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: modelTypes_1.instanceStatus,
        default: modelTypes_1.instanceStatus.MAINTENANCE,
    },
    due_back: { type: Date, default: Date.now },
});
// Virtual for book's URL
BookInstanceSchema.virtual("url").get(function () {
    return "/catalog/bookinstance/" + this._id;
});
BookInstanceSchema.virtual("due_back_formatted").get(function () {
    return luxon_1.DateTime.fromJSDate(this.due_back).toLocaleString(luxon_1.DateTime.DATE_MED);
});
// Export model
module.exports = (0, mongoose_1.model)("BookInstance", BookInstanceSchema);
