const express = require("express");
const routes = express();
routes.use(express.json());

routes.all("*", (req, res, next) => {
    console.log(
      // `Headers: ${JSON.stringify(req.headers)}\n 
      `Body: ${JSON.stringify(req.body)
      }\n`
    );
    next();
  });


module.exports = routes;
