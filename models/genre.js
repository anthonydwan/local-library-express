"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var instanceStatus;
(function (instanceStatus) {
    instanceStatus["AVAILABLE"] = "Available";
    instanceStatus["MAINTENANCE"] = "Maintenance";
    instanceStatus["LOANED"] = "Loaned";
    instanceStatus["RESERVED"] = "Reserved";
})(instanceStatus || (instanceStatus = {}));
var Genre = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 100, minlength: 3 },
});
// Virtual for book's URL
Genre.virtual("url").get(function () {
    return "/catalog/genre/" + this._id;
});
// Export model
module.exports = mongoose_1.model("Genre", Genre);
