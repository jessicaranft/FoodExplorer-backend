const { Router } = require('express');

const FavoritesController = require('../controllers/FavoritesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.delete("/:user_id/:id", favoritesController.delete);
favoritesRoutes.get("/check", favoritesController.show);

module.exports = favoritesRoutes;