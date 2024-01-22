const { Pokemon, Type } = require("../db.js");
const { Op, where, Sequelize } = require("sequelize");
function cleanPokemonEntity(poke) {
  return {
    ...poke.toJSON(),
    types: poke.types.map((t) => t.name),
  };
}
const PokemonController = {
  fetchFromPokeApi: async () => {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1400");
    let data = await response.json();
    for (let poke of data.results) {
      let existing = await Pokemon.findOne({ where: { name: poke.name } });
      if (existing != null) {
        return;
      }
      let response = await fetch(poke.url);
      let data = await response.json();
      let pokemonObj = await Pokemon.create({
        pokeApiId: data.id,
        name: data.name,
        vida: data.stats[0].base_stat,
        defensa: data.stats[2].base_stat,
        ataque: data.stats[1].base_stat,
        velocidad: data.stats[5].base_stat,
        altura: data.height,
        peso: data.weight,
        imagen: data?.sprites?.other["official-artwork"]?.front_default ?? "",
      });

      for (let ptype of data.types) {
        let typeName = ptype.type.name;
        let typeObj = await Type.findOne({ where: { name: typeName } });
        if (typeObj == null) {
          typeObj = await Type.create({ name: typeName });
        }
        pokemonObj.addTypes(typeObj);
      }
    }
  },



  getAll: async (req, res, next) => {
    try {
      let { name, orderBy, orderDir, tipo, source, offset, limit } = req.query;
      let filter = {};
      if (name != null && name != "") {
        filter = { name: name };
      }
      if (source == "api") {
        filter = {
          ...filter,
          pokeApiId: {
            //
            [Op.ne]: null,
          },
        };
      } else if (source == "db") {
        filter = {
          ...filter,
          pokeApiId: null,
        };
      }
      let order = [];
      if (orderBy != null) {
        let dir = "ASC";
        if (orderDir == "desc") {
          dir = "DESC";
        }
        order = [[orderBy, dir]];
      }
      let filterTipo = {};
      if (tipo != null && tipo != "") {
        filterTipo = { name: tipo };
      }
      limit = parseInt(limit);
      offset = parseInt(offset);
      let resultado = await Pokemon.findAndCountAll({
        include: { model: Type, where: filterTipo },
        where: filter,
        order: order,
        limit: isNaN(limit) ? undefined : limit,
        offset: isNaN(offset) ? undefined : offset,
        distinct: true,
      });
      let responseobj = {
        count: resultado.count,
        results: resultado.rows.map(cleanPokemonEntity),
      };
      res.send(responseobj);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res) => {
    let { idPokemon } = req.params;
    let pokemon = await Pokemon.findByPk(idPokemon, { include: Type });
    if (pokemon == null) {
      res.sendStatus(404);
      return;
    }
    let respuesta = cleanPokemonEntity(pokemon);

    res.send(respuesta);

    // let response = await fetch(
    //   "https://pokeapi.co/api/v2/pokemon/" + idPokemon,
    //   () => {}
    // );
    // let data = await response.json();
    // res.send(data);
  },
  getOneByName: async (req, res) => {
    try {
      let { name } = req.params;
      let resultado = await Pokemon.findOne({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });

      res.send(resultado);
    } catch (error) {
      console.log(error);
    }
  },
  getType: async (req, res) => {
    try {
      let response = await fetch("https://pokeapi.co/api/v2/type", () => {});
      let data = await response.json();
      for (let index = 0; index < data.results.length; index++) {
        Type.create({ name: data.results[index].name });
      }
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res, next) => {
    try {
      let {
        name,
        imagen,
        velocidad,
        vida,
        defensa,
        ataque,
        altura,
        peso,
        types,
      } = req.body;

      let resultado = await Pokemon.create({
        name,
        imagen,
        velocidad,
        vida,
        defensa,
        ataque,
        altura,
        peso,
      });
      resultado.addTypes(types);
      res.send(resultado);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PokemonController;
