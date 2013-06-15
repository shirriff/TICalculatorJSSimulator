// Parse source code
var Parser = function() {
  this.rom = []; // rom[addr] = value
  this.code = []; // code[addr] = original line of code

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
  

  // Input is e.g.:
  // 0 0010 1001	0029	10 10111 1000	.ID1	ZFB	F10
  // Returns [addr, value, binary string value, label, op, arg]
  // or [EQU, name, value]
  // or null
  this.splitLine = function(line) {
    // Remove comments, whitespace
    line = $.trim(line.replace(/;.*/, '').replace(/\/\/.*/, ''));
    if (!line) {
      return null;
    }

    // Try matching * EQU *
    m = line.match(/^(\S+)\s+EQU\s+(\S+)$/);
    if (m) {
      return ['EQU', m[1], m[2]];
    }
    // Now try matching e.g. (0 0010 1001)	(0029)	(10 10111 1000)	(.ID1	ZFB	F10)
    var m = line.match(/^(\d \d{4} \d{4})\s+(\S+)\s+(\d{2} \d{5} \d{4})\s+(.*)/);
    if (!m) {
      alert("parse error: " + line);
      return null;
    }
    var addr = parseInt(m[2], 16);
    var binaryop = m[3];
    var op = parseInt(binaryop.replace(' ', ''), 2);
    // Now split the label / instruction
    var m2 = m[4].split(/\s+/g);
    // Drop the first match element and add the addr, value
    if (m[4][0] != '.') {
      m2.unshift(''); // Add empty label if no label
    }
    if (m2.length == 2) {
      m2.push(''); // Add empty argument
    }
    return m2;
  }

  // Parse the code (list of lines)
  this.parse = function(code) {
    // Pass 1: labels and equs
    var labels = {};
    var equ = {};
    for (var i = 0; i < code.length; i++) {
      var parts = splitLine(code[i]);
      if (!parts) {
	continue;
      }
      if (parts && parts[0] == 'EQU') {
	if (parts[2].match(/^\d+$/)) {
	  // label EQU number
	  equ[parts[1]] = parts[2].parseInt(16);
	} else {
	  // label EQU previously-defined label
	  equ[parts[1]] = equ[parts[2]];
	}
	continue;
      }
      if (parts[3] != '') {
	labels[parts[3]] = parts[0]; // labels[name] = address
	console.log(parts[3] + ' -> ' + parts[0]);
      }
    }

    // Pass 2: process assembly code
    for (var i = 0; i < code.length; i++) {
      var parts = splitLine(code[i]);
      if (!parts || parts[0] == 'EQU') {
	continue;
      }
	console.log(line);
        if (line.match(/^(\S+)\s+EQU\s+/)) {
	  continue;
	}
	var parts = this.splitLine(line);
	console.log(parts);
    }
  }
};
