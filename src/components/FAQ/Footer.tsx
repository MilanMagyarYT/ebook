import './Footer.css';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* Left side: Logo */}
        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>

        {/* Right side: Sections */}
        <div className="footer-right">
          <div className="footer-links-group">
            <div className="footer-links-label">Sections</div>
            <div className="footer-links">
              <a href="#for-students">For Students</a>
              <a href="#watch-first">Watch First</a>
              <a href="#what-inside">What’s inside</a>
              <a href="#real-results">Real Results</a>
              <a href="#roadmap">Roadmap</a>
              <a href="#pricing">Pricing</a>
              <a href="/refund-policy">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
