const express = require('express');
const router = express.Router();
const controllerBag = require('../controller/bag')


router.get("/", controllerBag.get);
router.delete("/:id", controllerBag.deleteBag)
// router.get("/:id", controllerProduct.getById);
// router.post("/", controllerProduct.post);

module.exports = router;