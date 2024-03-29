"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_update_post = exports.book_update_get = exports.book_delete_post = exports.book_delete_get = exports.book_create_post = exports.book_create_get = exports.book_detail = exports.book_list = exports.index = void 0;
var express_validator_1 = require("express-validator");
var Book = require("../models/book");
var BookInstance = require("../models/bookinstance");
var Author = require("../models/author");
var Genre = require("../models/genre");
var async = require("async");
var index = function (req, res) {
    async.parallel({
        book_count: function (callback) { return Book.countDocuments({}, callback); },
        book_instance_count: function (callback) {
            return BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function (callback) {
            return BookInstance.countDocuments({ status: "Available" }, callback);
        },
        author_count: function (callback) { return Author.countDocuments({}, callback); },
        genre_count: function (callback) { return Genre.countDocuments({}, callback); },
    }, function (err, results) {
        return res.render("index", {
            title: "Local Library Home",
            error: err,
            data: results,
        });
    });
};
exports.index = index;
// Display list of all bookinstances
var book_list = function (req, res, next) {
    return Book.find({}, "title author")
        .sort({ title: 1 })
        .populate("author")
        .exec(function (err, list_books) {
        if (err)
            return next(err);
        // successful, so render
        res.render("book_list", { title: "Book List", book_list: list_books });
    });
};
exports.book_list = book_list;
// Display detail page for a specific bookinstance
var book_detail = function (req, res, next) {
    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id)
                .populate("author")
                .populate("genre")
                .exec(callback);
        },
        book_instance: function (callback) {
            BookInstance.find({ book: req.params.id }).exec(callback);
        },
    }, function (err, results) {
        if (err)
            return next(err);
        if (results.book == null) {
            var e = new Error("Book not found");
            res.status(404);
            return next(e);
        }
        res.render("book_detail", {
            title: results.book.title,
            book: results.book,
            book_instances: results.book_instance,
        });
    });
};
exports.book_detail = book_detail;
// Display bookinstance create form on GET
var book_create_get = function (req, res, next) {
    return async.parallel({
        authors: function (callback) { return Author.find(callback); },
        genres: function (callback) { return Genre.find(callback); },
    }, function (err, results) {
        if (err)
            return next(err);
        res.render("book_form", {
            title: "Create Book",
            authors: results.authors,
            genres: results.genres,
        });
    });
};
exports.book_create_get = book_create_get;
// Handle bookinstance create on POST
var book_create_post = [
    // Convert the genre to an array.
    function (req, res, next) {
        if (!(req.body.genre instanceof Array)) {
            typeof req.body.genre === "undefined"
                ? (req.body.genre = [])
                : (req.body.genre = new Array(req.body.genre));
        }
        next();
    },
    //  Validate and sanitize fields.
    (0, express_validator_1.body)("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("author", "Author must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("summary", "Summary must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)("genre.*").escape(),
    // Process request after validation and sanitization
    function (req, res, next) {
        // Extract the validation errors from a request.
        var errors = (0, express_validator_1.validationResult)(req);
        // Create a Book object with escaped and trimmed data.
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre,
        });
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // Get all authors and genres for form.
            async.parallel({
                authors: function (callback) { return Author.find(callback); },
                genres: function (callback) { return Genre.find(callback); },
            }, function (err, results) {
                if (err)
                    return next(err);
                // Mark our selected genres as checked.
                for (var i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id > -1)) {
                        results.genres[i].checked = "true";
                    }
                }
                res.render("book_form", {
                    title: "Create Book",
                    authors: results.authors,
                    genres: results.genres,
                    book: book,
                    errors: errors.array(),
                });
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            book.save(function (err) {
                if (err)
                    return next(err);
                // successful - redirect to new book record.
                res.redirect(book.url);
            });
        }
    },
];
exports.book_create_post = book_create_post;
// Display bookinstance delete frorm on GET
var book_delete_get = function (req, res, next) {
    return async.parallel({
        book: function (callback) { return Book.findById(req.params.id).exec(callback); },
        book_instance: function (callback) {
            return BookInstance.find({ book: req.params.id }).exec(callback);
        },
    }, function (err, results) {
        if (err)
            return next(err);
        if (results.book_instance.length == null)
            res.redirect("catalog/books");
        // need to remove all book instances first
        res.render("book_delete", {
            title: "Delete Book",
            book: results.book,
            book_instance: results.book_instance,
        });
    });
};
exports.book_delete_get = book_delete_get;
// Handle bookinstance delete on POST
var book_delete_post = function (req, res, next) {
    return async.parallel({
        book: function (callback) { return Book.findById(req.body.bookid).exec(callback); },
        book_instance: function (callback) {
            return BookInstance.find({ book: req.body.bookid }).exec(callback);
        },
    }, function (err, results) {
        if (err)
            return next(err);
        // Success
        if (results.book_instance.length > 0) {
            res.render("book_delete", {
                title: "Delete Book",
                book: results.book,
                book_instance: results.book_instance,
            });
            return;
        }
        else {
            // Book has no instance. Delete object and redirect to the list of book
            Book.findByIdAndRemove(req.body.bookid, function deleteBook(err) {
                if (err)
                    return next(err);
                // Success - go to author list
                res.redirect("/catalog/books");
            });
        }
    });
};
exports.book_delete_post = book_delete_post;
// Display bookinstance update form on GET
var book_update_get = function (req, res, next) {
    return async.parallel({
        book: function (callback) {
            return Book.findById(req.params.id)
                .populate("author")
                .populate("genre")
                .exec(callback);
        },
        authors: function (callback) { return Author.find(callback); },
        genres: function (callback) { return Genre.find(callback); },
    }, function (err, results) {
        if (err)
            return next(err);
        if (results.book == null) {
            var e = new Error("Book not found");
            res.status(404);
            return next(e);
        }
        // success
        for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
            for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                if (results.genres[all_g_iter]._id.toString() ===
                    results.book.genre[book_g_iter]._id.toString()) {
                    results.genres[all_g_iter].check = "true";
                }
            }
        }
        res.render("book_form", {
            title: "Update Book",
            authors: results.authors,
            genres: results.genres,
            book: results.book,
        });
    });
};
exports.book_update_get = book_update_get;
// Display bookinstance update form on POST
var book_update_post = [
    // Convert the genre to an array
    function (req, res, next) {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === "undefined")
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },
    // Validate and sanitize fields.
    (0, express_validator_1.body)("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("author", "Author must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("summary", "Summary must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)("genre.*").escape(),
    // Process request after validation and sanitization.
    function (req, res, next) {
        // Extract the validation errors from a request.
        var errors = (0, express_validator_1.validationResult)(req);
        // Create a Book object with escaped/trimmed data and old id.
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
            _id: req.params.id, //This is required, or a new ID will be assigned!
        });
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // Get all authors and genres for form.
            async.parallel({
                authors: function (callback) {
                    Author.find(callback);
                },
                genres: function (callback) {
                    Genre.find(callback);
                },
            }, function (err, results) {
                if (err) {
                    return next(err);
                }
                // Mark our selected genres as checked.
                for (var i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked = "true";
                    }
                }
                res.render("book_form", {
                    title: "Update Book",
                    authors: results.authors,
                    genres: results.genres,
                    book: book,
                    errors: errors.array(),
                });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err, thebook) {
                if (err) {
                    return next(err);
                }
                // Successful - redirect to book detail page.
                res.redirect(thebook.url);
            });
        }
    },
];
exports.book_update_post = book_update_post;
