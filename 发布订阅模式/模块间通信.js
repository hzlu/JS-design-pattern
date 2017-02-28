var a = (function(){
  var count = 0;
  var button = document.getElementById( 'count' );
  button.onclick = function(){
    Event.trigger( 'add', count++ );
  }
})();
var b = (function(){
  var div = document.getElementById( 'show' );
  Event.listen( 'add', function( count ){
    div.innerHTML = count;
  });
})();

