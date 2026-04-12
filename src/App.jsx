import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Playlist from './pages/Playlist'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
