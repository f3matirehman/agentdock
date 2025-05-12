import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agents from './pages/Agents';
import Tools from './pages/Tools';
import Logs from './pages/Logs';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
