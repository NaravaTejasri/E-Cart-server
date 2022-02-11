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
    res.status(200).send({
      message: "ok",
      categories: categories.sort((fst, snd) => fst.id - snd.id),
    });
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
  // console.log("category", categories);

  if (categories === null) {
    return res.status(404).send({ message: "Category not found" });
  }

  res.status(200).send({ message: "ok", categories });
});

//detail page of product in category
router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  //console.log(id);

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

//Admin

//post request to create the category
router.post("/", auth, async (req, res) => {
  try {
    const { title, subtitle, imageUrl } = req.body;
    if (!title || !subtitle || !imageUrl) {
      return res.status(400).send("Please provide the details");
    }
    const category = await Category.create({
      title,
      subtitle,
      imageUrl,
    });
    res.status(201).send({ message: "New Category Created", category });
  } catch (e) {
    console.log("Error", e);
  }
});

//post request to create the product in the category
router.post("/product/:id", auth, async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log("categoryId", categoryId);
    const { name, imageUrl, price } = req.body;
    console.log("hello", name, imageUrl, price);
    if (!name || !imageUrl || !price) {
      return res.status(400).send("Please provide the details");
    }
    const product = await Product.create({
      name,
      imageUrl,
      price,
      categoryId,
    });
    console.log(product);
    res.status(201).send({ message: "New Product Created", product });
  } catch (e) {
    console.log("Error", e);
  }
});

//Admin can edit the category
router.patch("/:id", auth, async (req, res) => {
  const categoryId = req.params.id;
  //console.log(categoryId);
  const category = await Category.findByPk(categoryId);
  if (!category.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this category" });
  }
  if (!category) {
    return res.status(404).send("Category not found");
  }
  const { title, subtitle, imageUrl } = req.body;

  await category.update({ title, subtitle, imageUrl });

  return res.status(200).send({ message: "Yes! Updated", category });
});

//delete the category
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    // console.log("id", categoryId);
    const category = await Category.findByPk(categoryId, {
      include: [Product],
    });
    if (!category) {
      return res.status(404).send("Category not found");
    }

    // Check if this user is the owner of the space

    await category.destroy();

    res.send({ message: "ok", categoryId });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
