"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookinstance_update_post = exports.bookinstance_update_get = exports.bookinstance_delete_post = exports.bookinstance_delete_get = exports.bookinstance_create_post = exports.bookinstance_create_get = exports.bookinstance_detail = exports.bookinstance_list = void 0;
var express_validator_1 = require("express-validator");
var Book = require("../models/book");
var async = require("async");
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
var bookinstance_delete_get = function (req, res, next) {
    return async.parallel({
        bookinstance: function (callback) {
            return BookInstance.findById(req.params.id).exec(callback);
        },
        books: function (callback) { return Book.find(callback); },
    }, function (err, results) {
        if (err)
            return next(err);
        if (results.bookinstance == null)
            res.redirect("/catalog/bookinstances");
        res.render("bookinstance_delete", {
            title: "BookInstance Delete",
            bookinstance: results.bookinstance,
        });
    });
};
exports.bookinstance_delete_get = bookinstance_delete_get;
// Handle bookinstance delete on POST
var bookinstance_delete_post = function (req, res, next) {
    return async.parallel({
        bookinstance: function (callback) {
            return BookInstance.findById(req.body.bookinstanceid).exec(callback);
        },
    }, function (err, results) {
        if (err)
            return next(err);
        // Success
        {
            // Delete
            BookInstance.findByIdAndRemove(req.body.bookinstanceid, function deleteBookInstance(err) {
                if (err)
                    return next(err);
                // Success - go to bookinstance
                res.redirect("/catalog/bookinstances");
            });
        }
    });
};
exports.bookinstance_delete_post = bookinstance_delete_post;
// Display bookinstance update form on GET
var bookinstance_update_get = function (req, res, next) {
    return async.parallel({
        book_instance: function (callback) {
            return BookInstance.findById(req.params.id).populate("book").exec(callback);
        },
        books: function (callback) { return Book.find(callback); },
    }, function (err, results) {
        if (err)
            return next(err);
        if (results.book_instance == null) {
            var e = new Error("Book Instance not found");
            res.status(404);
            return next(e);
        }
        // success
        res.render("bookinstance_form", {
            title: "Update Book Instance",
            book: results.book_instance,
            book_list: results.books,
            selected_book: results.book_instance.book._id,
        });
    });
};
exports.bookinstance_update_get = bookinstance_update_get;
// Display bookinstance update form on POST
var bookinstance_update_post = [
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
    // Process request after validation and sanitization.
    function (req, res, next) {
        // Extract the validation errors from a request.
        var errors = (0, express_validator_1.validationResult)(req);
        // Create a Book object with escaped/trimmed data and old id.
        var book_instance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id, //This is required, or a new ID will be assigned!
        });
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // Get all authors and genres for form.
            async.parallel({
                books: function (callback) {
                    Book.find(callback);
                },
            }, function (err, results) {
                if (err) {
                    return next(err);
                }
                res.render("bookinstance_form", {
                    title: "Update BookInstance",
                    book_instance: book_instance,
                    book_list: results.books,
                    selected_book: book_instance.book._id,
                    errors: errors.array(),
                });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            BookInstance.findByIdAndUpdate(req.params.id, book_instance, {}, function (err, thebookinstance) {
                if (err) {
                    return next(err);
                }
                // Successful - redirect to book detail page.
                res.redirect(thebookinstance.url);
            });
        }
    },
];
exports.bookinstance_update_post = bookinstance_update_post;
