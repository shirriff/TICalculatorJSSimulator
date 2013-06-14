var Display = function(elem, xformFunc) {
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
    '9': [0, 1, 2, 3, 5],
    '-': [3]
  }

  this.write = function(str) {
    this.context.save();
    if (xformFunc) {
      xformFunc(this.context);
    }
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, WIDTH * 9 + XMARG, YSIZE * 2 + OFFSET * 4 + YMARG * 2);
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

  var XSIZE = 20;
  var YSIZE = 20;
  var WIDTH = 45;
  var XMARG = 10;
  var YMARG = 10;
  var OFFSET = 4;
  var segments = [
    [OFFSET, 0, OFFSET + XSIZE, 0],
    [0, OFFSET, 0, OFFSET + YSIZE],
    [XSIZE + 2 * OFFSET, OFFSET, XSIZE + 2 * OFFSET, YSIZE + OFFSET],
    [OFFSET, YSIZE + 2 * OFFSET, XSIZE + OFFSET, YSIZE + 2 * OFFSET],
    [0, YSIZE + 3 * OFFSET, 0, 2 * YSIZE + 3 * OFFSET],
    [XSIZE + 2 * OFFSET, YSIZE + 3 * OFFSET, XSIZE + 2 * OFFSET, 2 * YSIZE + 3 * OFFSET],
    [OFFSET, 2 * YSIZE + 4 * OFFSET, XSIZE + OFFSET, 2 * YSIZE + 4 * OFFSET]];


  this.writeOneSegment = function(seg, pos) {
    this.context.strokeStyle = 'red';
    this.context.lineCap = 'round';
    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.moveTo(segments[seg][0] + pos * WIDTH + XMARG, segments[seg][1] + YMARG);
    this.context.lineTo(segments[seg][2] + pos * WIDTH + XMARG, segments[seg][3] + YMARG);
    this.context.stroke();
  };

  this.context = elem[0].getContext('2d');
};
