import { useEffect, useState } from "react";
import { createPokemon, getAllTypes } from "../Api";
import { useNavigate } from "react-router-dom";
import style from "./Create.module.css";

export function Create() {
  const [submiting, setSubmiting] = useState(false);

  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    async function run() {
      let data = await getAllTypes();
      setTipos(data);
    }
    run();
  }, []);

  const [data, setData] = useState({
    name: "",
    imagen: "",
    ataque: 1,
    vida: 1,
    velocidad: 1,
    defensa: 1,
    peso: 1,
    altura: 1,
    types: [],
  });

  const [error, setError] = useState({
    name: false,
    imagen: false,
    ataque: false,
    vida: false,
    velocidad: false,
    defensa: false,
    peso: false,
    altura: false,
    types: false,
  });

  const navigate = useNavigate();
  function validate() {
    let error = {
      name: data.name == "",
      imagen: data.imagen == "",
      ataque: data.ataque == "",
      vida: data.vida == "",
      velocidad: data.velocidad == "",
      peso: data.peso == "",
      altura: data.altura == "",
      types: data.types.length == 0,
    };
    setError(error);
    return !(
      error.name ||
      error.vida ||
      error.imagen ||
      error.ataque ||
      error.velocidad ||
      error.altura ||
      error.peso ||
      error.types
    );
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmiting(true);
    let pokemon = await createPokemon(data);
    navigate("/detail/" + pokemon.id);
  }

  if (submiting) {
    return <div>submiting</div>;
  }
  return (
    <div>
      <div> Create </div>
      <div className={style.field}>
        <div className={style.label}>Nombre</div>
        <input
          className={error.name ? style.error : ""}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        ></input>
      </div>

      <div className={style.field}>
        <div className={style.label}>imagen</div>
        <input
          className={error.imagen ? style.error : ""}
          value={data.imagen}
          onChange={(e) => setData({ ...data, imagen: e.target.value })}
        ></input>
      </div>

      <div className={style.field}>
        <div className={style.label}>Ataque</div>
        <input
          className={error.ataque ? style.error : ""}
          type="number"
          value={data.ataque}
          onChange={(e) => setData({ ...data, ataque: e.target.value })}
        ></input>
      </div>

      <div className={style.field}>
        <div className={style.label}>Vida</div>
        <input
          className={error.vida ? style.error : ""}
          type="number"
          value={data.vida}
          onChange={(e) => setData({ ...data, vida: e.target.value })}
        ></input>
      </div>

      <div className={style.field}>
        <div className={style.label}>Velocidad</div>

        <input
          className={error.velocidad ? style.error : ""}
          type="number"
          value={data.velocidad}
          onChange={(e) => setData({ ...data, velocidad: e.target.value })}
        ></input>
      </div>

      <div className={style.field}>
        <div className={style.label}>Altura</div>

        <input
          className={error.altura ? style.error : ""}
          type="number"
          value={data.altura}
          onChange={(e) => setData({ ...data, altura: e.target.value })}
        ></input>
      </div>

      <div className={style.field}>
        <div className={style.label}>Peso</div>
        <input
          className={error.peso ? style.error : ""}
          type="number"
          value={data.peso}
          onChange={(e) => setData({ ...data, peso: e.target.value })}
        ></input>
      </div>
      <div>
        <div>Tipos</div>
        <div className={style.tipos + " " + (error.types ? style.error : "")}>
          {tipos.map((tipo) => (
            <div>
              <input
                type="checkbox"
                checked={data.types.indexOf(tipo.id) >= 0}
                onChange={(e) => {
                  let newtypes = data.types.filter((t) => t != tipo.id);

                  if (e.target.checked) {
                    newtypes.push(tipo.id);
                  }
                  setData({ ...data, types: newtypes });
                }}
              />
              {tipo.name}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Crear Pokemon</button>
    </div>
  );
}
