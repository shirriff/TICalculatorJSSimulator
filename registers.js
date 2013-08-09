// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file updates the display of the CPU registers.

var Registers = function(elem, model) {

  this.update = function() {
    function updateOne(contents, name) {
      for (var i = 0; i <= 10; i++) {
	$("#registers-" + name + (10 - i))[0].textContent = contents[i];
      }
    }

    updateOne(model.a, 'a');
    updateOne(model.b, 'b');
    updateOne(model.c, 'c');
    updateOne(model.d, 'd');
    updateOne(model.af, 'af');
    updateOne(model.bf, 'bf');

    // Update mask
    for (var i = 0; i <= 10; i++) {
      var elem = $("#registers-m" + (10 - i));
      var m = model.mask ? model.mask[i] : ' ';
      elem.text(m > 0 ? m : '');
      if (m === ' ') {
	elem.removeClass('mask');
      } else {
	elem.addClass('mask');
      }
    }

    $("#registers-cc").text(model.cc + ' ' + model.ccMeaning);
    var binaryInstr = ('000000000000' + model.rom[model.address].toString(2)).substr(-11);
    $("#registers-i").text(binaryInstr.substr(0, 2) + ' ' + binaryInstr.substr(2, 5) +
	' ' + binaryInstr.substr(7));

  };
};
