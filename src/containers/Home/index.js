import React from "react";
import { reactLogo } from '../../assets/index';
import './App.css';
import Loader from "react-loader-spinner";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link bg-white rounded mt-5 px-10"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <a
          className="App-link2 bg-black rounded mt-2 px-2"
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          Information page
        </a>
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </header>
    </div>
  );
}

export default App;
