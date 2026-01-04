import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Features from './pages/Features'
import About from './pages/About'
import Discovery from './pages/Discovery'
import Recommendations from './pages/Recommendations'
import Contact from './pages/Contact'
import Header from './components/Header'
import './index.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
import { ThemeProvider } from './components/ThemeProvider'
import { RecommendationProvider } from './context/RecommendationProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cinepulse-theme">
      <RecommendationProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-background">
            {/* Header Navigation */}
            <Header />

            {/* Content */}
            <div className="relative">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/discovery" element={<Discovery />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </RecommendationProvider>
    </ThemeProvider>
  )
}


export default App
