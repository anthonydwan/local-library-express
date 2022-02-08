"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genre_update_post = exports.genre_update_get = exports.genre_delete_post = exports.genre_delete_get = exports.genre_create_post = exports.genre_create_get = exports.genre_detail = exports.genre_list = void 0;
var Genre = require("../models/genre");
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
var genre_detail = function (req, res) {
    return res.send("NOT IMPLEMENTED: Genre detail: " + req.params.id);
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
