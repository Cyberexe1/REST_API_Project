import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import diaryLogo from '../assets/diary-logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate('/diary');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-page">
      {/* Enhanced Header */}
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="logo-container">
            <div className="logo">
              <img src={diaryLogo} alt="Diary Logo" className="logo-image" />
              {/* <span>MyDiary</span> */}
            </div>
            {/* <span className="logo-tagline">Your Personal Journey</span> */}
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/diary" className="nav-link">My Diary</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1>Your Personal Digital Diary</h1>
          <p className="hero-subtitle">
            Capture your thoughts, feelings, and memories in a beautiful, secure space.
            Your personal journey, beautifully documented.
          </p>
          <div className="cta-buttons">
            <button onClick={handleGetStarted} className="cta-button primary">Get Started</button>
            <Link to="/diary" className="cta-button secondary">View Diary</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Entries Created</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>
        <div className="book-container">
          <div className="book">
            <img
              alt="diary"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNdsGDLTnqqqyVUppXkBea-J8hsEK-65Z9wA&s"
            />
          </div>
        </div>
      </main>

      <section className="features-section">
        <h2>Why Choose MyDiary?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your thoughts are safe with us. End-to-end encryption ensures your privacy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Access Anywhere</h3>
            <p>Write and read your entries from any device, anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Enjoy a clean, modern interface that makes writing a pleasure.</p>
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"MyDiary has completely transformed how I document my life. It's become an essential part of my daily routine."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👩</div>
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Daily User</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The security features give me peace of mind, and the interface is so intuitive. Highly recommended!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👨</div>
              <div className="author-info">
                <h4>Michael Chen</h4>
                <p>Premium User</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Pricing Section */}
      <section className="pricing-section">
        <h2>Simple, Transparent Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0</div>
            <ul className="features-list">
              <li>✓ Basic Diary Features</li>
              <li>✓ 100 Entries</li>
              <li>✓ Basic Security</li>
              <li>✓ Mobile Access</li>
            </ul>
            <button className="pricing-button">Get Started</button>
          </div>
          <div className="pricing-card featured">
            <div className="popular-tag">Most Popular</div>
            <h3>Premium</h3>
            <div className="price">$4.99<span>/month</span></div>
            <ul className="features-list">
              <li>✓ All Free Features</li>
              <li>✓ Unlimited Entries</li>
              <li>✓ Advanced Security</li>
              <li>✓ Priority Support</li>
              <li>✓ Custom Themes</li>
            </ul>
            <button className="pricing-button primary">Upgrade Now</button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>MyDiary</h4>
            <p>Your personal journey, beautifully documented.</p>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/diary">My Diary</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates and special offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 MyDiary. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 