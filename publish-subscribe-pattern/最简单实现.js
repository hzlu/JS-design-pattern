/*
 * 最简单的发布订阅模式
 * 但订阅者会收到发布者发布的每个信息
 * 后面有改良版
 */
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

// 增加订阅者
salesOffices.listen = function( fn ){
  this.clientList.push( fn ); // 订阅的消息添加进缓存列表
};
// 发布消息
salesOffices.trigger = function(){
  for( var i = 0, fn; fn = this.clientList[ i++ ]; ){
    fn.apply( this, arguments ); // arguments 是发布消息时带上的参数
  }
};

//下面我们来进行一些简单的测试：
salesOffices.listen( function( price, squareMeter ){ // 小明订阅消息
  console.log( '价格= ' + price );
  console.log( 'squareMeter= ' + squareMeter );
});

salesOffices.listen( function( price, squareMeter ){ // 小红订阅消息
  console.log( '价格= ' + price );
  console.log( 'squareMeter= ' + squareMeter );
});

salesOffices.trigger( 2000000, 88 ); // 输出：200 万，88 平方米
salesOffices.trigger( 3000000, 110 ); // 输出：300 万，110 平方米

/***********************************************************************/

/*
 * 添加标示key，让订阅者只订阅自己感兴趣的消息
 */
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function( key, fn ){
  if ( !this.clientList[ key ] ){ // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[ key ] = [];
  }
  this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
};

salesOffices.trigger = function(){ // 发布消息
  var key = Array.prototype.shift.call( arguments ), // 取出消息类型
    fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
  if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
    return false;
  }
  for( var i = 0, fn; fn = fns[ i++ ]; ){
    fn.apply( this, arguments ); // (2) // arguments 是发布消息时附送的参数
  }
};

salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅88 平方米房子的消息
  console.log( '价格= ' + price ); // 输出： 2000000
});
salesOffices.listen( 'squareMeter110', function( price ){ // 小红订阅110 平方米房子的消息
  console.log( '价格= ' + price ); // 输出： 3000000
});

salesOffices.trigger( 'squareMeter88', 2000000 ); // 发布88 平方米房子的价格
salesOffices.trigger( 'squareMeter110', 3000000 ); // 发布110 平方米房子的价格

