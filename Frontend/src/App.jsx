import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/admin/Login';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound/>}/>

            <Route path="/admin/login" element={<Login/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;