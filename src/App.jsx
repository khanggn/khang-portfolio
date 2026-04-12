import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import CaseStudy from './pages/CaseStudy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
