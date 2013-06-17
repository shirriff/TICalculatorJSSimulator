// Clickable image of the calculator
var CalcImage = function(elem, model) {
  // Initialize the positions of the keys in the image
  var xvals = [[45, 92], [108, 154], [171, 217], [233, 280]];
  var xbotvals = [[45, 125], [139, 187], [202, 280]];
  var yvals = [[254, 303], [316, 365], [379, 427], [441, 490], [503, 552]];
  this.keypos = {
    'CE': [xvals[0], yvals[0]],
    '/': [xvals[1], yvals[0]],
    '*': [xvals[2], yvals[0]],
    '7': [xvals[0], yvals[1]],
    '8': [xvals[1], yvals[1]],
    '9': [xvals[2], yvals[1]],
    'C': [xvals[3], yvals[1]],
    '4': [xvals[0], yvals[2]],
    '5': [xvals[1], yvals[2]],
    '6': [xvals[2], yvals[2]],
    '-': [xvals[3], yvals[2]],
    '1': [xvals[0], yvals[3]],
    '2': [xvals[1], yvals[3]],
    '3': [xvals[2], yvals[3]],
    '+': [xvals[3], yvals[3]],
    '0': [xbotvals[0], yvals[4]],
    '.': [xbotvals[1], yvals[4]],
    '=': [xbotvals[2], yvals[4]]};

  // Return the key value or null associated with a position
  this.findKey = function(x, y) {
    // Scale coordinates to original image dimensions
    x = x / this.width * 329;
    y = y / this.height * 600;
    for (var k in this.keypos) {
      if (this.keypos[k][0][0] <= x && this.keypos[k][0][1] >= x && this.keypos[k][1][0] <= y && this.keypos[k][1][1] >= y) {
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
    if (that.findKey(x, y) == null) {
      elem.css( 'cursor', 'default' );
    } else {
      elem.css( 'cursor', 'pointer' );
    }
  });

  this.width = elem[0].width;
  this.height = elem[0].height;
};
