// 逆转不可逆命令的办法是
// 利用一个历史列表堆栈，记录命令日志，然后重复执行它们
var Ryu = {
  attack: function(){
    console.log( '攻击' );
  },
  defense: function(){
    console.log( '防御' );
  },
  jump: function(){
    console.log( '跳跃' );
  },
  crouch: function(){
    console.log( '蹲下' );
  }
};

var makeCommand = function( receiver, state ){ // 创建命令
  return function(){
    receiver[ state ]();
  }
};
var commands = {
  "119": "jump", // W
  "115": "crouch", // S
  "97": "defense", // A
  "100": "attack" // D
};

var commandStack = []; // 保存命令的堆栈

document.onkeypress = function( ev ){
  var keyCode = ev.keyCode,
    command = makeCommand( Ryu, commands[ keyCode ] );
  if ( command ){
    command(); // 执行命令
    commandStack.push( command ); // 将刚刚执行过的命令保存进堆栈
  }
};

document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像
  var command;
  while( command = commandStack.shift() ){ // 从堆栈里依次取出命令并执行
    command();
  }
};


