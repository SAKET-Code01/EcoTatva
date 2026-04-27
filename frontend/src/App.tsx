import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import PageWrapper from './components/layout/PageWrapper';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Events from './pages/Events';
import Learn from './pages/Learn';
import Articles from './pages/Articles';
import Games from './pages/Games';
import Profile from './pages/Profile';
import Login from './pages/Login';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-green-600">Loading...</div>;
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <TaskProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<PageWrapper />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>
              <Route path="/games" element={<Games />} />
            </Routes>
          </Router>
        </TaskProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
