import { Schema, model } from "mongoose";
import { DateTime } from "luxon";

interface Author {
  first_name: String;
  family_name: String;
  date_of_birth?: Date;
  date_of_death?: Date;
}

let AuthorSchema = new Schema<Author>({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function (this: any) {
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
AuthorSchema.virtual("lifespan").get(function (this: any) {
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
AuthorSchema.virtual("url").get(function (this: any) {
  return "/catalog/author/" + this._id;
});

// Virtual for author's url
AuthorSchema.virtual("formatted_date_of_birth").get(function (this: any) {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("formatted_date_of_death").get(function (this: any) {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("lifespan").get(function (this: any) {
  if (this.date_of_birth && this.date_of_death) {
    return (
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      ) +
      " - " +
      DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    );
  } else if (this.date_of_birth) {
    return (
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      ) + " - "
    );
  } else if (this.date_of_death) {
    return (
      "unknown - " +
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    );
  } else {
    return "unknown";
  }
});

// Export model
module.exports = model<Author>("Author", AuthorSchema);
