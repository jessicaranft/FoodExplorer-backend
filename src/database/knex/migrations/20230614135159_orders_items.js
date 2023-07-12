exports.up = knex => knex.schema.createTable("orders_items", table => {
  table.increments("id");
  table.text("food_title");
  table.integer("user_id").references("id").inTable("users");
  table.integer("food_id").references("id").inTable("food").onDelete("CASCADE");
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");

  table.integer("quantity");
  table.decimal("item_total_price", 10, 2);

  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders_items");