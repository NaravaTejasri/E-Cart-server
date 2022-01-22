const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;

const router = new Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    //console.log(categories);
    res.status(200).send({ message: "ok", categories });
  } catch (e) {
    console.log(e.message);
  }
});

// GET Categories by id - see all the products of category(id).
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //console.log(id);

  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Category id is not a number" });
  }

  const categories = await Category.findByPk(id, {
    include: [Product],
  });
  //console.log("category", categories);

  if (categories === null) {
    return res.status(404).send({ message: "Category not found" });
  }

  res.status(200).send({ message: "ok", categories });
});

//detail page of product in category
router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "product id is not a number" });
  }

  const product = await Product.findByPk(id);
  //console.log("product", product);

  if (product === null) {
    return res.status(404).send({ message: "product not found" });
  }

  res.status(200).send({ message: "ok", product });
});

module.exports = router;
