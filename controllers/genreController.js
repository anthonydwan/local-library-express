"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genre_update_post = exports.genre_update_get = exports.genre_delete_post = exports.genre_delete_get = exports.genre_create_post = exports.genre_create_get = exports.genre_detail = exports.genre_list = void 0;
var Genre = require("../models/genre");
var Book = require("../models/book");
var async = require("async");
// Display list of all genres
var genre_list = function (req, res, next) {
    return Genre.find()
        .sort([["name", "ascending"]])
        .exec(function (err, list_genre) {
        if (err)
            next(err);
        res.render("genre_list", {
            title: "Genre List",
            genre_list: list_genre,
        });
    });
};
exports.genre_list = genre_list;
// Display detail page for a specific genre
var genre_detail = function (req, res, next) {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id).exec(callback);
        },
        genre_books: function (callback) {
            Book.find({ genre: req.params.id }).exec(callback);
        },
    }, function (err, results) {
        if (err)
            next(err);
        if (results.genre == null) {
            var e = new Error("Genre not found");
            res.status(404);
            next(e);
        }
        res.render("genre_detail", {
            title: "Genre Detail",
            genre: results.genre,
            genre_books: results.genre_books,
        });
    });
};
exports.genre_detail = genre_detail;
// Display genre create form on GET
var genre_create_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre create GET");
};
exports.genre_create_get = genre_create_get;
// Handle genre create on POST
var genre_create_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre create POST");
};
exports.genre_create_post = genre_create_post;
// Display genre delete frorm on GET
var genre_delete_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre delete GET");
};
exports.genre_delete_get = genre_delete_get;
// Handle genre delete on POST
var genre_delete_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre delete POST");
};
exports.genre_delete_post = genre_delete_post;
// Display genre update form on GET
var genre_update_get = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre update GET");
};
exports.genre_update_get = genre_update_get;
// Display genre update form on POST
var genre_update_post = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre update POST");
};
exports.genre_update_post = genre_update_post;
