import './App.css';
import React from 'react';
import RoutesComponent from './components/RoutesComponent';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
