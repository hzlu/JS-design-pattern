// 与用户信息模块产生了强耦合，不妥！
login.succ(function(data){
  header.setAvatar( data.avatar); // 设置header 模块的头像
  nav.setAvatar( data.avatar ); // 设置导航模块的头像
  message.refresh(); // 刷新消息列表
  cart.refresh(); // 刷新购物车列表
});

// 对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件。
//
$.ajax('http://xxx.com?login', function(data) {
  login.trigger('loginSucc', data); // 发布登录成功的消息
});

var header = (function(){ // header 模块
  login.listen( 'loginSucc', function( data){
    header.setAvatar( data.avatar );
  });
  return {
    setAvatar: function( data ){
      console.log( '设置header 模块的头像' );
    }
  }
})();

var nav = (function(){ // nav 模块
  login.listen( 'loginSucc', function( data ){
    nav.setAvatar( data.avatar );
  });
  return {
    setAvatar: function( avatar ){
      console.log( '设置nav 模块的头像' );
    }
  }
})();

var address = (function(){ // nav 模块
  login.listen( 'loginSucc', function( obj ){
    address.refresh( obj );
  });
  return {
    refresh: function( avatar ){
      console.log( '刷新收货地址列表' );
    }
  }
})();

