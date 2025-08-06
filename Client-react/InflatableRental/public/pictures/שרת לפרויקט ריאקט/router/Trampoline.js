const express = require('express');
const router = express.Router();
const controllerTrampoline = require('../controller/trampoline')


router.get("/", controllerTrampoline.getTrampoline);
router.delete("/:id", controllerTrampoline.deleteTrampoline)
router.post("/",controllerTrampoline.post)
// router.get("/:id", controllerProduct.getById);
// router.post("/", controllerProduct.post);

module.exports = router;