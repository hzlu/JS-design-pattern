const Singleton = function (name) {
  this.name = name;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = (function(){
  var instance = null;
  // 闭包
  return function(name){
    if (!instance){
      instance = new Singleton(name);
    }
    return instance;
  }
})();

Singleton.getInstance('foo').getName();
Singleton.getInstance('bar').getName();