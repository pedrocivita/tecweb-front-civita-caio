import React, { useEffect, useState } from "react";
import axios from "axios";

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Like(event, title){
    console.log(title)
      axios
      .post("http://localhost:8000/movies/", {title: title})
      .then((response) => {});
    }

export default function Movie(props) {
    const [rotation, setRotation] = useState(0);
    useEffect(() => {
      setRotation(randomInt(-5, 5));
    }, []);
  
  
    const style = { transform: `rotate(${rotation}deg)` };
    const classe = `card card-color-${randomInt(1, 5)}`;
    
    return (
      <div className={classe} style={style}>
        <div className="card-action">
          <h3 className="card-title">{props.title}</h3>
          <h onClick={Like(props.title)}>❤️</h>
          <h>⭐</h>
        </div>
      </div>
    );
  }