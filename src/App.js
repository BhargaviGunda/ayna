import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Chat from './Chat';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
};

export default App;
