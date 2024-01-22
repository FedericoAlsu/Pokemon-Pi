import { useEffect, useState } from "react";
import { getAllPokemon, getAllTypes, getRandomPokemon } from "../Api";
import { Link, useNavigate } from "react-router-dom";
import style from "./Home.module.css";

export function Home() {
  const navigate = useNavigate();
  const [orderDir, setOrderDir] = useState("asc");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [tipo, setTipo] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    async function run() {
      let data = await getAllTypes();
      setTipos(data);
    }
    run();
  }, []);

  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function run() {
      let data = await getAllPokemon({
        tipo: tipo,
        limit: 12,
        offset: page * 12,
        name: search,
        orderBy: orderBy,
        orderDir: orderDir,
        source: source,
      });
      setPokemons(data.results);
      setTotalPages(Math.ceil(data.count / 12));
    }
    run();
  }, [search, orderBy, orderDir, tipo, source, page]);
  return (
    <div>
      <div> Home </div>
      <div>
        <input onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      <div>
        <button
          className={style.random}
          onClick={async () => {
            let poke = await getRandomPokemon();
            navigate("/detail/" + poke.id);
          }}
        >
        </button>
      </div>
      <div>
        <select value={orderDir} onChange={(e) => setOrderDir(e.target.value)}>
          <option value={"asc"}>Acendiente</option>
          <option value={"desc"}>Descendiente</option>
        </select>
      </div>
      <div>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">All types</option>
          {tipos.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">ambas fuentes</option>
          <option value="api"> pokeapi</option>
          <option value="db"> db</option>
        </select>
      </div>
      <div className={style.pokemonGrid}>
        {pokemons.map((poke) => (
          <Link to={"/detail/" + poke.id} style={{ textDecoration: "none" }}>
            <div className={style.pokemonCard}>
              <div>{poke.name}</div>

              <img className={style.poke_image} src={poke.imagen} />
              <div className={style.cardRow}>
                {poke.types.map((t) => (
                  <span className={style.type}>{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(Math.max(0, page - 1))}>
          Prev Page
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>

        <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))}>
          Next Page
        </button>
      </div>
    </div>
  );
}
