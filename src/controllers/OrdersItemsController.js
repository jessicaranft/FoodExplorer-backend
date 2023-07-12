const knex = require('../database/knex');
const OrdersController = require('./OrdersController');

class OrdersItemsController {
  async create (req, res) {
    const { food_id, quantity } = req.body;
    const { user_id } = req.params;

    const { price } = await knex("food").select("price").where({ id: food_id }).first();

    const item_total_price = quantity * price;

    const [newOrder] = await knex("orders")
      .select("id")
      .where({ user_id })
      .orderBy("id", "desc")
      .limit(1);

    const { id: newOrderId } = newOrder;
    console.log("New Order ID:", newOrderId);

    const existingItem = await knex("orders_items")
      .where({ order_id: newOrderId, food_id })
      .first();

    if (existingItem) {
      await knex("orders_items")
        .where({ id: existingItem.id })
        .update({
          quantity: existingItem.quantity + quantity,
          item_total_price: existingItem.item_total_price + item_total_price
        });
    } else {
      await knex("orders_items").insert({
        user_id,
        order_id: newOrderId,
        food_id,
        quantity,
        item_total_price
      });
    }

    const ordersController = new OrdersController();
    await ordersController.update(newOrderId);
    
    await knex("orders")
      .update({
        total_items: knex.raw("(SELECT SUM(quantity) FROM orders_items WHERE order_id = ?)", [newOrderId]),
        total_price: knex.raw("(SELECT SUM(item_total_price) FROM orders_items WHERE order_id = ?)", [newOrderId])
      })
      .where({ id: newOrderId });

    return res.json();
  }

  async index (req, res) {
    const { user_id } = req.query;

    const [latestOrder] = await knex("orders")
      .select("id")
      .where({ user_id })
      .orderBy("id", "desc")
      .limit(1);
    
    const orderId = latestOrder && latestOrder.id;

    const orders_items = await knex("orders_items")
      .select([
        "orders_items.id",
        "quantity",
        "item_total_price",
        "food.title",
        "food.image"
      ])
      .join("food", "orders_items.food_id", "food.id")     
      .where({ user_id, order_id: orderId });

    return res.json(orders_items);
  }

  async delete (req, res) {
    const { user_id, id } = req.params;
    //const { id } = req.body;

    const [latestOrder] = await knex("orders")
    .select("id")
    .where({ user_id })
    .orderBy("id", "desc")
    .limit(1);

    const orderId = latestOrder.id;
    console.log("Order ID:", orderId);

    await knex("orders_items")
      .where({ user_id, order_id: orderId, id })
      .delete();

    await knex ("orders")
      .update({
        total_items: knex.raw("(SELECT SUM(quantity) FROM orders_items WHERE order_id = ?)", [orderId]),
        total_price: knex.raw("(SELECT SUM(item_total_price) FROM orders_items WHERE order_id = ?)", [orderId])
      })
      .where({ id: orderId });

    const ordersController = new OrdersController();
    await ordersController.update(orderId);

    return res.json();
  }
}

module.exports = OrdersItemsController;