const express = require('express');
const router = express.Router();
const controllerOrder = require('../controller/order')


router.get("/", controllerOrder.get);
router.get("/:id", controllerOrder.getById);
router.post("/", controllerOrder.post);
router.delete("/:id", controllerOrder.deleteById);
// router.delete("/:id", controllerOrder.deleteItemFromCartFuncyion);
// router.delete("/deleteItemFromCart/:id", controllerOrder.deleteItemFromCart);

module.exports = router;