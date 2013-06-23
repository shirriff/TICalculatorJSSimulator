// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file implements the calculator 7-segment display.

var Display = function(elem, model) {
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
    '-': [3],
    ' ': [],
  }

  this.update = function(singleDigit) {
    var str = "";
    var dpt = -1;
    var zeroSuppress = 1;
    for (var i = 0; i < 9; i++) {
      if (i == 8 || model.a[i] != 0) {
	zeroSuppress = 0;
      }
      if (model.a[i] == 0 && zeroSuppress) {
	str += ' ';
      } else if (model.a[i] == 14) {
        str += '-';
      } else {
        str += model.a[i];
      }
      if (model.b[i] == 2) {
	dpt = i;
      }
      if (model.b[i+1] == 2) {
	zeroSuppress = 0;
      }
    }
    this.write(str, dpt);
  };

  this.write = function(str, dpt) {
    this.context.save();
    this.context.transform(this.width / 9, 0, 0, this.height / 2, 0, 0);
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, 9, 2);
    if (!model.display) {
      return;
    }
    this.context.beginPath();
    for (var i = 0; i < str.length; i++) {
      this.writeSymbol(str[i], i);
    }
    if (dpt >= 0) {
      this.writeDecimal(dpt);
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
    [XL + XOFF, YT, XR - XOFF, YT],
    [XL, YT + YOFF, XL, YM - YOFF],
    [XR, YT + YOFF, XR, YM - YOFF],
    [XL + XOFF, YM, XR - XOFF, YM],
    [XL, YM + YOFF, XL, YB - YOFF],
    [XR, YM + YOFF, XR, YB - YOFF],
    [XL + XOFF, YB, XR - XOFF, YB],
    [XR + 2 * XOFF, YB, XR + 2 * XOFF + 0.01, YB] // decimal point
      ];

  this.writeOneSegment = function(seg, pos) {
    if (model.showDisplayScan) {
      this.context.strokeStyle = (model.dActive - 1) == pos ? 'red' : '#800';
    } else {
      this.context.strokeStyle = 'red';
    }
    this.context.lineCap = 'round';
    this.context.lineWidth = seg < 7 ? LINEWIDTH : LINEWIDTH * 1.5;
    this.context.beginPath();
    this.context.moveTo(segments[seg][0] + pos, segments[seg][1]);
    this.context.lineTo(segments[seg][2] + pos, segments[seg][3]);
    this.context.stroke();
  };

  this.writeDecimal = function(pos) {
    this.writeOneSegment(7, pos);
  }

  this.context = elem[0].getContext('2d');
  this.width = elem[0].width;
  this.height = elem[0].height;
};
