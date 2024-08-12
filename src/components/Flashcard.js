// src/components/Flashcard.js
import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ flashcard }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`flashcard ${isFlipped ? 'flip' : ''}`} onClick={handleFlip}>
            <div className="front">
                {flashcard.question}
            </div>
            <div className="back">
                {flashcard.answer}
            </div>
        </div>
    );
};

export default Flashcard;
