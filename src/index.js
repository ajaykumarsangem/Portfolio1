import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import reportWebVitals from './reportWebVitals';
import About from './About';
import Hero from './Hero';
import Navbar from './Navbar';
import Projects from './Projects';
import Contact from './Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <About/>
    <Hero/>
    <Navbar/>
    <Projects/>
    <Contact/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
