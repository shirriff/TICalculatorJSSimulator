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
    keygrid.update();
    display.update();
    display2.update();
    registers.update();
    instruction.update();
    sourceWindow.update();
  }

  updateInt();

  this.update = function() {
    that.cpu.step();
    updateInt();
    that.keygrid.update();
    if (model.running) {
      setTimeout(that.update, 1);
    }
  };
};
