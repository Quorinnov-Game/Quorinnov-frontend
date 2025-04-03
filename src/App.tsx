import './App.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router'
import Home from './pages/Home'
import Game from './pages/Game'
import Rules from './pages/Rules'
import Tuto from './pages/Tuto'
import BlurBackground from './config/BlurBackground'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <div><Home /></div>,
//   },
//   {
//     path: '/game',
//     element: <div><Game /></div>
//   },
//   {
//     path: '/rules',
//     element: <div><Rules /></div>
//   },
//   {
//     path: '/about',
//     element: <div>About</div>
//   },
//   {
//     path: '/tuto',
//     element: <div><Tuto /></div>
//   },
// ])

function App() {

  return (
    // Use BrowserRouter for use the hook
    <BrowserRouter>
      <BlurBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/tuto" element={<Tuto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
