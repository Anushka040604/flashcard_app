// server/controllers/flashcardController.js
const db = require('../database');

const getAllFlashcards = (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) {
            console.error('Error fetching flashcards:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
};

const addFlashcard = (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
        if (err) {
            console.error('Error adding flashcard:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(201).json({ id: results.insertId, question, answer });
        }
    });
};

const updateFlashcard = (req, res) => {
    const id = req.params.id;
    const { question, answer } = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, results) => {
        if (err) {
            console.error('Error updating flashcard:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ id, question, answer });
        }
    });
};

const deleteFlashcard = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting flashcard:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(204).send(); // No content
        }
    });
};

module.exports = {
    getAllFlashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard
};
