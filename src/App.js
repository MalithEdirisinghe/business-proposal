import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Login from './components/Login';
import SelectMethod from './components/SelectMethod';
import LanguageSelect from './components/LanguageSelect';
import TextRecord from './components/TextRecord';
import VoiceRecord from './components/VoiceRecord';
import ProposalGeneration from './components/ProposalGeneration';
import SelectMethodLogo from './components/logo/SelectMethodLogo';
import UploadImage from './components/logo/UploadImage';
import EditVoiceLogo from './components/logo/EditVoiceLogo';
import proposal_img from './assets/proposal.png';
import logo_creation from './assets/logo_creation.png';
import web_img from './assets/web_for_business.png';
import home_img from './assets/home_image.png';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleBusinessProposalClick = () => {
    if (isAuthenticated) {
      navigate('/select-method'); // Navigate to SelectLanguage if authenticated
    } else {
      navigate('/login'); // Navigate to Login if not authenticated
    }
  };

  const handleLogoCreationlClick = () => {
    if (isAuthenticated) {
      navigate('/select-method-logo'); // Navigate to SelectLanguage if authenticated
    } else {
      navigate('/login'); // Navigate to Login if not authenticated
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="App">
      {/* Conditionally display the header on all pages except Login and SignIn */}
      {location.pathname !== '/login' && location.pathname !== '/sign-in' && (
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="hero">
                <div className="hero-text">
                  <h1>Empowering Entrepreneurs, Driving Innovation, and Building Connections in Sri Lanka</h1>
                  <p>
                    BizConnect Lanka is a one-stop digital platform designed to transform how entrepreneurs, investors, and business owners connect, collaborate, and grow.
                    Whether you’re launching a startup, seeking investors, or expanding your market presence, we’re here to support your journey.
                  </p>
                </div>
                <div className="hero-image">
                  <img src={home_img} alt="Skyscrapers" />
                </div>
              </section>
              <Section
                title="Business Proposal Creation"
                description="Transform your ideas into investor-ready proposals with ease."
                image={proposal_img}
                buttonText="Try it now"
                handleClick={handleBusinessProposalClick} // Pass the navigation function
              />
              <Section
                title="Logo Creation"
                description="Design professional logos and posters effortlessly."
                image={logo_creation}
                buttonText="Try it now"
                handleClick={handleLogoCreationlClick} 
              />
              <Section
                title="Website for Business"
                description="Launch a professional online presence without any technical skills."
                image={web_img}
                buttonText="Try it now"
              />
            </main>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-method" element={<SelectMethod isAuthenticated={isAuthenticated} />} />
        <Route path="/select-language" element={<LanguageSelect isAuthenticated={isAuthenticated} />} />
        <Route path="/text-record" element={<TextRecord isAuthenticated={isAuthenticated} />} />
        <Route path="/voice-record" element={<VoiceRecord isAuthenticated={isAuthenticated} />} />
        <Route path="/select-method-logo" element={<SelectMethodLogo isAuthenticated={isAuthenticated} />} />
        <Route path="/proposal-generation" element={<ProposalGeneration isAuthenticated={isAuthenticated} />} />
        <Route path="/upload-image" element={<UploadImage isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-voice-logo" element={<EditVoiceLogo isAuthenticated={isAuthenticated} />} />
      </Routes>
      {/* Always display the footer on the home page */}
      {location.pathname === '/' && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
