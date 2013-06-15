// Source window
var SourceWindow = function(elem, model) {
  this.model  = model;
  this.width = elem[0].width;
  this.height = elem[0].height;
  this.elem = elem[0];

  this.update = function() {
    elem.innerText = 'abc\ndef\nghi\njkl\n';
  }
};
