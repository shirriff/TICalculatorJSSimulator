// The CPU simulator
var Cpu = function(model) {
  this.model = model;

  this.step = function() {
    var instruction = this.model.rom[this.model.address];
    var classBits = instruction >> 9;
    var nextAddress = this.model.address + 1;
    if (classBits == 3) {
      // Register instruction
      var opcode = (instruction >> 4) & 0xf;
      var mask = instruction & 0xf;
      switch (opcode) {
	case 0: // AABA: A+B -> A
	  this.model.a = add(this.model.a, this.model.b);
	  break;
	case 1: // AAKA: A+K -> A
	  this.model.a = add(this.model.a, getK(mask));
	  break;
	case 2: // AAKC: A+K -> C
	  this.model.c = add(this.model.a, getK(mask));
	  break;
	case 3: // ABOA: B -> A
	  this.model.a = copy(this.model.b);
	  break;
	case 4: // ABOC: B -> C
	  this.model.c = copy(this.model.b);
	  break;
	case 5: // ACKA: C+K -> A
	  this.model.a = add(this.model.c, getK(mask));
	  break;
	case 6: // AKCB: C+K -> B
	  this.model.b = add(this.model.c, getK(mask));
	  break;
	case 7: // SABA: A-B -> A
	  this.model.a = sub(this.model.a, this.model.b);
	  break;
	case 8: // SABC: A-B -> C
	  this.model.c = sub(this.model.a, this.model.b);
	  break;
	case 9: // SAKA: A-K -> A
	  this.model.a = sub(this.model.a, getK(mask));
	  break;
	case 10: // SCBC: C-B -> C
	  this.model.c = sub(this.model.c, this.model.b);
	  break;
	case 11: // SCKC: C-K -> C
	  this.model.c = sub(this.model.c, getK(mask));
	  break;
	case 12: // CAB: compare A-B
	  compare(this.model.a, this.model.b);
	  break;
	case 13: // CAK: compare A-K
	  compare(this.model.a, getK(mask));
	  break;
	case 14: // CCB: compare C-B
	  compare(this.model.c, this.model.b);
	  break;
	case 15: // CCK: compare C-K
	  compare(this.model.c, getK(mask));
	  break;
	case 16: // AKA: K -> A
	  this.model.a = copy(getK(mask));
	  break;
	case 17: // AKB: K -> B
	  this.model.b = copy(getK(mask));
	  break;
	case 18: // AKC: K -> C
	  this.model.c = copy(getK(mask));
	  break;
	case 19: // EXAB: exchange A and B
	  break;
	case 20: // SLLA: shift A left
	  sll(this.model.a);
	  break;
	case 21: // SLLB: shift B left
	  sll(this.model.b);
	  break;
	case 22: // SLLC: shift C left
	  sll(this.model.c);
	  break;
	case 23: // SRLA: shift A right
	  srl(this.model.a);
	  break;
	case 24: // SRLB: shift B right
	  srl(this.model.b);
	  break;
	case 25: // SRLC: shift C right
	  srl(this.model.c);
	  break;
	case 26: // AKCN: A+K -> A until key down or D11
	  break;
	case 27: // AAKAH A+K -> A hex
	  this.model.a = add(this.model.a, getK(mask), 1 /* hex */);
	  break;
	case 28: // SAKAH A-K -> A hex
	  this.model.a = sub(this.model.a, getK(mask), 1 /* hex */);
	  break;
	case 29: // ACKC: C+K -> C
	  this.model.c = add(this.model.c, getK(mask));
	  break;
	default:
	  alert('Bad instruction ' + instruction);
	  break;
      }
    } else if ((instruction >> 8) == 5) {
      // Flag instruction
    } else if (classBits == 0) {
      // jump if reset: BIU, BIZ, BIGE, BINC, BIE, BET
      if (this.model.cc == 0) {
	nextAddress = instruction & 0x1ff;
      }
    } else if (classBits == 1) {
      // jump if set: BID, BIO, BILT, BIC, BINE
      if (this.model.cc == 1) {
	nextAddress = instruction & 0x1ff;
      }
    } else if ((instruction >> 7) == 8) {
      // Jump if key down on KO (BKO)
      if (0) {
	nextAddress = instruction & 0x1ff;
      }
    } else if ((instruction >> 7) == 9) {
      // Jump if key down on KP (BKP)
      if (0) {
	nextAddress = instruction & 0x1ff;
      }
    } else {
      alert('Bad instruction code ' + instruction);
    }
    this.model.address = nextAddress;
  };
};
