const { Router } = require("express");
const pokemonController = require("../controllers/pokemon");
const PokemonController = require("../controllers/pokemon");
const router = Router();

router.get("/", pokemonController.getAll);
router.get("/random", pokemonController.getRandom);
//router.get("/tipo" , pokemonController.getType)
router.get("/:idPokemon", pokemonController.getOne);
//router.get("/name/:name", pokemonController.getOneByName)
router.post("/", PokemonController.create);

//router.get("/:idPokemon")
module.exports = router;
