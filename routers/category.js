const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;

const router = new Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).send({ message: "ok", categories });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
