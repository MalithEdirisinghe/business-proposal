import React, { useEffect, useState } from 'react';
import './Login.css';
import loginImage from '../assets/login_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../firebase'; // Import Firebase auth
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        // Add the 'login-page' class to the body
        document.body.classList.add('login-page');

        // Cleanup: Remove the 'login-page' class when the component unmounts
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Navigate to the home page on successful login
        } catch (err) {
            setError(err.message); // Display error message
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/'); // Navigate to the home page on successful login
        } catch (err) {
            setError(err.message); // Display error message
        }
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={loginImage} alt="Buildings" />
            </div>
            <div className="login-form">
                <h1>Login</h1>
                <p>Login your account in seconds</p>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Keep me logged in</label>
                        <a href="/forgot-password" className="forgot-password">
                            Forget password?
                        </a>
                    </div>
                    <button type="submit" className="login-btn">Log in</button>
                </form>
                <div className="login-form-text">
                    <p>
                        Don’t have an account? <a href="/sign-in">Sign up</a>
                    </p>
                    <div className="or-continue">
                        <p>Or continue with</p>
                    </div>
                    <div className="social-buttons">
                        <button className="google-btn" onClick={handleGoogleLogin}>
                            <FontAwesomeIcon icon={faGoogle} /> Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
