import { Link } from "react-router-dom";
import pokelogo from "./../pokelogo.png";
import style from "./Landing.module.css";
import { useEffect, useState } from "react";
export function Landing() {
  const [isEnviado,setIsEnviado] = useState(false)
  const [brillante,setBrillante] = useState(false)
  // componentDidMount() {
  //    this.audio = new Audio('./../pokeaudio.mp3')
  //     this.audio.load()
  //      this.playAudio()
  //      }
  //       playAudio() {
  //          const audioPromise = this.audio.play()
  //           if (audioPromise !== undefined) {
  
  //              audioPromise .then(_ => {   }) .catch(err => {  console.info(err) }) } }


  return (
    <section className={style.seccion}>
      <img src={pokelogo} className={style.imagen} />
      <Link to="home" type="button" className={style.link}>
        Haz click aqui
      </Link>
    </section>
  );
}
