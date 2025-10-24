import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Tracking from './pages/Tracking'
import Billing from './pages/Billing'
import Quotes from './pages/Quotes'
import Support from './pages/Support'
import Towing from './pages/Towing'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracking/:vehicleId" element={<Tracking />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/support" element={<Support />} />
            <Route path="/towing" element={<Towing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App