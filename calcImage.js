// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file implements the clickable image of the calculator.

var CalcImage = function(elem, model, keypos, origXSize, origYSize, offImage) {
  this.model = model;
  onImage = elem.attr('src');

  // Return the key value or null associated with a position
  this.findKey = function(x, y) {
    // Scale coordinates to original image dimensions
    x = x / this.width * origXSize;
    y = y / this.height * origYSize;
    for (var k in keypos) {
      if (keypos[k][0][0] <= x && keypos[k][0][1] >= x && keypos[k][1][0] <= y && keypos[k][1][1] >= y) {
	if (model.power == 1 || k == 'POWER') {
          return k;
	} else {
	  return '';
	}
      }
    }
    return '';
  }

  this.updatePower = function() {
    if (offImage) {
      elem.attr('src', this.model.power ? onImage : offImage);
    }
  }

  this.callback = null;

  // Initialize variables, handlers
  var that = this;
  elem.click(function(e) {
    var parentOffset = $(this).parent().offset(); 
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;
    var k = that.findKey(x, y);
    if (that.callback) {
      that.callback(k);
    }
  });

  elem.mousemove(function(e) {
    var parentOffset = $(this).parent().offset(); 
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;
    if (that.findKey(x, y) == '' || that.model.idle == 0) {
      elem.css( 'cursor', 'default' );
    } else {
      elem.css( 'cursor', 'pointer' );
    }
  });

  this.width = elem[0].width;
  this.height = elem[0].height;
};
