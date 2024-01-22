const { Router } = require("express");
const { Pokemon } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require("./pokemon");
const PokemonController = require("../controllers/pokemon.js");
const TypeController = require("../controllers/Type.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonRouter);
router.get("/types", TypeController.getAllTypes);

module.exports = router;
