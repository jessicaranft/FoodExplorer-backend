const { Router } = require('express');

const OrdersController = require('../controllers/OrdersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.put("/:user_id", ordersController.updatePayment);
ordersRoutes.patch("/:order_id", ordersController.updateStatus);
ordersRoutes.post("/:user_id/:order_id", ordersController.completeOrder);
ordersRoutes.get("/history", ordersController.index);
ordersRoutes.get("/", ordersController.show);

module.exports = ordersRoutes;