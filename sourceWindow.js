// Source window
var SourceWindow = function(elem, model) {
  this.model  = model;
  this.width = elem.width;
  this.height = elem.height;
  this.elem = elem;

  this.update = function() {
    var s = '';
    for (var i = 0; i < 15 && model.address + i < 320; i++) {
      var line = model.source[model.address + i];
      s += line + '\n';
    }
    elem[0].innerText = s;
  }
};
