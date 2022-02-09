"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookinstance_update_post = exports.bookinstance_update_get = exports.bookinstance_delete_post = exports.bookinstance_delete_get = exports.bookinstance_create_post = exports.bookinstance_create_get = exports.bookinstance_detail = exports.bookinstance_list = void 0;
var express_validator_1 = require("express-validator");
var Book = require("../models/book");
var BookInstance = require("../models/bookinstance");
// Display list of all bookinstances
var bookinstance_list = function (req, res, next) {
    BookInstance.find()
        .populate("book")
        .exec(function (err, list_bookinstances) {
        if (err)
            return next(err);
        // successful, so render
        res.render("bookinstance_list", {
            title: "Book Instance List",
            bookinstance_list: list_bookinstances,
        });
    });
};
exports.bookinstance_list = bookinstance_list;
// Display detail page for a specific bookinstance
var bookinstance_detail = function (req, res, next) {
    return BookInstance.findById(req.params.id)
        .populate("book")
        .exec(function (err, bookinstance) {
        if (err)
            return next;
        if (bookinstance == null) {
            var e = new Error("Book copy not found");
            res.status(404);
            return next(e);
        }
        res.render("bookinstance_detail", {
            title: "Copy: " + bookinstance.book.title,
            bookinstance: bookinstance,
        });
    });
};
exports.bookinstance_detail = bookinstance_detail;
// Display bookinstance create form on GET
var bookinstance_create_get = function (req, res, next) {
    return Book.find({}, "title").exec(function (err, books) {
        if (err)
            return next(err);
        // Successful, so render.
        res.render("bookinstance_form", {
            title: "Create BookInstance",
            book_list: books,
        });
    });
};
exports.bookinstance_create_get = bookinstance_create_get;
// Handle bookinstance create on POST
var bookinstance_create_post = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)("imprint", "Imprint must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("status").escape(),
    (0, express_validator_1.body)("due_back", "Invalid date")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    // Process request after valiation and sanitization.
    function (req, res, next) {
        // Extract the validation errors from a request.
        var errors = (0, express_validator_1.validationResult)(req);
        // Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
        });
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Book.find({}, "title").exec(function (err, books) {
                if (err)
                    return next(err);
                // Successful, so render.
                res.render("bookinstance_form", {
                    title: "Create BookInstance",
                    book_list: books,
                    selected_book: bookinstance.book._id,
                    errors: errors.array(),
                    bookinstance: bookinstance,
                });
            });
            return;
        }
        else {
            // Data from form is valid.
            bookinstance.save(function (err) {
                if (err)
                    return next(err);
                // Successful - redirect to new record.
                res.redirect(bookinstance.url);
            });
        }
    },
];
exports.bookinstance_create_post = bookinstance_create_post;
// Display bookinstance delete frorm on GET
var bookinstance_delete_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance delete GET");
};
exports.bookinstance_delete_get = bookinstance_delete_get;
// Handle bookinstance delete on POST
var bookinstance_delete_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance delete POST");
};
exports.bookinstance_delete_post = bookinstance_delete_post;
// Display bookinstance update form on GET
var bookinstance_update_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance update GET");
};
exports.bookinstance_update_get = bookinstance_update_get;
// Display bookinstance update form on POST
var bookinstance_update_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance update POST");
};
exports.bookinstance_update_post = bookinstance_update_post;
