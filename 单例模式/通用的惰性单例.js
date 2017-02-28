var getSingle = function( fn ){
  var result;
  return function(){
    return result || ( result = fn.apply(this, arguments) );
  }
};

var createLoginLayer = function(){
  var div = document.createElement( 'div' );
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
};

var createSingleLoginLayer = getSingle( createLoginLayer );

document.getElementById( 'loginBtn' ).onclick = function(){
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};

// jquery的one函数，只需要在第一次渲染列表的时候绑定一次
var bindEvent = function(){
  $( 'div' ).one( 'click', function(){
    alert ( 'click' );
  });
};
var render = function(){
  console.log( '开始渲染列表' );
  bindEvent();
};
render();
render();
render();

// 使用getSingle函数达到jquery的one函数效果
var bindEvent = getSingle(function(){
  document.getElementById( 'div1' ).onclick = function(){
    alert ( 'click' );
  }
  return true;
});
var render = function(){
  console.log( '开始渲染列表' );
  bindEvent();
};
render();
render();
render();

