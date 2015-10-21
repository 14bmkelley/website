// controllers/api.js
// Copyright (c) 2015 Brandon M. Kelley

module.exports = function(router) {
  
  router.post("/", function(request, response) {
    var sessionManager = require("../app").sessionManager;
    var username = request.body.username;
    var password = request.body.password;
    if (username == "test" && password === "test") {
      var session = sessionManager.addSession(username);
      response.cookie("sid", session);
      response.send(true);
    } else {
      response.send(false);
    }
    response.end();
  });
  
  return router;
  
};
