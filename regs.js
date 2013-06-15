// Register display

var Regs = function(elem) {
  this.elem = elem;
  this.a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.af = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.bf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  this.cc = 0;

  function updateReg(name) {
    for (var i = 0; i < 11; i++) {
      var elt = document.getElementById(name + i);
      elt.innerText = this[name][i];
    }
  }
  this.update = function(model) {
    var regList = ['a', 'b', 'c', 'af', 'bf', 'd', 'cc'];
    for (var i = 0; i < regList.length; i++) {
      updateReg(regList[i]);
    }
  };
};
