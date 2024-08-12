import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Flashcard from './Flashcard';
import './FlashcardList.css';

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => {
                console.log('Flashcards fetched:', response.data);
                setFlashcards(response.data);
            })
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setIsFlipped(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setIsFlipped(false);
    };

    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => {
                setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
                console.log(`Flashcard ${id} deleted`);
            })
            .catch(error => console.error('Error deleting flashcard:', error));
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // Navigate to the edit page
    };

    if (flashcards.length === 0) return <div>Loading...</div>;

    const { question, answer, id } = flashcards[currentIndex];

    return (
        <div className="flashcard-list">
            {flashcards.length > 0 && (
                <Flashcard flashcard={{ question, answer }} />
            )}
            <div className="navigation">
                <button onClick={handlePrevious} disabled={flashcards.length === 0}>Previous</button>
                <button onClick={handleNext} disabled={flashcards.length === 0}>Next</button>
                {flashcards.length > 0 && (
                    <>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                        <button onClick={() => handleEdit(id)}>Edit</button> {/* Updated to button */}
                    </>
                )}
            </div>
        </div>
    );
};

export default FlashcardList;
