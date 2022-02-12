// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - index.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 1/28/2022, Added in the MainTemplate)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainTemplate from './components/template/MainTemplate';

ReactDOM.render(
  <BrowserRouter>
    <MainTemplate />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
