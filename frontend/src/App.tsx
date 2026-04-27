import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import PageWrapper from './components/layout/PageWrapper';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Events from './pages/Events';
import Learn from './pages/Learn';
import Articles from './pages/Articles';
import Profile from './pages/Profile';
import Games from './pages/Games';

function ProtectedRoute() {
  const { currentUser, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-green-600">Loading...</div>;
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                {/* All normal pages use PageWrapper (sidebar + header) */}
                <Route element={<PageWrapper />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Games is full-screen and stays OUTSIDE PageWrapper */}
                <Route path="/games" element={<Games />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
