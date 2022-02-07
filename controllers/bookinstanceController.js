"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookinstance_update_post = exports.bookinstance_update_get = exports.bookinstance_delete_post = exports.bookinstance_delete_get = exports.bookinstance_create_post = exports.bookinstance_create_get = exports.bookinstance_detail = exports.bookinstance_list = void 0;
var BookInstance = require("../models/bookinstance");
// Display list of all bookinstances
var bookinstance_list = function (req, res, next) {
    BookInstance.find()
        .populate("book")
        .exec(function (err, list_bookinstances) {
        if (err)
            next(err);
        // successful, so render
        res.render("bookinstance_list", {
            title: "Book Instance List",
            bookinstance_list: list_bookinstances,
        });
    });
};
exports.bookinstance_list = bookinstance_list;
// Display detail page for a specific bookinstance
var bookinstance_detail = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance detail: " + req.params.id);
};
exports.bookinstance_detail = bookinstance_detail;
// Display bookinstance create form on GET
var bookinstance_create_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance create GET");
};
exports.bookinstance_create_get = bookinstance_create_get;
// Handle bookinstance create on POST
var bookinstance_create_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: BookInstance create POST");
};
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
