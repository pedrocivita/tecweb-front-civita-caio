import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [filmes, setFilmes] = useState([]);

  function Movile(event) {
    useEffect(() => {

      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': 'ee86e4df16msh1a98ded04575ec5p1d27a0jsn74e1538c0c2e',
          'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
      };

      axios
      .get('https://moviesminidatabase.p.rapidapi.com/movie/byYear/2005/', options)
      .then((response) => setFilmes(response.data));
        
    }, []);

    console.log(filmes) }

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
          Learn React
        </a>
      </header>
      <form onSubmit="Movile">
        <input type="number" name="movile" id="movile" />
      </form>
    </div>
  );
}

export default App;
