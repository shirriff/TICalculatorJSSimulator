// instruction info
var Instruction = function(elem, model) {

  var flagops = [
    'NOP: No-op',
    'WAITDK: Wait for Display Key, then branch',
    'WAITNO: Wait for key pressed, then branch',
    'SFB: Set flag B bits',
    'SFA: Set flag A bits',
    'SYNC: Sync to start of key scan',
    'SCAN: Scan keys; set condition if pressed',
    'ZFB: Zero flag B bits',
    'ZFA: Zero flag A bits',
    'TFB: Test flag B bits',
    'TFA: Test flag A bits',
    'FFB: Flip flag B bits',
    'FFA: Flip flag A bits',
    'CF: Compare A and B flag bits',
    'NOP: No-op',
    'EXF: Exchange A and B flag bits'];

  var aluops = [
    'AABA: A+B&rArr;A',
    'AAKA: A+K&rArr;A',
    'AAKC: A+K&rArr;C',
    'ABOA: B&rArr;A',
    'ABOC: B&rArr;C',
    'ACKA: C+K&rArr;A',
    'ACKB: C+K&rArr;B',
    'SABA: A-B&rArr;A',
    'SABC: A-B&rArr;C',
    'SAKA: A-K&rArr;A',
    'SCBC: C-B&rArr;C',
    'SCKC: C-K&rArr;C',
    'CAB: Compare A and B',
    'CAK: Compare A and K',
    'CCB: Compare C and B',
    'CCK: Compare C and K',
    'AKA: K&rArr;A',
    'AKB: K&rArr;B',
    'AKC: K&rArr;C',
    'EXAB: Exchange A and B',
    'SLLA: Shift A left',
    'SLLB: Shift B left',
    'SLLC: Shift C left',
    'SRLA: Shift A right',
    'SRLB: Shift B right',
    'SRLC: Shift C right',
    'AKCN: A+K&rArr;A one cycle until key press',
    'AAKAH: A+K&rArr;A (hex)',
    'SAKAH: A-K&rArr;A (hex)',
    'ACKC: C+K&rArr;C'];

  this.update = function() {
    if (model.running) {
      // Only display instruction when stepping
      elem.html('');
      return;
    }
    var instrCode = model.rom[model.address];
    var classBits = instrCode >> 9;
    var opcode = (instrCode >> 4) & 0x1f;
    if (classBits == 0) {
      elem.html("Bxx: Branch if condition 0");
    } else if (classBits == 1) {
      elem.html("Bxx: Branch if condition 1");
    } else if (classBits == 3) {
      // Register instruction
      elem.html(aluops[opcode]);
    } else {
      // classBits == 2
      if (opcode >= 16) {
	// Flag instruction
        elem.html(flagops[opcode - 16]);
      } else if (opcode >= 8) {
	elem.html("BKP: Branch if KP key down");
      } else {
	elem.html("BKO: Branch if KO key down");
      }
    }
  };
};
