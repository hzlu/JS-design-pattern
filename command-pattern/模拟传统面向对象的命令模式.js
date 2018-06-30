// 请求发送者
var button1 = document.getElementById( 'button1' ),
    button2 = document.getElementById( 'button2' ),
    button3 = document.getElementById( 'button3' );

// 命令的接收者
var MenuBar = {
  refresh: function(){
    console.log( '刷新菜单目录' );
  }
};
var SubMenu = {
  add: function(){
    console.log( '增加子菜单' );
  },
  del: function(){
    console.log( '删除子菜单' );
  }
};

// 在让button 变得有用起来之前，我们要先把这些行为都封装在命令类中：
var RefreshMenuBarCommand = function( receiver ){
  this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function(){
  this.receiver.refresh();
};

var AddSubMenuCommand = function( receiver ){
  this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function(){
  this.receiver.add();
};

var DelSubMenuCommand = function( receiver ){
  this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function(){
  console.log( '删除子菜单' );
};

// 把命令接收者传入到 command 对象中
var refreshMenuBarCommand = new RefreshMenuBarCommand( MenuBar );
var addSubMenuCommand = new AddSubMenuCommand( SubMenu );
var delSubMenuCommand = new DelSubMenuCommand( SubMenu );

// 负责往按钮上面安装命令
var setCommand = function( button, command ){
  button.onclick = function(){
    command.execute();
  }
};

// 把command对象安装到button上面
setCommand( button1, refreshMenuBarCommand );
setCommand( button2, addSubMenuCommand );
setCommand( button3, delSubMenuCommand );

