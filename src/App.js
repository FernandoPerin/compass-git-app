import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importando Componentes
import Login from './Components/Login/Login.js';
import Home from './Components/Home/Home.js';

// Função para recuperar o Cookie setado pelo servidor
function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

var cookieGitHub = getCookie('cookieGitHub');

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        // Se o usuário não estiver logado, vá para página de Login
        <Route
          path="*"
          element={!cookieGitHub ? <Navigate to="/login" /> : <Home />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
