Singleton.getInstance = (function(){
  var instance = null;
  return function( name ){
    if ( !instance ){
      instance = new Singleton( name );
    }
    return instance;
  }
})();

/*
 * 非单例
*/
var loginLayer = (function(){
  var div = document.createElement( 'div' );
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
})();

document.getElementById( 'loginBtn' ).onclick = function(){
  loginLayer.style.display = 'block';
};

/*
 * 达到了惰性的目的，但失去了单例的效果
*/
var createLoginLayer = function(){
  var div = document.createElement( 'div' );
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
};
document.getElementById( 'loginBtn' ).onclick = function(){
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};

/*
 * 惰性单例
*/
var createLoginLayer = (function(){
  var div;
  return function(){
    if ( !div ){
      div = document.createElement( 'div' );
      div.innerHTML = '我是登录浮窗';
      div.style.display = 'none';
      document.body.appendChild( div );
    }
    return div;
  }
})();

document.getElementById( 'loginBtn' ).onclick = function(){
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};

