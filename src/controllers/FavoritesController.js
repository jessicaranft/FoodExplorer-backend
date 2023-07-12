const knex = require('../database/knex');

class FavoritesController {
  async create (req, res) {
    const { user_id, food_id } = req.body;

    const favorites = await knex("favorites").insert({
      user_id,
      food_id
    });

    return res.json(favorites);
  }

  async show (req, res) {
    const { user_id, food_id } = req.query;

    const favorites = await knex("favorites").where({ user_id, food_id });
    const isFavorite = favorites.length > 0;

    return res.json({ isFavorite });
  }

  async index (req, res) {
    const { user_id } = req.query;

    const favorites = await knex("favorites")
      .select([
        "favorites.id",
        "food.title",
        "food.image"
      ])
      .join("food", "favorites.food_id", "food.id")
      .where("favorites.user_id", user_id);

      return res.json(favorites);
  }

  async delete (req, res) {
    const { id, user_id } =  req.params;

    await knex("favorites").where({ id, user_id }).delete();

    return res.json();
  }
}

module.exports = FavoritesController;