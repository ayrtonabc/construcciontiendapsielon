import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Trigger effect when the path changes

  return null; // This component doesn't render anything visible
}

export default ScrollToTop;
