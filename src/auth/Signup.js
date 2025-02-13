import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username || !email || !password) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', {
                username,
                email,
                password
            });

            console.log("Signup successful:", response.data);
            alert("Registration successful! Please log in.");
            navigate('/');
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);

            // Show a meaningful error message to the user
            if (error.response?.data?.error?.message) {
                alert(error.response.data.error.message);
            } else {
                alert("Signup failed! Please try again.");
            }
        }
    };

    return (
        <div style={{
            width: "350px",
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Register</h2>

            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    width: "90%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "16px"
                }}
            />

            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    width: "90%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "16px"
                }}
            />

            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: "90%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "16px"
                }}
            />

            <button 
                onClick={handleSignup}
                style={{
                    width: "90%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            >
                Sign Up
            </button>

            <div style={{ marginTop: "15px", fontSize: "14px" }}>
                Already have an account? 
                <a href="/" style={{ color: "#007bff", textDecoration: "none", marginLeft: "5px" }}>
                    Login here
                </a>
            </div>
        </div>
    );
};

export default Signup;
