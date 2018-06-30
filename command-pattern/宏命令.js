var closeDoorCommand = {
  execute: function(){
    console.log( '关门' );
  }
};
var openPcCommand = {
  execute: function(){
    console.log( '开电脑' );
  }
};

var openQQCommand = {
  execute: function(){
    console.log( '登录QQ' );
  }
};

var MacroCommand = function(){
  return {
    commandsList: [],
    add: function( command ){
      this.commandsList.push( command );
    },
    execute: function(){
      for ( var i = 0, command; command = this.commandsList[ i++ ]; ){
        command.execute();
      }
    }
  }
};
var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQCommand );
macroCommand.execute();

