// Controller
var Controller = function(calcImage, model, keygrid, display, display2, sourceWindow, cpu,
    registers, playButton, stopButton, stepButton) {
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

  var running = 0;
  var that = this;
  playButton.click(function() {
      playButton.hide();
      stopButton.show();
      running = 1;
      that.update();
      });
  stopButton.click(function() {
      stopButton.hide();
      playButton.show();
      running = 0;
      });
  stepButton.click(function() {
      if (running) {
	stopButton.hide();
	playButton.show();
	running = 0;
      } else {
        that.update();
      }
      });
  stopButton.hide();

  this.keygrid.update();
  this.display.update();
  this.display2.update(1 /* single */);
  this.registers.update();
  this.sourceWindow.update();

  this.update = function() {
    that.keygrid.update();
    that.cpu.step();
    that.display.update();
    that.display2.update(1 /* single */);
    that.registers.update();
    that.sourceWindow.update();
    if (running) {
      setTimeout(that.update, 100);
    }
  };
};
