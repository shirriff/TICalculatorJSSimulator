// Data model
var Model = function() {
  // Important: Array order matches display order, not bit order.
  // I.e. a[0] is high-order digit S10, a[10] is low-order digit S0.
  this.a = [9, 8, 7, 6, 5, 4, 3, 2, 0, 1, 0]; // Register A
  this.b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Register B
  this.c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Register C
  this.af = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Flags A
  this.bf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Flags B
  // D-scan register is a bit confusing. The D register is an 11-bit
  // sift register with a single 0 bit shifted right each D state.
  // The states are called D1 to D10.
  // I'm assuming that the last two bits both correspond to D10.
  this.d = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // D scan register, d[0] low for D1
  this.dActive = 1; // Currently active D value 1-10
  this.cc = 0;
  this.ccMeaning = '';
  this.keyPressed = null;
  // 1 if a keyboard input line is active, i.e. dActive and keyPressed match in the key matrix
  this.keyStrobe = 0;
  this.address = 0;
  this.display = 1; // Flag for display on
  this.mask = null;
};
