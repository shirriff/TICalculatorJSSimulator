// TI calculator simulator
// Ken Shirriff, http://righto.com/ti
// Based on patent US3934233
//
// This file displays the source code in the source window.

var SourceWindow = function(elem, model, sourceCode) {
  var height = 336 / 12; // height in lines
  var top = 0;
  var highlighted = null;
  var addrToLine = [];

  // Copy code into source window
  (function init() {
    var html = [];
    var regex = /^([\d ]{3}) (.*)/;
    for (var i = 0; i < sourceCode.length; i++) {
      var comment = sourceCode[i].replace(';', '');
      var line = '<div id="s' + i + '">';
      var m = sourceCode[i].match(regex);
      if (m) {
	addrToLine[parseInt(m[1], 10)] = i;
        var addr = ('000' + m[1]).substr(-3);
	var parts = m[2].split('; ');
	var instr = parts[0];
	instr = (instr + '                  ').slice(0, 25);
	var comment = parts.length > 1 ? parts[1] : null
	line += '<span class="instr">' + instr + '</span>';
      }
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
    highlighted = addrToLine[model.address];
    $('#s' + highlighted).addClass('highlight');

    top = elem.scrollTop() / 12;
    if (highlighted >= top + height || highlighted < top) {
      top = highlighted - 3;
      if (top < 0) {
	top = 0;
      }
      elem.scrollTop(top * 12);
    }
  }
};
