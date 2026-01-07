
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, Mail, MapPin, MessageCircle,
  ChevronRight, LayoutDashboard, LogOut, User,
  HardHat, Info, Briefcase, PhoneCall, LogIn,
  Home as HomeIcon
} from 'lucide-react';
// Renamed Home page import to avoid collision with Home icon
import HomePage from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { COMPANY_INFO } from './constants';
import { UserProfile } from './types';
import { ToastProvider } from './components/Toast';
import ElevenLabsWidget from './components/ElevenLabsWidget';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = ({ user, onLogout }: { user: UserProfile | null; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const navLinks = [
    // Used HomeIcon instead of the Home page component
    { name: 'Home', path: '/', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Services', path: '/services', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <HardHat className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  if (isDashboard) return null;

  return (
    <nav className="fixed w-full z-50 glass-nav border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="https://i.postimg.cc/2jcQwfK9/Whats-App-Image-2026-01-06-at-5-38-07-PM.jpg"
                alt="FOTABONG ROYAL ENTERPRISE Logo"
                className="h-12 w-auto object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-primary font-black text-lg leading-tight tracking-tight">FOTABONG ROYAL</span>
                <span className="text-chocolate font-bold text-[10px] tracking-[0.2em] uppercase">ENTERPRISE</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-chocolate ${location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link
                to="/dashboard"
                className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-800 transition-all shadow-md"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="border-2 border-primary text-primary px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Client Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          // Cast motion.div to any to avoid IntrinsicAttributes typing error
          <motion.div
            {...({
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: 'auto' },
              exit: { opacity: 0, height: 0 }
            } as any)}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-3">
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
                  >
                    Client Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-6 group">
            <img
              src="https://i.postimg.cc/2jcQwfK9/Whats-App-Image-2026-01-06-at-5-38-07-PM.jpg"
              alt="Logo"
              className="h-10 w-auto object-contain rounded-md"
            />
            <h3 className="text-lg font-bold text-white tracking-wider leading-tight">
              FOTABONG ROYAL<br /><span className="text-chocolate text-xs uppercase tracking-widest">ENTERPRISE</span>
            </h3>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Leading the construction and engineering industry in Cameroon with trust, transparency, and technical excellence.
          </p>
          <div className="flex space-x-4">
            <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} className="bg-gray-800 p-2.5 rounded-full hover:bg-chocolate transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="bg-gray-800 p-2.5 rounded-full hover:bg-chocolate transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Our Services</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>Roads & Bridges</li>
            <li>Land Acquisition</li>
            <li>Architectural Design</li>
            <li>Bill of Quantities</li>
            <li>Property Management</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-white">Our Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-white">Client Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Headquarters</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-chocolate shrink-0 mt-1" />
              <span>{COMPANY_INFO.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-chocolate shrink-0" />
              <span>{COMPANY_INFO.phones[0]}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-chocolate shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved. Designed for Excellence.
      </div>
    </footer>
  );
};


export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        // Fallback to local storage if needed, or clear it
        const savedUser = localStorage.getItem('fre_user');
        if (savedUser) setUser(JSON.parse(savedUser));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        localStorage.removeItem('fre_user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile) {
      const userProfile: UserProfile = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      };
      setUser(userProfile);
      localStorage.setItem('fre_user', JSON.stringify(userProfile));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('fre_user');
    setUser(null);
    window.location.hash = '#/';
  };


  return (
    <ToastProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar user={user} onLogout={handleLogout} />
          <main className="flex-grow pt-16">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
              <Route path="/dashboard/*" element={<Dashboard user={user} onLogout={handleLogout} />} />
            </Routes>
          </main>
          <Footer />
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[100] flex items-center justify-center border-4 border-white"
          >
            <MessageCircle size={28} />
          </a>
        </div>
      </Router>
      <ElevenLabsWidget />
    </ToastProvider>
  );
}
