// 不适用命令模式
var bindClick = function( button, func ){
  button.onclick = func;
};
var MenuBar = {
  refresh: function(){
    console.log( '刷新菜单界面' );
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
bindClick( button1, MenuBar.refresh );
bindClick( button2, SubMenu.add );
bindClick( button3, SubMenu.del );

// 闭包实现的命令模式
var setCommand = function( button, func ){
  button.onclick = function(){
    func();
  }
};
var MenuBar = { // 接收者
  refresh: function(){
    console.log( '刷新菜单界面' );
  }
};
var RefreshMenuBarCommand = function( receiver ){ // 命令类
  return function(){
    receiver.refresh();
  }
};
var refreshMenuBarCommand = RefreshMenuBarCommand( MenuBar ); // command 对象
setCommand( button1, refreshMenuBarCommand );

// 为类更明确表达当前正在使用命令模式，把执行函数改为调用execute方法
var RefreshMenuBarCommand = function( receiver ){
  return {
    execute: function(){
      receiver.refresh();
    }
  }
};
var setCommand = function( button, command ){
  button.onclick = function(){
    command.execute();
  }
};

var refreshMenuBarCommand = RefreshMenuBarCommand( MenuBar );
setCommand( button1, refreshMenuBarCommand );

