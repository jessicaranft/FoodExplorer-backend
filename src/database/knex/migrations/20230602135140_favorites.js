exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id");

  table.integer("user_id").references("id").inTable("users");
  table.integer("food_id").references("id").inTable("food");
});

exports.down = knex => knex.schema.dropTable("favorites");