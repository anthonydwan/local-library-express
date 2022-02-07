"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    res.send("Wiki home page");
});
// About page route
router.get("/about", function (req, res) {
    res.send("About this wiki");
});
module.exports = router;
