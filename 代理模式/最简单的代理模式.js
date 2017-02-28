// 不使用代理
var Flower = function(){};
var xiaoming = {
  sendFlower: function( target ){
    var flower = new Flower();
    target.receiveFlower( flower );
  }
};
var A = {
  receiveFlower: function( flower ){
    console.log( '收到花 ' + flower );
  }
};
xiaoming.sendFlower( A );

// 接下来，我们引入代理B，即小明通过B 来给A 送花：
var Flower = function(){};
var xiaoming = {
  sendFlower: function( target){
    var flower = new Flower();
    target.receiveFlower( flower );
  }
};
var B = {
  receiveFlower: function( flower ){
    A.receiveFlower( flower );
  }
};
var A = {
  receiveFlower: function( flower ){
    console.log( '收到花 ' + flower );
  }
};
xiaoming.sendFlower( B );


// 选择A 心情好的时候把花转交给A，代码如下：
var Flower = function(){};
var xiaoming = {
  sendFlower: function( target){
    var flower = new Flower();
    target.receiveFlower( flower );
  }
};
var B = {
  receiveFlower: function( flower ){
    A.listenGoodMood(function(){ // 监听A 的好心情
      A.receiveFlower( flower );
    });
  }
};
var A = {
  receiveFlower: function( flower ){
    console.log( '收到花 ' + flower );
  },
  listenGoodMood: function( fn ){
    setTimeout(function(){ // 假设10 秒之后A 的心情变好
      fn();
    }, 10000 );
  }
};
xiaoming.sendFlower( B );

