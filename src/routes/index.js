"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
/**
 * Load the Express.js router
 *
 * @since 1.0.0
 */
var router = express_1.default.Router();
/**
 * Load the homepage
 *
 * @since 1.0.0
 */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
exports.default = router;
