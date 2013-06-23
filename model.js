// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file is the data model, holding the state information

var Model = function(objectCode) {
  this.rom = objectCode;
  // Important: Array order matches display order, not bit order.
  // I.e. a[0] is high-order digit S10, a[10] is low-order digit S0.
  this.a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Register A
  this.b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Register B
  this.c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Register C
  this.af = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Flags A
  this.bf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Flags B
  // The states are called D1 to D10.  The last bit is never set
  // d is sort of a combination of the 10-bit digit scan register and the 11-bit D-scan register.
  // In reality, all 11 bits of the D-scan register are used, but at varying S cycles.
  // The digit scan register is clocked at S9 phase 3. Thus 11 shifts of D-scan take the same time
  // as 10 shifts of digit scan.
  this.d = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // D scan register, d[0] low for D1
  // Currently active D value 1-11. d[dActive-1] == 0
  this.dActive = 1;
  this.cc = 0;
  this.ccMeaning = '';
  this.keyPressed = null;
  // 'KO' or 'KP' if a keyboard input line is active, i.e. dActive and keyPressed match in the key matrix
  this.keyStrobe = 0;
  this.address = 0;
  this.display = 1; // Flag for display on
  this.mask = null;
  this.showDisplayScan = 0;
  this.idle = 0; // 1 if in idle loop
  this.fast = 0; // Fast updates
  this.fastStep = 1; // 1 makes SYNC, etc take 1 cycle
};
