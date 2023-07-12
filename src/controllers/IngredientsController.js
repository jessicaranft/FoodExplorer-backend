const knex = require('../database/knex');

class IngredientsController {
  async index (req, res) {
    const ingredients = await knex("ingredients")
      .groupBy("name")

      return res.json(ingredients);
  }
}

module.exports = IngredientsController;