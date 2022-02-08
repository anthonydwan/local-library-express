"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genre_update_post = exports.genre_update_get = exports.genre_delete_post = exports.genre_delete_get = exports.genre_create_post = exports.genre_create_get = exports.genre_detail = exports.genre_list = void 0;
var express_validator_1 = require("express-validator");
var Genre = require("../models/genre");
var Book = require("../models/book");
var async = require("async");
// Display list of all genres
var genre_list = function (req, res, next) {
    return Genre.find()
        .sort([["name", "ascending"]])
        .exec(function (err, list_genre) {
        if (err)
            return next(err);
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
            return next(err);
        if (results.genre == null) {
            var e = new Error("Genre not found");
            res.status(404);
            return next(e);
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
    return res.render("genre_form", { title: "Create Genre" });
};
exports.genre_create_get = genre_create_get;
// Handle genre create on POST
var genre_create_post = [
    // Validate and sanitize the name field
    (0, express_validator_1.body)("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    function (req, res, next) {
        // Extract the validation errors cfrom a request
        var errors = (0, express_validator_1.validationResult)(req);
        // Create a genre object with escaped and trimmed data
        var genre = new Genre({ name: req.body.name });
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with santized values/error messages.
            res.render("genre_form", {
                title: "Create Genre",
                genre: genre,
                errors: errors.array(),
            });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
                if (err)
                    return next(err);
                if (found_genre) {
                    res.redirect(found_genre.url);
                }
                else {
                    genre.save(function (err) {
                        if (err)
                            return next(err);
                        // Genre saved. Redirect to genre detail page.
                        res.redirect(genre.url);
                    });
                }
            });
        }
    },
];
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
