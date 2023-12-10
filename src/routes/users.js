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
 * Load the user page
 *
 * @since 1.0.0
 */
router.get('/', function (req, res, next) {
    res.send('Respond with a resource');
});
exports.default = router;
