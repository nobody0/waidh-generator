import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Monster } from './pages/Monster'
import { Kerker } from './pages/Kerker'
import { Abenteuer } from './pages/Abenteuer'
import { NSCs } from './pages/NSCs'
import { Schicksal } from './pages/Schicksal'
import { Vergiftung } from './pages/Vergiftung'
import Dice from './pages/Dice'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="monster" element={<Monster />} />
          <Route path="kerker" element={<Kerker />} />
          <Route path="abenteuer" element={<Abenteuer />} />
          <Route path="nscs" element={<NSCs />} />
          <Route path="schicksal" element={<Schicksal />} />
          <Route path="vergiftung" element={<Vergiftung />} />
          <Route path="wuerfel" element={<Dice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
