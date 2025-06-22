"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: genres,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
// Static method to update availability
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
