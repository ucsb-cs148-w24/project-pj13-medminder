import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './components/AuthContext';
import { BrowserRouter } from "react-router-dom";
import { TourProvider } from '@reactour/tour'

// ReacTour: steps of the elements to highlight
const steps = [
  {
    selector: '.todayButton',
    content: 'Click this button to jump to the current day.',
  },
  {
    selector: '.button1',
    content: 'Add a New Alert.',
  },
  {
    selector: '.modal-content',
    content: 'Click this button to jump to the current day.',
  },
  // ...
]

ReactDOM.render(
  <GoogleOAuthProvider clientId="48920437462-2209kti0vlp0sv5tq72egns0hm2shocg.apps.googleusercontent.com">
    <React.StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <TourProvider steps={steps}>
            <App />
          </TourProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
