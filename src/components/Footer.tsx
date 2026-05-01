import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/BLACK_LOGO_ROVYN trans.png';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer>
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label="Rovyn home" onClick={handleLogoClick}>
            <img src={logo} alt="Rovyn" className="logo-image" />
          </Link>
          <p>AI transformation for companies that want results, not experiments.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://www.linkedin.com/in/maxleow/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/inaarcs/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://x.com/inaarcs" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
            <li><a href="mailto:hi@rovyn.my">hi@rovyn.my</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2026 Rovyn. All rights reserved.</span>
        <span>Terms &nbsp;|&nbsp; Privacy</span>
      </div>
    </>
  );
}
