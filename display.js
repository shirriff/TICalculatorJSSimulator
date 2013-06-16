var Display = function(elem) {
  // 000
  // 1 2
  // 333
  // 4 5
  // 666
  var symbols = {
    '0': [0, 1, 2, 4, 5, 6],
    '1': [2, 5],
    '2': [0, 2, 3, 4, 6],
    '3': [0, 2, 3, 5, 6],
    '4': [1, 2, 3, 5],
    '5': [0, 1, 3, 5, 6],
    '6': [0, 1, 3, 4, 5, 6],
    '7': [0, 2, 5],
    '8': [0, 1, 2, 3, 4, 5, 6],
    '9': [0, 1, 2, 3, 5, 6],
    '-': [3]
  }

  this.update = function(model) {
  };

  this.write = function(str) {
    this.context.save();
    this.context.transform(this.width / 9, 0, 0, this.height / 2, 0, 0);
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, 9, 2);
    this.context.beginPath();
    for (var i = 0; i < str.length; i++) {
      this.writeSymbol(str[i], i);
    }
    this.context.restore();
  };
     
  this.writeSymbol = function(symbol, pos) {
    for (var i = 0; i < symbols[symbol].length; i++) {
      this.writeOneSegment(symbols[symbol][i], pos);
    }
  };

  var XL = .2; // X coordinate of left segments
  var XR = .8; // X coordinate of right segments
  var XOFF = .1; // Offset of horizontal ends from vertical position
  var YT = .2; // Y coordinate of top segments
  var YM = 1; // Y coordinate of middle segments
  var YB = 1.8; // Y coordinate of bottom segments
  var YOFF = .1; // Offset of vertical ends from horizontal position
  var LINEWIDTH = .1;
  var segments = [
    [XL + XOFF, YT, XR - YOFF, YT],
    [XL, YT + YOFF, XL, YM - YOFF],
    [XR, YT + YOFF, XR, YM - YOFF],
    [XL + XOFF, YM, XR - YOFF, YM],
    [XL, YM + YOFF, XL, YB - YOFF],
    [XR, YM + YOFF, XR, YB - YOFF],
    [XL + XOFF, YB, XR - YOFF, YB]];

  this.writeOneSegment = function(seg, pos) {
    this.context.strokeStyle = 'red';
    this.context.lineCap = 'round';
    this.context.lineWidth = LINEWIDTH;
    this.context.beginPath();
    this.context.moveTo(segments[seg][0] + pos, segments[seg][1]);
    this.context.lineTo(segments[seg][2] + pos, segments[seg][3]);
    this.context.stroke();
  };

  this.context = elem.getContext('2d');
  this.width = elem.width;
  this.height = elem.height;
};
