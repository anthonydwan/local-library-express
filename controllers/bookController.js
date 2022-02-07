"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_update_post = exports.book_update_get = exports.book_delete_post = exports.book_delete_get = exports.book_create_post = exports.book_create_get = exports.book_detail = exports.book_list = exports.index = void 0;
var book_1 = require("../models/book");
var bookinstance_1 = require("../models/bookinstance");
var genre_1 = require("../models/genre");
var author_1 = require("../models/author");
var async = require("async");
var index = function (req, res) {
    async.parallel({
        book_count: function (callback) { return book_1.Book.countDocuments({}, callback); },
        book_instance_count: function (callback) {
            return bookinstance_1.BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function (callback) {
            return bookinstance_1.BookInstance.countDocuments({ status: "Available" }, callback);
        },
        author_count: function (callback) { return author_1.Author.countDocuments({}, callback); },
        genre_count: function (callback) { return genre_1.Genre.countDocuments({}, callback); },
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
var book_list = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book list");
};
exports.book_list = book_list;
// Display detail page for a specific bookinstance
var book_detail = function (req, res) {
    return res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);
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
