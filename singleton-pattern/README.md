# 单例模式

保证一个类只有一个实例（单例），通过接口访问该单例。

适用场景为：应用当且仅当需要唯一的实例，此外，该示例仅当用到时才去初始化。

## 使用闭包封装私有变量

```javascript
const user = (function () {
  const _name = 'sven';
  const _age  = 29;

  return {
    getUserInfo: function () {
      return `${_name}-${_age}`;
    }
  }
})();

user.getUserInfo();
```

## 标准单例

```javascript
const Singleton = function (name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = function (name) {
  if (!this.instance){
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const a = Singleton.getInstance('foo');
const b = Singleton.getInstance('bar');
a.getName();
console.log(a === b); // true
```

## 标准单例 2

```javascript
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
```