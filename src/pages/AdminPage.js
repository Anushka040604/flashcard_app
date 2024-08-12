// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css'; 

const AdminPage = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editingFlashcard, setEditingFlashcard] = useState(null);

    useEffect(() => {
        axios.get('/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddFlashcard = () => {
        axios.post('/api/flashcards', newFlashcard)
            .then(response => {
                setFlashcards([...flashcards, { ...newFlashcard, id: response.data.id }]);
                setNewFlashcard({ question: '', answer: '' });
            })
            .catch(error => console.error(error));
    };

    const handleEditFlashcard = (id) => {
        axios.put(`/api/flashcards/${id}`, editingFlashcard)
            .then(() => {
                setFlashcards(flashcards.map(fc => fc.id === id ? { ...fc, ...editingFlashcard } : fc));
                setEditingFlashcard(null);
            })
            .catch(error => console.error(error));
    };

    const handleDeleteFlashcard = (id) => {
        axios.delete(`/api/flashcards/${id}`)
            .then(() => setFlashcards(flashcards.filter(fc => fc.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div className="admin-page">
            <h2>Admin Dashboard</h2>
            <div className="add-flashcard">
                <input
                    type="text"
                    placeholder="Question"
                    value={newFlashcard.question}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={newFlashcard.answer}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                />
                <button onClick={handleAddFlashcard}>Add Flashcard</button>
            </div>
            <div className="flashcards-list">
                {flashcards.map(fc => (
                    <div key={fc.id} className="flashcard-item">
                        <div>{fc.question}</div>
                        <div>{fc.answer}</div>
                        <button onClick={() => setEditingFlashcard(fc)}>Edit</button>
                        <button onClick={() => handleDeleteFlashcard(fc.id)}>Delete</button>
                    </div>
                ))}
            </div>
            {editingFlashcard && (
                <div className="edit-flashcard">
                    <input
                        type="text"
                        placeholder="Edit Question"
                        value={editingFlashcard.question}
                        onChange={(e) => setEditingFlashcard({ ...editingFlashcard, question: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Edit Answer"
                        value={editingFlashcard.answer}
                        onChange={(e) => setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })}
                    />
                    <button onClick={() => handleEditFlashcard(editingFlashcard.id)}>Save</button>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
