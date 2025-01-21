import React from 'react';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './assets/styles.css';
function App() {
  return(
   <Router>
    <AppRoutes />
   </Router>
  );
}

export default App;
