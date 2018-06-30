document.body.addEventListener( 'click', function(){
  alert(2);
}, false );

document.body.click(); // 模拟用户点击

document.body.addEventListener( 'click', function(){
  alert(2);
}, false );
document.body.addEventListener( 'click', function(){
  alert(3);
}, false );
document.body.addEventListener( 'click', function(){
  alert(4);
}, false );

document.body.click(); // 模拟用户点击

