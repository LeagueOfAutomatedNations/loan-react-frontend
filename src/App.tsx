import React from 'react';
import logo from './logo.svg';
import './App.css';
import feathers from "@feathersjs/client";
import { SignUp } from './SignUp';
// https://medium.com/@samsonssali/quick-feathers-react-integration-13f1cb72fdbf

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SignUp></SignUp>
    </div>
  );
}

export default App;
