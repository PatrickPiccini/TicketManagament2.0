const express = require("express");
const routes = express();
routes.use(express.json());

const LoginController = require("../Controller/LoginController");



routes.all("*", (req, res, next) => {
    console.log(
      `Headers: ${JSON.stringify(req.headers)}\n Body: ${JSON.stringify(
        req.body
      )}\n`
    );
    next();
  });


routes.get("/Login", LoginController.sendToLogin())

module.exports = routes;
