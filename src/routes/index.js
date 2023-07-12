const { Router } = require('express');

const usersRouter = require('./users.routes');
const foodRouter = require('./food.routes');
const ingredientsRouter = require('./ingredients.routes');
const sessionsRouter = require('./sessions.routes');
const favoritesRouter = require('./favorites.routes');
const ordersRouter = require('./orders.routes');
const ordersItemsRouter = require('./orders-items.routes');

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/food", foodRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/orders", ordersRouter);
routes.use("/orders-items", ordersItemsRouter);

module.exports = routes;