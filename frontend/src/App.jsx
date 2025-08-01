import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from "./pages/Home";  
import About from './pages/About';
 import Resources from './pages/Resources';
 import Journal from './pages/Journal';
import Chat from './pages/Chat';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
       
       <Route path="/resources" element={<Resources />} />
       <Route path="/journal" element={<Journal />} />
         <Route path="/chat" element={<Chat />} />


        
      </Routes>
      <Footer />
    </>
  )
}

export default App
