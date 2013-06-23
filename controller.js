// Controller
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
        that.update();
      }
      });
  stopButton.hide();

  var updateInt = function() {
    if (model.fast ==0 || model.idle == 1) {
      keygrid.update();
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
    // Hack to detect idle loop. Release any pressed key.
    if (model.address == 0x22) {
      model.keyPressed = '';
    }
    if (model.rom[model.address] >> 4 == 0x52 && model.keyPressed == '') { // WAITNO
      model.idle = 1;
    } else {
      model.idle = 0;
    }

    cpu.step();
    updateInt();
    keygrid.update();
    if (model.running) {
      // Slow down the loop if we're in the idle loop to save CPU
      setTimeout(that.update, model.idle ? 250 : 1);
    }
  };
  playButton.click(); // Start it running
};
