// src/components/EditFlashcard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditFlashcard.css'; 

const EditFlashcard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flashcard, setFlashcard] = useState({ question: '', answer: '' });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/flashcards/${id}`)
            .then(response => {
                setFlashcard(response.data);
            })
            .catch(error => console.error('Error fetching flashcard:', error));
    }, [id]);

    const handleChange = (e) => {
        setFlashcard({ ...flashcard, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/flashcards/${id}`, flashcard)
            .then(() => {
                navigate('/');
            })
            .catch(error => console.error('Error updating flashcard:', error));
    };

    return (
        <div className="form-container">
            <h2>Edit Flashcard</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Question:
                    <input 
                        type="text" 
                        name="question" 
                        value={flashcard.question} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Answer:
                    <input 
                        type="text" 
                        name="answer" 
                        value={flashcard.answer} 
                        onChange={handleChange} 
                    />
                </label>
                <button type="submit">Update Flashcard</button>
            </form>
        </div>
    );
};

export default EditFlashcard;
