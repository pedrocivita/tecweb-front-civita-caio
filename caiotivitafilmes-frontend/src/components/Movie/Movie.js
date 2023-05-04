import './Movie.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Movie(props) {
    const [rotation, setRotation] = useState(0);
    useEffect(() => {
      setRotation(randomInt(-0, 0));
    }, []);

    function Like(event){
          axios
          .post("http://localhost:8000/movies/", {title: props.title})
          .then((response) => {});
        }

    function Delete(event){
          axios
          .delete("http://localhost:8000/movie/" + props.title + "/")
          .then((response) => {});
        }
  
    const style = { transform: `rotate(${rotation}deg)` };
    const classe = `card card-color-${randomInt(1, 5)}`;
    return (
      <div className={classe} style={style}>
        <div className="card-action">
          <h3 className="card-title">{props.title}</h3>
          <button className='btnCard' onClick={Like}>❤️</button>

        </div>
      </div>
    );
  }