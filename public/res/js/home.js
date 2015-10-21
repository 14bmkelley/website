// public/res/js/home.js
// Copyright (c) 2015 Brandon M. Kelley

$(document).ready(function() {
  
  var centerLanding = function() {
    var canvas = $("body").outerHeight() - $(".navbar").outerHeight();
    var landingSize;
    if ($("#super-center div").outerHeight() > 0) {
      landingSize = $("#super-center div").outerHeight();
    } else {
      landingSize = $("#super-center div").next().outerHeight();
    }
    var topOffset;
    if (canvas > landingSize + 10) {
      topOffset = (canvas - landingSize) / 2;
    } else {
      topOffset = 10;
    }
    $("#super-center").css("margin-top", topOffset + "px");
  };
  
  var login = function() {

    var username = $("input[type='text']").val();
    var password = $("input[type='password']").val();
    var data = {
      "username": username,
      "password": password
    };
    
    $.ajax("/", {
      "method": "POST",
      "contentType": "application/json",
      "data": JSON.stringify(data),
      "success": function(data, state, jqxhr) {
        window.location.reload();
      },
      "error": function(jqxhr, state, error) {
        console.log(error);
      }
    });

  };

  var setIconRow = function() {
    var $icons = $(".icon-row li");
    var iconRowWidth = $(".icon-row").width();
    var iconSpacing = 10;
    var iconRowUsable = iconRowWidth - iconSpacing * ($icons.length - 1);
    var iconWidth = iconRowUsable / $icons.length;
    for (var i = 0; i < $icons.length; i++) {
      if (i = $icons.length - 1) {
        $icons.eq(i).find("img").css("width", function() {
          return iconWidth + "px";
        });
      } else {
        $icons.eq(i).find("img").css({
          "width": function() {
            return iconWidth + "px";
          },
          "margin-right": function() {
            return iconSpacing + "px";
          }
        });
      }
    }
  }

  centerLanding();
  setIconRow();
  $(window).resize(centerLanding);
  
  $("input[type='text']").focus();
  
  $("#login").click(function(event) {
    login();
  });

  $("input[type='password']").keypress(function(keyEvent) {
    if (keyEvent.keyCode === 13) {
      login();
    }
  });

});
