//所以我们把发布—订阅的功能提取出来，放在一个单独的对象内：
var event = {
  clientList: {},
  listen: function( key, fn ){
    if ( !this.clientList[ key ] ){
      this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn ); // 订阅的消息添加进缓存列表
  },
  trigger: function(){
    var key = Array.prototype.shift.call( arguments ),
      fns = this.clientList[ key ];
    if ( !fns || fns.length === 0 ){ // 如果没有绑定对应的消息
      return false;
    }
    for( var i = 0, fn; fn = fns[ i++ ]; ){
      fn.apply( this, arguments ); // (2) // arguments 是trigger 时带上的参数
    }
  }
};

// installEvent函数可以给所有对象都动态安装发布订阅功能
var installEvent = function( obj ){
  for ( var i in event ){
    obj[ i ] = event[ i ];
  }
};

// 我们给售楼处对象salesOffices 动态增加发布—订阅功能：
var salesOffices = {};
installEvent( salesOffices );

// 订阅
salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅消息
  console.log( '价格= ' + price );
});
salesOffices.listen( 'squareMeter100', function( price ){ // 小红订阅消息
  console.log( '价格= ' + price );
});

// 发布
salesOffices.trigger( 'squareMeter88', 2000000 ); // 输出：2000000
salesOffices.trigger( 'squareMeter100', 3000000 ); // 输出：3000000

