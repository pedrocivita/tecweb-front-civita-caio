import './App.css';
import axios from "axios";
import { useState } from "react";
import Movie from './components/Movie/Movie';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '70%',
    height: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'rgba(0, 0, 100, 0)',
    border: 'none',
    overflow: 'auto',
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 70, 0.8)'
  }
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
      return <p className='label'>Select a year and choose your favorite movies!</p>
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
        .delete("http://localhost:8000/movie/" + encodeURIComponent(like.title) + "/")
        .then((response) => {GetFilmes()});
      }

      return(
        <div className='bodyLikes'>
          <p class="mymovies">{like.title}</p>
          <button className="deleteBtn" onClick={Delete}>Delete</button>
        </div>
      )
    })
  }

  return (
    <div className="App">
    <button className="btnFav" onClick={openModal}>⭐</button>
    <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
    >
      <div className="modal-scrollbar-container">
        <div className="likes">
          <Likes />
        </div>
      </div>
      
    </Modal>
    <form onSubmit= {Movile} >
      <div className='formatForms'>
        <div className='forms'>
          <input placeholder='Select a year...' onChange={(event) => setAno(event.target.value)}/>
          <button className='btn' type="submit"> GO </button>
        </div>
        </div>
    </form>
    <div className='format'>
      <Filmes />
    </div>
    <p>Select a valid year, from 1960 to 2021!</p>
  </div>
  );
}

export default App;
