const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../configs/upload');
const FoodController = require('../controllers/FoodController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const foodRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodController = new FoodController();

foodRoutes.use(ensureAuthenticated);

foodRoutes.post("/", upload.single("image"), foodController.create);
foodRoutes.get("/:id", foodController.show);
foodRoutes.delete("/:id", foodController.delete);
foodRoutes.get("/", foodController.index);
foodRoutes.put("/:id", upload.single("image"), foodController.update);

module.exports = foodRoutes;