import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground italic">
              CinePulse<span className="text-primary/40">.com</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative px-1 py-1 ${
                    isActive(link.path) ? 'text-foreground' : 'text-foreground/40 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    />
                  )}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 border-l border-foreground/10 pl-8 ml-4">
              <ThemeToggle />
              <Link to="/discovery">
                <Button size="sm" className="rounded-xl px-6 bg-primary text-primary-foreground font-bold h-10 hover:bg-primary/90 uppercase tracking-widest text-[10px] active:scale-95">
                  Launch
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] md:hidden p-6 pt-24 bg-background/98 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-8">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[10px] uppercase font-bold tracking-[0.4em] ${
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
              >
                <Link to="/discovery" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full rounded-2xl bg-primary text-black font-bold h-16 uppercase tracking-widest text-xs">
                    Launch Engine
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
