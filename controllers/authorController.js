"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.author_update_post = exports.author_update_get = exports.author_delete_post = exports.author_delete_get = exports.author_create_post = exports.author_create_get = exports.author_detail = exports.author_list = void 0;
var express_validator_1 = require("express-validator");
var Author = require("../models/author");
var Book = require("../models/book");
var async = require("async");
// Display list of all Authors
var author_list = function (req, res, next) {
    return Author.find()
        .sort([["family_name", "ascending"]])
        .exec(function (err, list_authors) {
        if (err)
            return next(err);
        res.render("author_list", {
            title: "Author List",
            author_list: list_authors,
        });
    });
};
exports.author_list = author_list;
// Display detail page for a specific Author
var author_detail = function (req, res, next) {
    async.parallel({
        author: function (callback) { return Author.findById(req.params.id).exec(callback); },
        authors_books: function (callback) {
            return Book.find({ author: req.params.id }, "title summary").exec(callback);
        },
    }, function (err, results) {
        if (err)
            return next(err);
        if (results.author == null) {
            var e = new Error("Author not found");
            res.status(404);
            return next(e);
        }
        res.render("author_detail", {
            title: "Author Detail",
            author: results.author,
            author_books: results.authors_books,
        });
    });
};
exports.author_detail = author_detail;
// Display Author create form on GET
var author_create_get = function (req, res) {
    return res.render("author_form", { title: "Create Author" });
};
exports.author_create_get = author_create_get;
// Handle Author create on POST
var author_create_post = [
    // Validate and sanitize fields
    (0, express_validator_1.body)("first_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    (0, express_validator_1.body)("family_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Family name must be specified")
        .isAlphanumeric()
        .withMessage("Family name has non-alphanumeric characters."),
    (0, express_validator_1.body)("date_of_birth", "Invalid date of birth")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    (0, express_validator_1.body)("date_of_death", "Invalid date of birth")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    //  Process request after validation and sanitization
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("author_form", {
                title: "Create Author",
                author: req.body,
                errors: errors.array(),
            });
            return;
        }
        else {
            //  Data from form is valid
            // Create an Author object with escaped and trimmed data.
            var author_1 = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
            });
            author_1.save(function (err) {
                if (err)
                    return next(err);
                // Successful - reditect to new author record.
                res.redirect(author_1.url);
            });
        }
    },
];
exports.author_create_post = author_create_post;
// Display Author delete form on GET
var author_delete_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author delete GET");
};
exports.author_delete_get = author_delete_get;
// Handle Author delete on POST
var author_delete_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author delete POST");
};
exports.author_delete_post = author_delete_post;
// Display Author update form on GET
var author_update_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author update GET");
};
exports.author_update_get = author_update_get;
// Display Author update form on POST
var author_update_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author update POST");
};
exports.author_update_post = author_update_post;
