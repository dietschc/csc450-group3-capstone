module.exports = app => {
    const address = require("../controllers/address.controller.js");
    var router = require("express").Router();

    // Create a new address
    router.post("/", address.create);

    // Retrieve all addresss
    router.get("/", address.findAll);

    // Retrieve a single address with id
    router.get("/:id", address.findOne);

    // Update a address with id
    router.put("/:id", address.update);

    // Delete a address with id
    router.delete("/:id", address.delete);

    // URL to address for route
    app.use('/address', router);
  };