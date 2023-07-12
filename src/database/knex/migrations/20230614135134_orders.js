exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");

  table.integer("total_items").defaultTo(0);
  table.decimal("total_price", 10, 2);
  table.text("status");
  table.text("payment_method");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");