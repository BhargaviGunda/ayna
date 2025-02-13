import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!identifier || !password) {
            alert("Please enter both email/username and password.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier,
                password
            });
            console.log("Login successful:", response.data);
            navigate('/chat');
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);

            if (error.response?.status === 400) {
                alert("User not found. Please register first.");
                navigate('/register');
            } else {
                alert(error.response?.data?.error?.message || "Login failed");
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
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>
            
            <input 
                type="text" 
                placeholder="Username or Email"
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)}
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
                onClick={handleLogin}
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
                Login
            </button>

            <div style={{ marginTop: "15px", fontSize: "14px" }}>
                Don't have an account? 
                <a href="/register" style={{ color: "#007bff", textDecoration: "none", marginLeft: "5px" }}>
                    Signup here
                </a>
            </div>
        </div>
    );
};

export default Login;
