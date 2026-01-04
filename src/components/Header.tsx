import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Discovery', path: '/discovery' },
    { label: 'Systems', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Connect', path: '/contact' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 ${
          scrolled ? 'bg-background/80 backdrop-blur-2xl border-b border-foreground/5 py-3' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-primary/20">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.2em] text-foreground italic uppercase leading-none">
                CinePulse
              </span>
              <span className="text-[8px] font-mono text-primary/60 tracking-[0.5em] uppercase leading-none mt-1">
                AI_Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative px-1 py-1 group ${
                    isActive(link.path) ? 'text-foreground' : 'text-foreground/40 hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive(link.path) ? (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary"
                    />
                  ) : (
                    <div className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-foreground/20 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-6 border-l border-foreground/10 pl-10 ml-2">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center gap-5">
                   <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-foreground/40 uppercase tracking-widest leading-none">STATUS // ACTIVE</span>
                    <span className="text-[11px] font-bold italic text-primary leading-tight uppercase tracking-wider">{user?.full_name || user?.email.split('@')[0]}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout}
                    className="rounded-full h-10 px-4 text-[9px] font-bold uppercase tracking-widest text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all border border-transparent hover:border-primary/10"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="rounded-full px-8 bg-primary text-primary-foreground font-extrabold h-11 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all beam-border">
                    Launch
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-foreground bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-colors border border-foreground/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden p-8 pt-32 bg-background/98 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-12 h-full">
              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl uppercase font-bold tracking-[0.2em] italic ${
                        isActive(link.path) ? 'text-primary' : 'text-foreground/40'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pb-12"
              >
                {isAuthenticated ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
                      <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-1">Authenticated User</p>
                      <p className="text-xl font-bold italic text-primary">{user?.email}</p>
                    </div>
                    <Button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full rounded-full h-16 bg-foreground/5 text-foreground font-bold uppercase tracking-[0.2em] text-xs border border-foreground/10"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full bg-primary text-primary-foreground font-extrabold h-20 uppercase tracking-[0.3em] text-sm shadow-2xl shadow-primary/20 beam-border">
                      Launch Discovery
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
