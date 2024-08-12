// server/routes/flashcardRoutes.js
const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

// Route to get all flashcards
router.get('/', flashcardController.getAllFlashcards);

// Route to add a flashcard
router.post('/', flashcardController.addFlashcard);

// Route to update a flashcard by ID
router.put('/:id', flashcardController.updateFlashcard);

// Route to delete a flashcard by ID
router.delete('/:id', flashcardController.deleteFlashcard);

module.exports = router;
