"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.author_update_post = exports.author_update_get = exports.author_delete_post = exports.author_delete_get = exports.author_create_post = exports.author_create_get = exports.author_detail = exports.author_list = void 0;
var Author = require("../models/author");
// Display list of all Authors
var author_list = function (req, res, next) {
    return Author.find()
        .sort([["family_name", "ascending"]])
        .exec(function (err, list_authors) {
        if (err)
            next(err);
        res.render("author_list", {
            title: "Author List",
            author_list: list_authors,
        });
    });
};
exports.author_list = author_list;
// Display detail page for a specific Author
var author_detail = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author detail: " + req.params.id);
};
exports.author_detail = author_detail;
// Display Author create form on GET
var author_create_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author create GET");
};
exports.author_create_get = author_create_get;
// Handle Author create on POST
var author_create_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Author create POST");
};
exports.author_create_post = author_create_post;
// Display Author delete frorm on GET
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
