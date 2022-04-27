module.exports = function(app, userModel) {
  "use strict";
  
  app.post('/api/assignment/user', createUser);
  app.get('/api/assignment/user', findUsers);
  app.get('/api/assignment/user/:id', findUserById);
  app.put("/api/assignment/user/:userId", updateUserById);
  app.delete("/api/assignment/user/:userId", deleteUserById);
  
  function createUser(req, res) {
      var newUser = userModel.createUser(req.body);
      res.json(newUser);
  }
  
  function findUsers(req, res) {
      if (req.query.username) {
          if (req.query.password) {
              findUserByCredentials(req, res);
          } else {
              findUserByUsername(req, res);
          }
      } else {
          var users = userModel.findAllUsers();
          res.json(users);
      }
  }
  
  function findUserById(req, res) {
      var userId = parseInt(req.params.id);
      var user = userModel.findUserById(userId);
      res.json(user);
  }
  
  function findUserByUsername(req, res) {
      var username = req.query.username;
      var user = userModel.findUserByUsername(username);
      res.json(user);
  }
  
  function findUserByCredentials(req, res) {
      var credentials = {
          username: req.query.username,
          password: req.query.password
      };
      var user = userModel.findUserByCredentials(credentials);
      res.json(user);
  }
  
  function updateUserById(req, res) {
      var userId = parseInt(req.params.id);
      var newUser = userModel.updateUser(userId, req.body);
      res.json(newUser);
  }
  
  function deleteUserById(req, res) {
      var userId = parseInt(req.params.id);
      userModel.deleteUser(userId);
      res.send(200);
  }
}();  
module.exports = function (app) {
  "use strict";

  var userModel = require("./models/user.model.js")();
  var formModel = require("./models/form.model.js")();

  require("./services/user.service.server.js")(app, userModel);
  require("./services/form.service.server.js")(app, formModel);
  require("./services/field.service.server.js")(app, formModel);
};