import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Paste from './components/Paste.jsx'
import ViewPaste from './components/ViewPaste.jsx'

const Layout = ({ children }) => (
  <div className="min-h-screen bg-black text-white">
    <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col items-center text-center gap-8">
      <Navbar />
      <main className="w-full flex flex-col items-center">{children}</main>
    </div>
  </div>
)

const router = createBrowserRouter([
  { path: '/', element: <Layout><Home /></Layout> },
  { path: '/pastes', element: <Layout><Paste /></Layout> },
  { path: '/pastes/:id', element: <Layout><ViewPaste /></Layout> },
])

export default function App() {
  return <RouterProvider router={router} />
}