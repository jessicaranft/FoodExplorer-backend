const knex = require('../database/knex');

class OrdersController {
  async update (order_id) {
    const order = await knex("orders_items")
      .select(knex.raw("SUM(quantity) AS total_items, SUM(item_total_price) AS total_price"))
      .where({ order_id })
      .groupBy("order_id")
      .first();

    await knex("orders")
      .update({
        total_items: order.total_items || 0,
        total_price: order.total_price || 0
      })
      .where({ id: order_id });
  }

  async show (req, res) {
    const { user_id } = req.query;

    const order = await knex("orders")
      .select([
        "orders.id",
        "orders.total_price",
        "orders.total_items"
      ])
      .where({ user_id })
      .orderBy("id", "desc")
      .first();

      return res.json(order);
  }

  async index (req, res) {
    const { user_id } = req.query;

    const { is_admin } = await knex("users")
      .select("is_admin")
      .where("id", user_id)
      .first();

    if (is_admin === 1) {
      //console.log("Is admin");
      const orders = await knex("orders")
      .select([
        "orders.user_id",
        "orders.id",
        "orders.status",
        "orders.created_at",
      ])
      .join("orders_items", "orders.id", "orders_items.order_id")
      .join("food", "orders_items.food_id", "food.id")
      .groupBy("orders.id")
      .orderBy("orders.id", "desc");

      const items = await knex("orders_items")
        .select("quantity", "food.title", "orders_items.food_id", "order_id")
        .join("food", "orders_items.food_id", "food.id")

      const ordersWithItems = orders.map(order => {           
          const ordersItems = items.filter(item => item.order_id === order.id);
  
          return {
            ...order,
            items: ordersItems
          };
        });

      return res.json(ordersWithItems);

    } else {
      //console.log("Is not admin");
      const orders = await knex("orders")
      .select([
        "orders.id",
        "orders.status",
        "orders.created_at",
      ])
      .join("orders_items", "orders.id", "orders_items.order_id")
      .join("food", "orders_items.food_id", "food.id")
      .where("orders.user_id", user_id)
      .groupBy("orders.id")
      .orderBy("orders.id", "desc");

      const items = await knex("orders_items")
        .select("quantity", "food.title", "orders_items.food_id", "order_id")
        .join("food", "orders_items.food_id", "food.id")
        .where({ user_id })

      const ordersWithItems = orders.map(order => {           
          const ordersItems = items.filter(item => item.order_id === order.id);
  
          return {
            ...order,
            items: ordersItems
          };
        });

      return res.json(ordersWithItems);
    }
  }

  async updatePayment (req, res) {
    const { user_id } = req.params;
    const { payment_method } = req.body;

    const order = await knex("orders")
      .select("id")
      .where({ user_id })
      .orderBy("id", "desc")
      .first();

    await knex("orders").update({ payment_method }).where({ id: order.id });

    return res.json();
  }

  async updateStatus (req, res) {
    const { order_id } = req.params;
    const { status } = req.body;

    await knex("orders").update({ status }).where({ id: order_id });

    return res.json();
  }

  async completeOrder(req, res) {
    const { user_id, order_id } = req.params;

    await knex("orders").update({ status: "preparando" }).where({ id: order_id });

    const [newOrderId] = await knex("orders")
      .insert({ user_id, status: "pendente"})
      .returning("id");

    return res.json({newOrderId});
  }
}

module.exports = OrdersController;