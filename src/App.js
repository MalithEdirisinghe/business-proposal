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
import ProposalForm  from './components/ProposalForm';
import MissingDetails  from './components/MissingDetails';
import SelectMethodLogo from './components/logo/SelectMethodLogo';
import SelectMethodWeb from './components/web/SelectMethodWeb';
import WebText from './components/web/WebText';
import WebVoice from './components/web/WebVoice';
import UploadImage from './components/logo/UploadImage';
import EditVoiceLogo from './components/logo/EditVoiceLogo';
import EditTextLogo from './components/logo/EditTextLogo';
import CoverTemplateGenerator from "./components/CoverTemplateGenerator";
import TextLogo from './components/logo/TextLogo';
import CoverPage1 from './components/template/CoverPage1';
import CoverPage2 from './components/template/CoverPage2';
import CoverPage3 from './components/template/CoverPage3';
import CoverPage4 from './components/template/CoverPage4';
import CoverPage5 from './components/template/CoverPage5';
import CoverPage6 from './components/template/CoverPage6';
import CoverPage7 from './components/template/CoverPage7';
import CoverPage8 from './components/template/CoverPage8';
import CoverPage9 from './components/template/CoverPage9';
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

  const handleWebCreationlClick = () => {
    if (isAuthenticated) {
      navigate('/select-method-web'); // Navigate to SelectLanguage if authenticated
    } else {
      navigate('/login'); // Navigate to Login if not authenticated
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setIsAuthenticated(false);
    navigate('/');
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
                handleClick={handleBusinessProposalClick}
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
                handleClick={handleWebCreationlClick} 
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
        <Route path="/text-logo" element={<TextLogo isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-text-logo" element={<EditTextLogo isAuthenticated={isAuthenticated} />} />
        <Route path="/select-method-web" element={<SelectMethodWeb isAuthenticated={isAuthenticated} />} />
        <Route path="/web-text" element={<WebText isAuthenticated={isAuthenticated} />} />
        <Route path="/web-voice" element={<WebVoice isAuthenticated={isAuthenticated} />} />
        <Route path="/proposal-form" element={<ProposalForm isAuthenticated={isAuthenticated} />} />
        <Route path="/cover-template-generator" element={<CoverTemplateGenerator  isAuthenticated={isAuthenticated} />} />
        <Route path="/missing-details" element={<MissingDetails  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover1" element={<CoverPage1  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover2" element={<CoverPage2  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover3" element={<CoverPage3  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover4" element={<CoverPage4  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover5" element={<CoverPage5  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover6" element={<CoverPage6  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover7" element={<CoverPage7  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover8" element={<CoverPage8  isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-cover9" element={<CoverPage9  isAuthenticated={isAuthenticated} />} />
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
