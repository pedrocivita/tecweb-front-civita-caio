import './App.css';
import axios from "axios";
import { useState } from "react";
import Movie from './components/Movie/Movie';

function App() {

  const [filmes, setFilmes] = useState([]);
  const [ano, setAno] = useState("");
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': 'ee86e4df16msh1a98ded04575ec5p1d27a0jsn74e1538c0c2e',
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
  };

  function Movile(event){
    event.preventDefault();
      axios
      .get('https://moviesminidatabase.p.rapidapi.com/movie/byYear/' + ano + "/", options)
      .then((response) => {
        setFilmes(response.data);
        console.log(filmes.results[0].title)
      });
    }
    
  const Filmes = () => {
    if (filmes.results === undefined) {
      return <p className='label'>Digite o ano em que você nasceu!</p>
    }
    return filmes.results.map((filme) => {
      return (
        <div className='body'>
          <div className="movieBox">
            <Movie title={filme.title}></Movie>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="App">
    <form onSubmit= {Movile} >
      <div className='formatForms'>
        <div className='forms'>
          <input placeholder='Digite um ano...' onChange={(event) => setAno(event.target.value)} />
          <button className='btn' type="submit"> GO </button>
        </div>
        </div>
    </form>
    <Filmes />
  </div>
  );
}

export default App;
