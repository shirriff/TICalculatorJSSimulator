// Clickable image of the calculator
var CalcImage = function(elem) {
  // Initialize the positions of the keys in the image
  this.initPositions = function() {
    var xvals = [[45, 92], [108, 154], [171, 217], [233, 280]];
    var xbotvals = [[45, 125], [139, 187], [202, 280]];
    var yvals = [[254, 303], [316, 365], [379, 427], [441, 490], [503, 552]];
    this.keypos = {
      'CE': [xvals[0], yvals[0]],
      'DIV': [xvals[1], yvals[0]],
      'MULT': [xvals[2], yvals[0]],
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
  }

  // Return the key value or null associated with a position
  this.findKey = function(x, y) {
    for (var k in this.keypos) {
      if (this.keypos[k][0][0] <= x && this.keypos[k][0][1] >= x && this.keypos[k][1][0] <= y && this.keypos[k][1][1] >= y) {
      return k;
      }
    }
    return null;
  }

  // Mark the selected key as pressed
  this.markKey = function(k) {
    var xmid = (this.keypos[k][0][0] + this.keypos[k][0][1]) / 2;
    var ymid = (this.keypos[k][1][0] + this.keypos[k][1][1]) / 2;
    this.context.beginPath();
    this.context.arc(xmid, ymid, 15 /* radius */ , 0, 2 * Math.PI, false);
    this.context.fillStyle = 'red';
    this.context.globalAlpha = 0.2;
    this.context.fill();
    this.context.globalAlpha = 1;
  }

  // Clear any markings from the canvas
  this.clearCanvas = function() {
    this.context.clearRect(0, 0, 600, 600);
  }

  // Initialize variables, handlers
  var that = this;
  this.context = elem[0].getContext('2d');
  elem.click(function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var k = that.findKey(x, y);
    console.log(k);
    that.clearCanvas();
    if (k) {
      that.markKey(k, 1);
    }
  });

  elem.mousemove(function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    if (that.findKey(x, y) == null) {
      elem.css( 'cursor', 'default' );
    } else {
      elem.css( 'cursor', 'pointer' );
    }
  });

  this.initPositions();
};
