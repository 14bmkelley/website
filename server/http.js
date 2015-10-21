// server/http.js
// Copyright (c) 2015 Brandon M. Kelley

var http = require("http");
var app = require("../app").app;

http.createServer(app).listen(app.get("port"), function() {
  console.log("Server listening on port " + app.get("port"));
});
