import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios.defaults.headers.common['x-api-key'] =
      'b1dfeea4-d632-4776-b494-723bac3c8eb2';

    const getData = async () => {
      let resultAll = await axios.get('https://api.thecatapi.com/v1/breeds');
      console.log(resultAll);
    };
    getData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello! Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
