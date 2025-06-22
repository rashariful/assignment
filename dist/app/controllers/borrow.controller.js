"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooksSummary = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.default.findById(bookId);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < quantity)
            throw new Error('Not enough copies available');
        book.copies -= quantity;
        book.available = book.copies > 0;
        yield book.save();
        const borrow = yield borrow_model_1.default.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'An error occurred',
            error
        });
    }
});
exports.borrowBook = borrowBook;
const getBorrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_model_1.default.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'book'
            }
        },
        { $unwind: '$book' },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: '$book.title',
                    isbn: '$book.isbn'
                }
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: result
    });
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
