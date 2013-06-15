// Keyboard grid
var Keygrid = function(elem, model) {
  this.keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', ''],
    ['C', '=', '+', '-', '*', '/', 'CE', '.', '0', 'D'],
    ['', '', '', '', '', '', '', '', '', '']];

  this.context = elem[0].getContext('2d');
  this.width = elem[0].width;
  this.height = elem[0].height;

  var BOXSIZE = 30;
  var XMARGIN = 10;
  var YMARGIN = 20;
  var XSPACING = 50;
  var YSPACING = 45;

  this.update = function() {
    this.context.save();
    this.context.transform(1, 0, 0, 1, .5, .5);
    for (var col = 0; col < 9; col++) {
      this.context.strokeStyle = model.d[11 - col] ? '#f77' : '#ccc';
      this.context.beginPath();
      this.context.moveTo(XMARGIN + BOXSIZE / 2 + XSPACING * col, 0);
      this.context.lineTo(XMARGIN + BOXSIZE / 2 + XSPACING * col, this.height);
      this.context.stroke();
    }
    this.context.font = '14px verdana';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.strokeStyle = 'black';
    for (var row = 0; row < 3; row++) {
      this.context.strokeStyle = (this.keys[row][model.dActive] == model.keyPressed) ? '#f77' : '#ccc';
      this.context.beginPath();
      this.context.moveTo(0, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      this.context.lineTo(this.width, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      this.context.stroke();

      this.context.strokeStyle = '#888';
      for (var col = 0; col < 9; col++) {
	this.context.beginPath();
	this.context.rect(XMARGIN + XSPACING * col, YMARGIN + YSPACING * row, BOXSIZE, BOXSIZE);
        this.context.fillStyle = this.keys[row][col] == model.keyPressed ? '#aaf' : 'white';
	this.context.fill();
	this.context.stroke();
	this.context.fillStyle = 'black';
	this.context.fillText(this.keys[row][col], XMARGIN + BOXSIZE / 2 + XSPACING * col, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      }
    }
    this.context.restore();
  };
};
