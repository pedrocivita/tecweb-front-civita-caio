import './App.css';
import axios from "axios";
import { useState } from "react";
import Movie from './components/Movie/Movie';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function App() {

  const [likes, setLikes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [ano, setAno] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

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
      });
    }

  function GetFilmes(event){
      axios
      .get("http://localhost:8000/movies/")
      .then((response) => {
        setLikes(response.data);
      });
    }

  function openModal() {
      GetFilmes();
      setIsOpen(true);
    }

  function closeModal() {
      setIsOpen(false);
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

  const Likes = () => {
    return likes.map((like) => {

      function Delete(event){
        console.log("a")
        axios
        .delete("http://localhost:8000/movie/" + like.title + "/")
        .then((response) => {GetFilmes()});
      }

      return(
        <div className='body'>
          <p class="mymovies">{like.title}</p>
          <button onClick={Delete}>👹</button>
        </div>
      )
    })
  }

  return (
    <div className="App">
    <button onClick={openModal}>🎃</button>
    <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
    ><Likes/></Modal>
    <form onSubmit= {Movile} >
      <div className='formatForms'>
        <div className='forms'>
          <input placeholder='Digite um ano...' onChange={(event) => setAno(event.target.value)}/>
          <button className='btn' type="submit"> GO </button>
        </div>
        </div>
    </form>
    <Filmes />
  </div>
  );
}

export default App;
