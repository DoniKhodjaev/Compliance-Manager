import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginForm } from './components/LoginForm';
import { ProtectedContent } from './ProtectedContent';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/app/dashboard" />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/app/*"
          element={
            isAuthenticated ? (
              <ProtectedContent onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
