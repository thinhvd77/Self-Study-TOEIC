import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import PracticePage from './pages/Practice'
import VocabularyPage from './pages/Vocabulary'

function DashboardPage() {
  return <div>Dashboard - Coming soon</div>
}

function GrammarPage() {
  return <div>Grammar - Coming soon</div>
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice/*" element={<PracticePage />} />
            <Route path="/vocabulary/*" element={<VocabularyPage />} />
            <Route path="/grammar/*" element={<GrammarPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
