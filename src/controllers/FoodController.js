const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');
const AppError = require('../utils/AppError');

class FoodController {
  async create(req, res) {
    const { title, category, price, description, ingredients } = req.body;
    const imageFileName = req.file.filename;
    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFileName);

    const [food_id] = await knex('food').insert({
      title,
      category,
      price,
      description,
      image: filename
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        food_id,
        name
      }
    });

    await knex('ingredients').insert(ingredientsInsert);

    return res.json();
  }

  async update (req, res) {
    const { title, category, price, description, ingredients, image } = req.body;
    const { id } = req.params;
    const diskStorage = new DiskStorage();

    const food = await knex("food").where({ id }).first();

    if (!food) {
      throw new AppError("Prato não encontrado!");
    }

    if (req.file) {
      const imageFileName = req.file.filename;

      if (food.image) {
        await diskStorage.deleteFile(food.image);
      }

      const filename = await diskStorage.saveFile(imageFileName);
      food.image = image ?? filename;
    }

    food.title = title ?? food.title;
    food.category = category ?? food.category;
    food.price = price ?? food.price;
    food.description = description ?? food.description;

    await knex("food").where({ id }).update(food);
    await knex("food").where({ id }).update("updated_at", knex.fn.now());

    const ingredientsUpdate = ingredients.map(ingredient => {
      return {
        food_id: id,
        name: ingredient
      }
    });

    await knex('ingredients').where({ food_id: id }).delete();
    await knex('ingredients').where({ food_id: id }).insert(ingredientsUpdate);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;
  
    const food = await knex('food').where({ id }).first();
    const ingredients = await knex('ingredients').where({ food_id: id }).orderBy('name');

    return res.json({
      ...food,
      ingredients
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex('food').where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, ingredients } = req.query;
    let foods;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

      foods = await knex('ingredients')
        .select([
          'food.id',
          'food.title'
        ])
        .whereLike('food.title', `%${title}%`)
        .where(function () {
          filterIngredients.forEach((ingredient, index) => {
            if (index === 0) {
              this.where('name', 'LIKE', `%${ingredient}%`);
            } else {
              this.orWhere('name', 'LIKE', `%${ingredient}%`);
            }
          });
        })
        .innerJoin('food', 'food.id', 'ingredients.food_id')
        .groupBy('food.id')
        .orderBy('food.title');
        // .whereIn('name', filterIngredients)
        // .whereIn(knex.raw('lower(name)'), filterIngredients.map(name => name.toLowerCase()))

    } else {
      foods = await knex('food')
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    const allIngredients = await knex('ingredients');
    const foodWithIngredients = foods.map(food => {
      const foodIngredients = allIngredients.filter(ingredient => ingredient.food_id === food.id);

      return {
        ...food,
        ingredients: foodIngredients
      }
    })

    return res.json(foodWithIngredients);
  }
}

module.exports = FoodController;