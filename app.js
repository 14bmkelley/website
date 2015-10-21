// app.js
// Copyright (c) 2015 Brandon M. Kelley

// Express variables
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var randomstring = require("random-string");
var sync = require("synchronize");

// App settings
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", process.argv[2] || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(cookieParser());
app.use(function(request, response, callback) {
  sync.fiber(callback);
});

// Route urls
var renderFile = __dirname + "/controllers/render";
var apiFile = __dirname + "/controllers/api";
var renderRoutes = require(renderFile)(express.Router());
var apiRoutes = require(apiFile)(express.Router());

app.use("/", express.static(__dirname + "/public"));
app.use("/", renderRoutes);
app.use("/", apiRoutes);

// Serve 404 Error
app.use(function(request, response) {
  response.render("error", {
    "title": "Page Not Found",
    "user": null
  });
});

// Create custom session support
var sessionManager = function() {
  
  var sessions = [];
  
  this.addSession = function(username) {
    var session = {
      "username": username,
      "sid": randomstring({ "length": 16 })
    }
    sessions.push(session);
    this.cleanSessions();
    return session.sid;
  }

  this.authenticateSession = function(sid) {
    for (session in sessions) {
      if (session.sid === sid) {
        return true;
      }
    }
    return false;
  }

  this.cleanSessions = function() {
    var temp = [];
    for (var i = 0; i < sessions.length; i++) {
      var found = false;
      for (var j = i + 1; j < sessions.length; j++) {
        if (sessions[i].username === sessions[j].username) {
          found = true;
        }
      }
      if (!found) {
        temp.push(sessions[i]);
      }
    }
    sessions = temp;
  }

};

var manager = new sessionManager();

// Export
module.exports = {
  "app": app,
  "sessionManager": manager
};
