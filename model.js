// Data model
var Model = function() {
  // Arrays match chip values, i.e. a[0] is displayed on right
  this.a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.af = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.bf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.d = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  this.dActive = 7;
  this.cc = 0;
  this.ccMeaning = '';
  this.keyPressed = '5';
  this.address = 0;
};
