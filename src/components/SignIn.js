import React, { useState } from 'react';
import './SignIn.css';
import sign_img from '../assets/sign_img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { auth } from '../firebase'; // Ensure firebase.js is properly configured
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignIn = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const googleProvider = new GoogleAuthProvider();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully!');
      setError('');
      setTimeout(() => navigate('/'), 2000); // Navigate to home page after 2 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess('Signed in with Google successfully!');
      setError('');
      setTimeout(() => navigate('/'), 2000); // Navigate to home page after 2 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-image">
        <img src={sign_img} alt="Buildings" />
      </div>
      <div className="sign-in-form">
        <h1>Sign in</h1>
        <p>Create your account in seconds</p>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="terms">
            <input type="checkbox" required />
            <span>I agree to the terms and privacy policy</span>
          </div>
          <button type="submit" className="sign-in-btn">Create an account</button>
        </form>
        <p>
          Already a member? <a href="/login">Login</a>
        </p>
        <div className="or-continue">
          <p>Or continue with</p>
          <button className="google-btn" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} /> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
