import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserIdProvider } from './components/UserIdContext';
import { AuthContextProvider } from './components/AuthContext';
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <GoogleOAuthProvider clientId="48920437462-2209kti0vlp0sv5tq72egns0hm2shocg.apps.googleusercontent.com">
      <React.StrictMode>
        <AuthContextProvider>
          <UserIdProvider>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </UserIdProvider>
        </AuthContextProvider>
      </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
