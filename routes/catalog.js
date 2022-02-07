"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Require controller modules
var bookinstanceController_1 = require("../controllers/bookinstanceController");
var bookController_1 = require("../controllers/bookController");
var authorController_1 = require("../controllers/authorController");
var genreController_1 = require("../controllers/genreController");
/// BOOK ROUTES ///
// GET catalog home page.
router.get("/", bookController_1.index);
// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", bookController_1.book_create_get);
// POST request for creating Book.
router.post("/book/create", bookController_1.book_create_post);
// GET request to delete Book.
router.get("/book/:id/delete", bookController_1.book_delete_get);
// POST request to delete Book.
router.post("/book/:id/delete", bookController_1.book_delete_post);
// GET request to update Book.
router.get("/book/:id/update", bookController_1.book_update_get);
// POST request to update Book.
router.post("/book/:id/update", bookController_1.book_update_post);
// GET request for one Book.
router.get("/book/:id", bookController_1.book_detail);
// GET request for list of all Book items.
router.get("/books", bookController_1.book_list);
/// AUTHOR ROUTES ///
// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", authorController_1.author_create_get);
// POST request for creating Author.
router.post("/author/create", authorController_1.author_create_post);
// GET request to delete Author.
router.get("/author/:id/delete", authorController_1.author_delete_get);
// POST request to delete Author.
router.post("/author/:id/delete", authorController_1.author_delete_post);
// GET request to update Author.
router.get("/author/:id/update", authorController_1.author_update_get);
// POST request to update Author.
router.post("/author/:id/update", authorController_1.author_update_post);
// GET request for one Author.
router.get("/author/:id", authorController_1.author_detail);
// GET request for list of all Authors.
router.get("/authors", authorController_1.author_list);
/// GENRE ROUTES ///
// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genreController_1.genre_create_get);
//POST request for creating Genre.
router.post("/genre/create", genreController_1.genre_create_post);
// GET request to delete Genre.
router.get("/genre/:id/delete", genreController_1.genre_delete_get);
// POST request to delete Genre.
router.post("/genre/:id/delete", genreController_1.genre_delete_post);
// GET request to update Genre.
router.get("/genre/:id/update", genreController_1.genre_update_get);
// POST request to update Genre.
router.post("/genre/:id/update", genreController_1.genre_update_post);
// GET request for one Genre.
router.get("/genre/:id", genreController_1.genre_detail);
// GET request for list of all Genre.
router.get("/genres", genreController_1.genre_list);
/// BOOKINSTANCE ROUTES ///
// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/bookinstance/create", bookinstanceController_1.bookinstance_create_get);
// POST request for creating BookInstance.
router.post("/bookinstance/create", bookinstanceController_1.bookinstance_create_post);
// GET request to delete BookInstance.
router.get("/bookinstance/:id/delete", bookinstanceController_1.bookinstance_delete_get);
// POST request to delete BookInstance.
router.post("/bookinstance/:id/delete", bookinstanceController_1.bookinstance_delete_post);
// GET request to update BookInstance.
router.get("/bookinstance/:id/update", bookinstanceController_1.bookinstance_update_get);
// POST request to update BookInstance.
router.post("/bookinstance/:id/update", bookinstanceController_1.bookinstance_update_post);
// GET request for one BookInstance.
router.get("/bookinstance/:id", bookinstanceController_1.bookinstance_detail);
// GET request for list of all BookInstance.
router.get("/bookinstances", bookinstanceController_1.bookinstance_list);
module.exports = router;
