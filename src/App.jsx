import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
