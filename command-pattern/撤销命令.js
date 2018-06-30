// 命令模式，没有撤销功能
var ball = document.getElementById( 'ball' );
var pos = document.getElementById( 'pos' );
var moveBtn = document.getElementById( 'moveBtn' );

var MoveCommand = function( receiver, pos ){
  this.receiver = receiver;
  this.pos = pos;
};
MoveCommand.prototype.execute = function(){
  this.receiver.start( 'left', this.pos, 1000, 'strongEaseOut' );
};

var moveCommand;
moveBtn.onclick = function(){
  var animate = new Animate( ball );
  moveCommand = new MoveCommand( animate, pos.value );
  moveCommand.execute();
};

// 命令模式，具有撤销功能
var ball = document.getElementById( 'ball' );
var pos = document.getElementById( 'pos' );
var moveBtn = document.getElementById( 'moveBtn' );
var cancelBtn = document.getElementById( 'cancelBtn' );
var MoveCommand = function( receiver, pos ){
  this.receiver = receiver;
  this.pos = pos;
  this.oldPos = null;
};
MoveCommand.prototype.execute = function(){
  this.receiver.start( 'left', this.pos, 1000, 'strongEaseOut' );
  // 记录小球开始移动前的位置
  this.oldPos = this.receiver.dom.getBoundingClientRect()[ this.receiver.propertyName ];
};

// 撤销 undo 方法
MoveCommand.prototype.undo = function(){
  this.receiver.start( 'left', this.oldPos, 1000, 'strongEaseOut' );
  // 回到小球移动前记录的位置
};

var moveCommand;
moveBtn.onclick = function(){
  var animate = new Animate( ball );
  moveCommand = new MoveCommand( animate, pos.value );
  moveCommand.execute();
};

cancelBtn.onclick = function(){
  moveCommand.undo(); // 撤销命令
};

