import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Start from './pages/start';
import Transfer from './pages/transfer';
import './index.css';

// interface RouteObject {
//   path?: string;
//   element?: React.ReactNode;
// }

function App():any {
  return (
    <Routes>
      <Route 
        path="/login"
        element={ <Login /> }
      />
      <Route 
        path="/register"
        element={ <Register /> }
      />
      <Route 
        path="/home"
        element={ <Home /> }
      />
      <Route 
        path="/transfer"
        element={ <Transfer /> }
      />
      <Route 
        path="/"
        element={ <Start /> }
      />
    </Routes>
  )
}

export default App
