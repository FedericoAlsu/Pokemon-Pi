const { Pokemon, Type } = require("../db.js");
const TypeController = {
  getAllTypes: async (req, res, next) => {
    try {
      let types = await Type.findAll();
      res.send(types.map((t) => t.toJSON()));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = TypeController;
