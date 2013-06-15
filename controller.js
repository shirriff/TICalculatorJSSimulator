// Controller
var Controller = function(calcImage, model, keygrid, display, display2, parser) {
  this.calcImage = calcImage;
  this.model = model;
  this.keygrid = keygrid;
  this.display = display;
  this.display2 = display2;
  this.parser = parser;
  this.calcImage.callback = function(key) {
    model.keyPressed = key;
    keygrid.update();
  };

  this.run = function() {
    this.display.write("12345678");
    this.display2.write("12345678");
    this.keygrid.update();
  };
};
