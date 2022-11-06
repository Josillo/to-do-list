module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all User
    router.get("/", auth.isAuthenticated, users.findAll);
    
    // Retrieve a single User with id
    router.get("/:id", auth.isAuthenticated, users.findOne);
    
    // Retrieve whether usermane already exists
    router.get("/user/:username", users.findOneByUsername);
  
    // Update a User with id
    router.put("/:id", auth.isAuthenticated, users.update);

    // Sign in
    router.post("/signin", auth.signin);
  
    // // Delete a User with id
    // router.delete("/:id", users.delete);
  
    // // Create a new User
    // router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };