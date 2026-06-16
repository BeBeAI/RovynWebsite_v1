import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/BLACK_LOGO_ROVYN trans.png';

interface NavProps {
  onGetInTouch: () => void;
}

export function Nav({ onGetInTouch }: NavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    if (location.pathname === '/services') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Small delay to allow home page to mount
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={isScrolled ? 'nav-scrolled' : ''}>
      <Link to="/" className="logo" onClick={handleLogoClick}>
        <span className="nav-brand">
          <img src={logo} alt="Rovyn logo" className="nav-logo-icon" />
          <span className="nav-wordmark"><span className="nav-wordmark-initial">R</span>ovyn</span>
        </span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/services" onClick={handleServicesClick}>Services</Link></li>
        <li><Link to="/assessment">AI Fit Check</Link></li>
        <li><a className="nav-cta" onClick={onGetInTouch}>Get in Touch</a></li>
      </ul>
    </nav>
  );
}
