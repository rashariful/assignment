"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const router = express_1.default.Router();
router.post('/', book_controller_1.createBook);
router.get('/', book_controller_1.getAllBooks);
router.get('/:bookId', book_controller_1.getBookById);
router.patch('/:bookId', book_controller_1.updateBookById);
router.delete('/:bookId', book_controller_1.deleteBookById);
exports.default = router;
