var myImage = (function(){
  var imgNode = document.createElement( 'img' );
  document.body.appendChild( imgNode );
  return {
    setSrc: function( src ){
      imgNode.src = src;
    }
  }
})();
myImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );

// 先用占位图，等图片加载好再填充到img节点里
// 单一职责原则，本体对象负责设置src
var myImage = (function(){
  var imgNode = document.createElement( 'img' );
  document.body.appendChild( imgNode );
  return {
    setSrc: function( src ){
      imgNode.src = src;
    }
  }
})();
// 单一职责原则，代理对象负责图片预加载
// 即便以后不需要预加载，则只需改成请求本体而不是请求代理对象即可
var proxyImage = (function(){
  var img = new Image;
  img.onload = function(){
    myImage.setSrc( this.src );
  }
  return {
    setSrc: function( src ){
      myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
      img.src = src;
    }
  }
})();
proxyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );

// 不用代理的预加载图片函数实现
// 违反了单一职责原则
var MyImage = (function(){
  var imgNode = document.createElement( 'img' );
  document.body.appendChild( imgNode );
  var img = new Image;
  img.onload = function(){
    imgNode.src = img.src;
  };
  return {
    setSrc: function( src ){
      imgNode.src = 'file:// /C:/Users/svenzeng/Desktop/loading.gif';
      img.src = src;
    }
  }
})();
MyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );

