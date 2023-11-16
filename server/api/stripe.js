const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

STRIPE_KEY =
  "sk_test_51O6xXwA70cTu8rF3nhAA0jw3cTMF3W0WYqsTI8opBsj8RkzrDbP70u62zICpCSWDjpBfb4DKaCKOmrYmxfAUXAwN00Tm3f84wN";
const stripe = Stripe(STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const currentTask = req.body.currentTask;
  const filteredSkill = req.body.filteredSkill;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: currentTask.subcategory.subName,
            description: `${currentTask.estTimeCommitment} hours at $${(
              filteredSkill[0].price / 100
            ).toFixed(2)} per hour`,
          },
          unit_amount: filteredSkill[0].price * currentTask.estTimeCommitment,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/tasker/${currentTask.taskerId}`,
    cancel_url: "http://localhost:5173/booking",
  });

  res.send({ url: session.url });
});

module.exports = router;
