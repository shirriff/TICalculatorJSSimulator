// Source window
var SourceWindow = function(elem, model) {
  this.model  = model;
  this.width = elem.width;
  this.height = elem.height;
  this.elem = elem;

  this.update = function() {
    elem.innerText = 'abc\ndef\nghi\njkl\n';
  }
};
