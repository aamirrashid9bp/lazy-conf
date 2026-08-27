import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import CustomScrollbar from './components/CustomScrollbar.jsx'
import useLenis from './hooks/useLenis.js'
import { LeadModalProvider } from './context/LeadModalContext.jsx'
import LeadCaptureModal from './components/forms/LeadCaptureModal.jsx'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  // Initialize Lenis smooth scroll
  useLenis()

  return (
    <div className="page-wrapper min-h-screen bg-grey-1 text-grey-text font-sans">
      <Loader />
      <Navbar />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        
        {/* Support both .html extension and clean routes for seamless migration */}
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/project/:projectId.html" element={<ProjectPage />} />
      </Routes>

      <Footer />
      <CustomScrollbar />
      <LeadCaptureModal />
    </div>
  )
}

function App() {
  return (
    <Router>
      <LeadModalProvider>
        <AppContent />
      </LeadModalProvider>
    </Router>
  )
}

export default App
