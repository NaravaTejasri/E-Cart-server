const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;
const Order = require("../models").order;
const OrderProducts = require("../models").orderProduct;
const User = require("../models").user;

const router = new Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({ include: User });
    //console.log(categories);
    res.status(200).send({ message: "ok", orders });
  } catch (e) {
    console.log(e.message);
  }
});

// GET Categories by id - see all the products of category(id).
router.post("/", auth, async (req, res) => {
  try {
    // const userId = req.body.userId;
    const userId = req.user.id;
    console.log("inside the endpoint", req.body);

    const {
      total,
      shippingAddress: shippingDetails,
      paymentMethod,
      items,
    } = req.body;
    if (!total || !shippingDetails || !paymentMethod) {
      return res.status(400).send("Please provide the details");
    }
    const { fullName, address, city, postalCode, country } = shippingDetails;
    const shippingAddress = `${fullName} - ${address}, ${city}, ${postalCode}, ${country}`;

    console.log("The shipping address", shippingAddress);
    const createdOrder = await Order.create({
      total,
      shippingAddress,
      paymentMethod,
      userId,
    });

    const orderId = createdOrder.id;
    console.log("orderId", orderId);

    const createOrderProductsPromises = items.map(async (item) => {
      const orderProductPromise = await OrderProducts.create({
        orderId,
        productId: item.id,
        quantity: item.quantity,
      });
      return orderProductPromise;
    });

    const resolvedPromises = await Promise.all(createOrderProductsPromises);
    console.log("resolved", resolvedPromises);

    res.status(201).send({ message: "New Order Created", order: createdOrder });
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = router;
