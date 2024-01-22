import { useEffect, useState } from "react";
import { getOnePokemon } from "../Api";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

export function Detail() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function run() {
      let data = await getOnePokemon(id);
      setDetail(data);
    }
    run();
  }, []);
  if (detail == null) {
    return <div>Loading</div>;
  }
  return (
    <div className={style.propiedad}>
      <div className={style.name}>{detail.name}</div>
      <img className={style.img_pokemon} src={detail.imagen} />
      <div className={style.card}>
        <div className={style.cardRow}> Vida: {detail.vida}</div>
        <div className={style.cardRow}> Ataque: {detail.ataque}</div>
        <div className={style.cardRow}> Velocidad: {detail.velocidad}</div>
        <div className={style.cardRow}> Altura: {detail.altura}</div>
        <div className={style.cardRow}> Peso: {detail.peso}</div>
        <div className={style.cardRow}>
          {" "}
          {detail.types.map((t) => (
            <span className={style.type}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
