const knex = require('../database/knex');
const { hash } = require('bcryptjs');

const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

class UsersController {
  async create (req, res) {
    const { name, email, password } = req.body;
    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (checkUserExists) {
      throw new AppError("Este e-mail já está cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    //await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
    const [user] = await knex("users").insert({ name, email, password: hashedPassword });

    await knex("orders").insert({ user_id: user });

    return res.status(201).json();
  }
}

module.exports = UsersController;