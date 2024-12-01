import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Add any additional authentication checks here
    if (!token) {
      localStorage.removeItem('token');
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
} 