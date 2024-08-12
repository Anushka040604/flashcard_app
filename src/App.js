// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import AddFlashcard from './components/AddFlashcard';
import EditFlashcard from './components/EditFlashcard';
import './App.css'; // Import the CSS file

const Nav = () => {
    const location = useLocation();
    return (
        <nav>
            <h1>Flashcard Learning Tool</h1>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Flashcards</Link> | 
            <Link to="/add" className={location.pathname === '/add' ? 'active' : ''}>Add Flashcard</Link>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={<FlashcardList />} />
                    <Route path="/add" element={<AddFlashcard />} />
                    <Route path="/edit/:id" element={<EditFlashcard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
