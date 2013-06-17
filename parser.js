// Parse source code
var Parser = function(code, model) {
  model.rom = []; // rom[addr] = value
  model.source = []; // source[addr] = original source code

  // Parse the code (list of lines)
  // Input is e.g.:
  // 0 0010 1001	0029	10 10111 1000	.ID1	ZFB	F10
  var curAddr = 0;
  for (var i = 0; i < code.length; i++) {
    // Match e.g. (0 0010 1001)	(0029)	(10 10111 1000)	(.ID1	ZFB	F10)
    var m = code[i].match(/^\s*(\d \d{4} \d{4})\s+(\S+)\s+(\d{2} \d{5} \d{4})\s+(.*)/);
    if (m) {
      var addr = parseInt(m[2], 16);
      model.source[addr] = code[i];
      var opcode = parseInt(m[3].replace(/ /g, ''), 2); // instruction in binary
      model.rom[addr] = opcode;
      if (addr != curAddr) {
	alert('Unexpected addr in ' + code[i]);
      }
      curAddr += 1;
    }
  }
};
