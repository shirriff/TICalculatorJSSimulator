// Keyboard grid
var Keygrid = function(elem, model) {
  this.keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', ''],
    ['C', '=', '+', '-', '*', '/', 'CE', '.', '0', 'D'],
    ['', '', '', '', '', '', '', '', '', '']];

  var context = elem.getContext('2d');

  var BOXSIZE = 30;
  var XMARGIN = 10;
  var YMARGIN = 20;
  var XSPACING = 50;
  var YSPACING = 45;

  this.update = function(fast) {
    model.keyStrobe = 0;
    if (fast) {
      // Skip the graphics and just check the keyStrobe
      for (var row = 0; row < 3; row++) {
	if (model.keyPressed && this.keys[row][model.dActive - 1] == model.keyPressed) {
	  model.keyStrobe = ['KN', 'KO', 'KP'][row]; // Cleared at beginning of method
	}
      }
      return;
    }
    context.save();
    context.transform(1, 0, 0, 1, .5, .5);
    for (var col = 0; col < 9; col++) {
      context.strokeStyle = model.d[col] ? '#ccc' : '#f77';
      context.beginPath();
      context.moveTo(XMARGIN + BOXSIZE / 2 + XSPACING * col, 0);
      context.lineTo(XMARGIN + BOXSIZE / 2 + XSPACING * col, elem.height);
      context.stroke();
    }
    context.font = '14px verdana';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.strokeStyle = 'black';
    for (var row = 0; row < 3; row++) {
      if (model.keyPressed && this.keys[row][model.dActive - 1] == model.keyPressed) {
	// Key pressed in current row, so highlight row and activate strobe
	model.keyStrobe = ['KN', 'KO', 'KP'][row]; // Cleared at beginning of method
        context.strokeStyle = '#f77';
      } else {
        context.strokeStyle = '#ccc';
      }
      context.beginPath();
      context.moveTo(0, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      context.lineTo(elem.width, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      context.stroke();

      context.strokeStyle = '#888';
      for (var col = 0; col < 9; col++) {
	context.beginPath();
	context.rect(XMARGIN + XSPACING * col, YMARGIN + YSPACING * row, BOXSIZE, BOXSIZE);
	// Highlight pressed key.
	context.fillStyle = (model.keyPressed && this.keys[row][col] == model.keyPressed) ? '#aaf' : 'white';
	context.fill();
	context.stroke();
	context.fillStyle = 'black';
	context.fillText(this.keys[row][col], XMARGIN + BOXSIZE / 2 + XSPACING * col, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      }
    }
    context.restore();
  };
};
