import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle shadow-sm' : 'bg-transparent'}`}>
        <div className="container-max">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tight text-accent">
              AK.
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-text-secondary hover:text-accent'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-subtle bg-bg-secondary text-text-secondary text-sm hover:text-accent transition-colors group"
              >
                <Search className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                <span>Search...</span>
                <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-xs font-sans bg-bg-primary border border-border-subtle rounded text-text-secondary">⌘K</kbd>
              </button>

              {/* <Link to="/admin" className="p-2 text-text-secondary hover:text-accent transition-colors" title="Admin Portal">
                <User className="w-5 h-5" />
              </Link> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(true)} className="text-text-secondary hover:text-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-accent p-2 -mr-2">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-primary border-b border-border-subtle overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-lg font-medium text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* <div className="pt-4 mt-4 border-t border-border-subtle flex gap-4 px-3">
                  <Link to="/admin" className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors">
                    <User className="w-4 h-4" /> Admin Login
                  </Link>
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
