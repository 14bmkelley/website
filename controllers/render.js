// controllers/render.js
// Copyright (c) 2015 Brandon M. Kelley

var sync = require("synchronize");

module.exports = function(router) {
  
  var authenticate = function(sid) {
    if (sid) {
      return true;
    }
    return false;
  };
  
  router.get("/", function(request, response) {
    var user = authenticate(request.cookies["sid"]);
    response.render("home", {
      "title": "Home",
      "user": user
    });
  });
  
  router.get("/about_us", function(request, response) {
    response.render("about_us", {
      "title": "About Us",
      "user": null
    });
  });
  
  router.get("/recruitment", function(request, response) {
    response.render("recruitment", {
      "title": "Recruitment",
      "user": null
    });
  });

  router.get("/events", function(request, response) {
    response.render("events", {
      "title": "Events",
      "user": null
    });
  });

  router.get("/gallery", function(request, response) {
    response.render("gallery", {
      "title": "Gallery",
      "user": "null"
    });
  });

  router.get("/contact_us", function(request, response) {
    response.render("contact_us", {
      "title": "Contact Us",
      "user": null
    });
  });
  
  return router;
  
};
