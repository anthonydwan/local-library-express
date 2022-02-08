"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_update_post = exports.book_update_get = exports.book_delete_post = exports.book_delete_get = exports.book_create_post = exports.book_create_get = exports.book_detail = exports.book_list = exports.index = void 0;
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
            next(err);
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
            next(err);
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
var book_create_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book create GET");
};
exports.book_create_get = book_create_get;
// Handle bookinstance create on POST
var book_create_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book create POST");
};
exports.book_create_post = book_create_post;
// Display bookinstance delete frorm on GET
var book_delete_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book delete GET");
};
exports.book_delete_get = book_delete_get;
// Handle bookinstance delete on POST
var book_delete_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book delete POST");
};
exports.book_delete_post = book_delete_post;
// Display bookinstance update form on GET
var book_update_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book update GET");
};
exports.book_update_get = book_update_get;
// Display bookinstance update form on POST
var book_update_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book update POST");
};
exports.book_update_post = book_update_post;
