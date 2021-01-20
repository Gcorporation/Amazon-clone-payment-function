const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
const stripe = require("stripe")('sk_test_51I9x4hESASsBEPd9daMIwuWg3dT7FseCud7X7k0bs1BqiNQoUADyf6kRcqHxljKqGWrXhB0THVApOwpZ98D0ND8U00BgwvSC5B');
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get('/', (request, response) => response.status(200).send('hello world'));
app.post('/payments/create', async (request,response) =>  {
    const total = request.query.total;
    console.log('Payment Request received --->', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});
exports.api = functions.https.onRequest(app)