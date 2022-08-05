import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
