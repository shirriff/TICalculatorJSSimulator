// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file implements the keyboard grid, showing the currently-pressed key, the live grid wires,
// and updates the strobe value in the model.

var Keygrid = function(elem, model, keys) {
  var context = elem.getContext('2d');

  var BOXSIZE = 26; // Keep this even
  var XMARGIN = 11;
  var YMARGIN = 16;
  var XSPACING = 45;
  var YSPACING = 40;

  this.update = function(fast) {
    model.keyStrobe = 0;
    if (model.keyPressed == 'C') {
      // Clear button does a hardware reset. Button at KO-D1
      model.address = 0;
      model.keyPressed = '';
      return;
    }
    if (fast) {
      // Skip the graphics and just check the keyStrobe
      for (var row = 0; row < 3; row++) {
	if (model.keyPressed && keys[row][model.dActive - 1] == model.keyPressed) {
	  model.keyStrobe = ['KN', 'KO', 'KP'][row]; // Cleared at beginning of method
	}
      }
      return;
    }
    context.save();
    context.transform(1, 0, 0, 1, .5, .5);
    // Verticals
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
      if (model.keyPressed && keys[row][model.dActive - 1] == model.keyPressed) {
	// Key pressed in current row, so highlight row and activate strobe
	model.keyStrobe = ['KN', 'KO', 'KP'][row]; // Cleared at beginning of method
        context.strokeStyle = '#f77';
      } else {
        context.strokeStyle = '#ccc';
      }
      // Horizontals
      context.beginPath();
      context.moveTo(0, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      context.lineTo(elem.width, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      context.stroke();

      context.strokeStyle = '#888';
      for (var col = 0; col < 9; col++) {
	context.beginPath();
	context.rect(XMARGIN + XSPACING * col, YMARGIN + YSPACING * row, BOXSIZE, BOXSIZE);
	// Highlight pressed key.
	context.fillStyle = (model.keyPressed && keys[row][col] == model.keyPressed) ? '#50c6f2' : 'white';
	context.fill();
	context.stroke();
	context.fillStyle = 'black';
	context.fillText(keys[row][col], XMARGIN + BOXSIZE / 2 + XSPACING * col, YMARGIN + BOXSIZE / 2 + YSPACING * row);
      }
    }
    context.restore();
  };
};
