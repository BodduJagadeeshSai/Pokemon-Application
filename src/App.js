import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import Login from './LoginForms/Login';
import { PokemonProvider } from './context/PokemonContext';
import { AuthProvider, useAuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { state } = useAuthContext();

  return state.isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <PokemonProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PokemonList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemon/:name"
              element={
                <ProtectedRoute>
                  <PokemonDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </PokemonProvider>
    </AuthProvider>
  );
};

export default App;
