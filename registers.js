// Display of registers
var Registers = function(elem, model) {

  this.update = function() {
    function updateOne(contents, name) {
      for (var i = 0; i <= 10; i++) {
	$("#registers-" + name + (10 - i)).text(contents[i]);
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

  };
};
