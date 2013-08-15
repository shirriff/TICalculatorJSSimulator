// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file is the controller, which connects together all the pieces.

var Controller = function(calcImage, model, keygrid, display, display2, sourceWindow, cpu,
    registers, instruction, playButton, stopButton, stepButton) {
  this.calcImage = calcImage;
  this.model = model;
  this.keygrid = keygrid;
  this.display = display;
  this.display2 = display2;
  this.sourceWindow = sourceWindow;
  this.cpu = cpu;
  this.registers = registers;
  this.autospeed = 1;
  this.calcImage.callback = function(key) {
    if (model.keyPressed == key) {
      // toggle off
      model.keyPressed = null;
    } else {
      model.keyPressed = key;
    }
    keygrid.update();
  };

  model.running = 0;
  var that = this;
  playButton.click(function() {
      playButton.hide();
      stopButton.show();
      model.running = 1;
      that.update();
      });
  stopButton.click(function() {
      stopButton.hide();
      playButton.show();
      model.running = 0;
      });
  stepButton.click(function() {
      if (model.running) {
	stopButton.hide();
	playButton.show();
	model.running = 0;
      } else {
	if (model.fastStep == 0) {
	  that.update();
	} else {
	  // Don't make user manually step 10 times through one instruction
	  var address = model.address;
	  while (model.address == address) {
	    that.update();
	    if (model.dActive == 1) {
	      break;
	    }
	  }
	}
      }
    }
    );
  stopButton.hide();

  // Post-cpu updates
  var updateInt = function(skipUpdate) {
    if (!skipUpdate) {
      keygrid.update(model.idle ? 0 : 1 /* fast */);
      display.update();
      display2.update();
      registers.update();
      instruction.update();
      sourceWindow.update();
    } else {
      keygrid.update(1 /* fast */);
    }
  }

  updateInt();

  this.update = function() {
    var iterations = 1;
    if (model.speed == 'fast') {
      iterations = 100;
    } else if (model.speed == 'auto') {
      // The idea of autospeed is to do the first 200 ops at a moderate pace
      // and then accelerate so long trig operations will finish in a reasonable time
      if (that.autospeed < 200) {
        iterations = 1;
      } else {
	iterations = that.autospeed / 10 - 18;
      }
      that.autospeed++;
    } else if (model.speed == 'slow') {
      iterations = 1;
    }

    for (var i = 0; i < iterations; i++) {
      // Hack to detect idle loop. Release any pressed key.
      if (model.sinclair) {
	if (model.address == 0x6) {
	  model.keyPressed = '';
	}
      } else {
	if (model.address == 0x22) {
	  model.keyPressed = '';
	}
      }
      if (model.rom[model.address] >> 4 == 0x52 && model.keyPressed == '') { // WAITNO
	model.idle = 1;
	that.autospeed = 1; /* reset autospeed */
      } else {
	model.idle = 0;
      }

      cpu.step();
      updateInt(1 /* skip */);

      // Get breakpoint query parameter
      var breakpoint = (RegExp('breakpoint=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
      // Stop if address hits breakpoint
      if (breakpoint && parseInt(breakpoint, 16) == model.address) {
	stopButton.click();
      }
    }
    updateInt();

    if (model.running) {
      // Slow down the loop if we're in the idle loop to save CPU
      var timeout = model.idle ? 250 : (model.speed == 'slow' ? 50 : 1);
      setTimeout(that.update, timeout);
    }
  };
  playButton.click(); // Start it running
};
