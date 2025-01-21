
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './assets/styles.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Get location to read state from navigation

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
    
        try {
            const response = await fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Include cookies
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid username or password');
                } else {
                    throw new Error('Something went wrong. Please try again.');
                }
            }
    
            const data = await response.json();
            console.log('Login successful, data:', data);
    
            if (data.role === 'CUSTOMER') {
                console.log('Navigating to customer home...');
                navigate('/customerhome');
            } else if (data.role === 'ADMIN') {
                console.log('Navigating to admin home...');
                navigate('/adminhome');
            } else {
                throw new Error('Login failed. Unknown role.');
            }
        } catch (err) {
            console.error('Error during login:', err.message);
            setError(err.message);
        }
    };
    

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-title">Login</h1>

                {/* Display success message if available in state */}
                {location.state?.message && (
                    <p className="success-message">{location.state.message}</p>
                )}

                {/* Display error message for failed login */}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSignIn} className="form-content">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="forgot-password-link">
                        <a href="/forgot-password" className="form-link">Forgot Password?</a>
                    </div>

                    <button type="submit" className="form-button">Sign IN</button>
                </form>
                <div className="form-footer">
                    New user?{' '}
                    <a href="/register" className="form-link">Sign up here</a>
                </div>
            </div>
        </div>
    );
}
