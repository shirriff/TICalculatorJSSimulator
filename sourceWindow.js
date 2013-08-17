// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file displays the source code in the source window.

var SourceWindow = function(elem, model, sourceCode) {
  var height = 336 / 12; // height in lines
  var top = 0;
  var highlighted = null;

  // Copy code into source window
  (function init() {
    var html = [];
    for (var i = 0; i < sourceCode.length; i++) {
      var addr = ('000' + i.toString(16)).substr(-3);
      var parts = sourceCode[i].split('; ');
      var instr = parts[0];
      instr = (instr + '                  ').slice(0, 14);
      var comment = parts.length > 1 ? parts[1] : null
      var line = '<div id="s' + i + '">' +
	'<span class="instr">' + instr + '</span>  ';
      if (comment) {
	line += '<span class="comment">' + comment + '</span>';
      }
      line += '</div>';
      html.push(line);
    }
    elem.html(html.join('\n'));
  }());

  this.update = function() {
    $('#s' + highlighted).removeClass('highlight');
    if (!model.power) {
      return;
    }
    $('#s' + model.address).addClass('highlight');
    highlighted = model.address;

    if (model.address >= top + height || model.address < top) {
      top = model.address - 3;
      if (top < 0) {
	top = 0;
      }
      elem.scrollTop(top * 12);
    }
  }
};
