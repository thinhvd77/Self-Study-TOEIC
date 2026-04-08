import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow p-4 flex gap-4">
          <Link to="/" className="font-bold text-blue-600">Dashboard</Link>
          <Link to="/practice" className="text-gray-700 hover:text-blue-600">Practice</Link>
          <Link to="/vocabulary" className="text-gray-700 hover:text-blue-600">Vocabulary</Link>
          <Link to="/grammar" className="text-gray-700 hover:text-blue-600">Grammar</Link>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/practice/*" element={<div>Practice</div>} />
            <Route path="/vocabulary/*" element={<div>Vocabulary</div>} />
            <Route path="/grammar/*" element={<div>Grammar</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
