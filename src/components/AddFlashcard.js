import React, { useState } from 'react';
import axios from 'axios';
import './AddFlashcard.css'; // Import the CSS file

const AddFlashcard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/flashcards', { question, answer });
            alert('Flashcard added successfully!');
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add Flashcard</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Answer:</label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Flashcard</button>
            </form>
        </div>
    );
};

export default AddFlashcard;
