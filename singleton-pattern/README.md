# 单例模式

保证一个类只有一个实例（单例），通过接口访问该单例。

适用场景为：应用当且仅当需要唯一的实例，此外，该实例仅当用到时才去初始化。

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

## 用代理实现单例

```javascript
const CreateDiv = function (html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

const ProxySingletonCreateDiv = (function(){
  let instance;
  return function (html) {
    if (!instance) {
      // 代理给 CreateDiv
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();

const a = new ProxySingletonCreateDiv('foo');
const b = new ProxySingletonCreateDiv('bar');

console.log(a === b);
```

## 透明单例

```javascript
const OnlyDiv = (function () {
  let instance;
  const CreateDiv = function (html) {
    if (instance){
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  };
  CreateDiv.prototype.init = function () {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();

const a = new OnlyDiv('foo');
const b = new OnlyDiv('bar');
console.log(a === b); // true
```

## 惰性单例

```javascript
/*
 * 非惰性求值
*/
var loginLayer = (function(){
  var div = document.createElement( 'div' );
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
})();

document.getElementById('loginBtn').onclick = function(){
  loginLayer.style.display = 'block';
};

/*
 * 达到了惰性的目的，但失去了单例的效果
*/
var createLoginLayer = function(){
  var div = document.createElement('div');
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
};
document.getElementById('loginBtn').onclick = function(){
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};

/*
 * 惰性单例
*/
const createLoginLayer = (function () {
  let div;
  return function () {
    if (!div) {
      div = document.createElement('div');
      div.innerHTML = '我是登录浮窗';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    return div;
  }
})();

document.getElementById('loginBtn').onclick = function () {
  let loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};
```

