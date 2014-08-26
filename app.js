var Beats = require('./beats');

var button = document.querySelector('.drop-the-beat');
var div = document.querySelector('.beats-input');

var beats = new Beats();
beats.onReady(function() {
  button.addEventListener('click', dropTheBeat);
});

function dropTheBeat(event) {
  console.log('i worked');

  var text = div.innerText;

  beats.notation(text);
  beats.startPlaying();
}



div.addEventListener('keydown', function(e) {

  var directions = {
    37: 'l',
    38: 'u',
    39: 'r',
    40: 'd'
  };
  var direction = directions[e.keyCode];

  if (!direction) return;
  e.preventDefault();

  var text = div.innerHTML;
  var selection = window.getSelection()
  var range = selection.getRangeAt(0);

  var start, end;

  if (direction === 'r') {
    start = text.indexOf(' ', range.startOffset) + 1;
    end = start + 2;
  }
  else if (direction === 'l') {
    start = text.lastIndexOf(' ', range.startOffset) - 2;
    end = start + 2;
  }
  else if (direction === 'd') {
    var prevNewline = text.lastIndexOf('\n', range.startOffset);
    var lineIndex = range.startOffset - prevNewline;
    var newline = text.indexOf('\n', range.startOffset);
    start = text.indexOf(' ', newline + lineIndex - 2) + 1;
    end = start + 2;
  }
  else if (direction === 'u') {
    var prevNewline = text.lastIndexOf('\n', range.startOffset);
    var lineIndex = range.startOffset - prevNewline;
    var prevLineStart = text.lastIndexOf('\n', prevNewline - 1);
    var newline = text.indexOf('\n', range.startOffset);
    start = text.indexOf(' ', prevLineStart + lineIndex - 2) + 1;
    end = start + 2;
  }
  if (start < 0) return;

  var newSelection = document.createRange();

  newSelection.setStart(div.childNodes[0], start);
  newSelection.setEnd(div.childNodes[0], end);

  selection.removeAllRanges();
  selection.addRange(newSelection);

});
