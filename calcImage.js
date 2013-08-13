// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file implements the clickable image of the calculator.

var CalcImage = function(elem, model, keypos) {
  this.model = model;

  // Return the key value or null associated with a position
  this.findKey = function(x, y) {
    // Scale coordinates to original image dimensions
    x = x / this.width * 329;
    y = y / this.height * 600;
    for (var k in keypos) {
      if (keypos[k][0][0] <= x && keypos[k][0][1] >= x && keypos[k][1][0] <= y && keypos[k][1][1] >= y) {
      return k;
      }
    }
    return null;
  }

  this.callback = null;

  // Initialize variables, handlers
  var that = this;
  elem.click(function(e) {
    var parentOffset = $(this).parent().offset(); 
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;
    var k = that.findKey(x, y);
    console.log(k);
    if (that.callback) {
      that.callback(k);
    }
  });

  elem.mousemove(function(e) {
    var parentOffset = $(this).parent().offset(); 
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;
    if (that.findKey(x, y) == null || that.model.idle == 0) {
      elem.css( 'cursor', 'default' );
    } else {
      elem.css( 'cursor', 'pointer' );
    }
  });

  this.width = elem[0].width;
  this.height = elem[0].height;
};
