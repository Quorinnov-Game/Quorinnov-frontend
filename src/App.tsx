import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import Game from './pages/Game'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Home /></div>,
  },
  {
    path: '/game',
    element: <div><Game /></div>
  },
  {
    path: '/rules',
    element: <div>Rules</div>
  },
  {
    path: '/about',
    element: <div>About</div>
  },
  {
    path: '/tuto',
    element: <div>Tuto</div>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
