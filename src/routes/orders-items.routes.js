const { Router } = require('express');

const OrdersItemsController = require('../controllers/OrdersItemsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ordersItemsRoutes = Router();

const ordersItemsController = new OrdersItemsController();

ordersItemsRoutes.use(ensureAuthenticated);

ordersItemsRoutes.post("/:user_id", ordersItemsController.create);
ordersItemsRoutes.get("/", ordersItemsController.index);
ordersItemsRoutes.delete("/:user_id/:id", ordersItemsController.delete);

module.exports = ordersItemsRoutes;