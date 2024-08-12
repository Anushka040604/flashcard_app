const db = require('../database');

const getAllFlashcards = (callback) => {
    db.query('SELECT * FROM flashcards', callback);
};

const addFlashcard = (flashcard, callback) => {
    const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(query, [flashcard.question, flashcard.answer], callback);
};

module.exports = {
    getAllFlashcards,
    addFlashcard
};
