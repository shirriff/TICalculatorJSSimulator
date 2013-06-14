// Parse source code
var Parser = function() {
  this.equ = {};
  this.ops = {};

  // Generate map from symbolic op to numeric code
  this.opToCode = function() {
    var opToCode = {};
    // Opcodes for flag instructions, starting at 16
    var flagops = ['NOP', 'WAITDK', 'WAITNO', 'SFB', 'SFA', 'SYNC', 'SCAN',
	 'ZFB', 'ZFA', 'TFB', 'TFA', 'FFB', 'FFA', 'CF', 'NOP', 'EXF'];

    // Opcodes for alu instructions, starting at 0
    var aluops = ['AABA', 'AAKA', 'AAKC', 'ABOA', 'ABOC', 'ACKA', 'ACKB', 'SABA',
	'SABC', 'SAKA', 'SCBC', 'SCKC', 'CAB', 'CAK', 'CCB', 'CCK',
	'AKA', 'AKB', 'AKC', 'EXAB', 'SLLA', 'SLLB', 'SLLC', 'SRLA',
	'SRLB', 'SRLC', 'AKCN', 'AAKAH', 'SAKAH', 'ACKC'];

    // Opcodes for 00 jump
    var jmp0ops= ['BIU', 'BIZ', 'BIGE', 'BINC', 'BIE', 'BET'];

    // Opcodes for 11 jump
    var jmp1ops = ['BID', 'BIO', 'BILT', 'BIC', 'BINE'];
    
    // 101oooommmm
    for (var i = 0; i < flagops.length; i++) {
      opToCode[flagops[i]] = 0x500 | (i << 4);
    }

    // 11ooooommmm
    for (var i = 0; i < aluops.length; i++) {
      opToCode[flagops[i]] = 0x600 | (i << 4);
    }
    
    // 00aaaaaaaaa
    for (var i = 0; i < jmp0ops.length; i++) {
      opToCode[jmp0ops[i]] = 0;
    }
    
    // 01aaaaaaaaa
    for (var i = 0; i < jmp1ops.length; i++) {
      opToCode[jmp1ops[i]] = 0x200;
    }

    // 1000aaaaaaa
    opToCode['BKO'] = 0x400;

    // 1001aaaaaaa
    opToCode['BKP'] = 0x480;

    return opToCode;
  }();
  

  this.trim = function(line) {
    return $.trim(line.replace(/;.*/, '').replace(/\/\/.*/, ''));
  }

  // Input is e.g.:
  // 0 0010 1001	0029	10 10111 1000	.ID1	ZFB	F10
  // Returns [addr, value, binary string value, label, op, arg?]
  this.splitLine = function(line) {
    var m = line.match(/^(\d \d{4} \d{4})\s+(\S+)\s+(\d{2} \d{5} \d{4})\s+(.*)/);
    if (! m) {
      alert("parse error: " + line);
      return null;
    }
    var addr = parseInt(m[2], 16);
    var binary = m[3];
    var value = parseInt(binary.replace(' ', ''), 2);
    var m2 = m[4].split(/\s+/g);
    if (m2[0][0] == '.') {
      return m2.splice(0, 1, addr, value);
    } else {
      return m2.splice(0, 1, addr, value, '');
    }
  }

  // Parse the code (list of lines)
  this.parse = function(code) {
    // Pass 1: labels and equs
    var labels = {};
    var equ = {};
    for (var i = 0; i < code.length; i++) {
      var line = this.trim(code[i]);
      if (line == '') {
	continue;
      }
      var m = line.match(/^(\S+)\s+EQU\s+(\d+)$/);
      if (m) {
	equ[m[1]] = m[2];
	console.log(m[1] + ':' + equ[m[1]]);
      } else {
	var m = line.match(/^(\S+)\s+EQU\s+(\S+)$/);
	if (m) {
	  equ[m[1]] = equ[m[2]];
	  console.log(m[1] + ':' + equ[m[1]]);
	} else {
	  var parts = this.splitLine(line);
	  console.log(parts);
	}
      }
    }
  }
};
