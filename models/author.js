"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var luxon_1 = require("luxon");
var AuthorSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});
// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
    // To avoid errors in cases where an author does not have either a fam name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    var fullname = "";
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ", " + this.first_name;
    }
    if (this.firsty_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
});
// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
    var lifetime_string = "";
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += " _ ";
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear();
    }
    return lifetime_string;
});
// Virtual for author's url
AuthorSchema.virtual("url").get(function () {
    return "/catalog/author/" + this._id;
});
// Virtual for author's url
AuthorSchema.virtual("formatted_date_of_birth").get(function () {
    return this.date_of_birth
        ? luxon_1.DateTime.fromJSDate(this.date_of_birth).toLocaleString(luxon_1.DateTime.DATE_MED)
        : "";
});
AuthorSchema.virtual("formatted_date_of_death").get(function () {
    return this.date_of_death
        ? luxon_1.DateTime.fromJSDate(this.date_of_death).toLocaleString(luxon_1.DateTime.DATE_MED)
        : "";
});
AuthorSchema.virtual("lifespan").get(function () {
    if (this.date_of_birth && this.date_of_death) {
        return (luxon_1.DateTime.fromJSDate(this.date_of_birth).toLocaleString(luxon_1.DateTime.DATE_MED) +
            " - " +
            luxon_1.DateTime.fromJSDate(this.date_of_death).toLocaleString(luxon_1.DateTime.DATE_MED));
    }
    else if (this.date_of_birth) {
        return (luxon_1.DateTime.fromJSDate(this.date_of_birth).toLocaleString(luxon_1.DateTime.DATE_MED) + " - ");
    }
    else if (this.date_of_death) {
        return ("unknown - " +
            luxon_1.DateTime.fromJSDate(this.date_of_birth).toLocaleString(luxon_1.DateTime.DATE_MED));
    }
    else {
        return "unknown";
    }
});
// Export model
module.exports = (0, mongoose_1.model)("Author", AuthorSchema);
