# 闭包与高阶函数

## 词法作用域

词法作用域，也叫静态作用域，是在代码定义时确定的，关注函数在何处声明。

最内嵌套作用域规则，由一个声明引进的标志符在这个声明所在的作用域里可见，
而且在其内部嵌套的每个作用域里也可见，除非被内部覆盖。

## 动态作用域

动态作用域，是在代码运行时确定的，关注函数从何处调用。

从最近的活动记录中寻找变量的值。

## 闭包

`f` 返回了一个匿名函数的引用
它可以访问到 `func()` 被调用时产生的环境，而局部变量 `a` 一直处在这个环境里，
局部变量就有了不被销毁的理由，从而产生了一个 **闭包结构**

```javascript
var func = function () {
  var a = 1;
  return function () {
    a++;
    console.log(a);
  }
};
var f = func();

f(); // 输出：2
f(); // 输出：3
```

### 闭包作用

* 封装变量
* 延续局部变量寿命

```javascript
// 利用闭包，把小函数封闭起来
// 加入缓存机制提高函数性能，避免重复计算
var mult = (function(){
  var cache = {};
  var calculate = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }
    return a;
  };

  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (cache[args]) {
      return cache[args];
    }
    return cache[args] = calculate.apply(null, arguments);
  }
})();

console.log(mult(1,2,3)); // 输出：6
console.log(mult(1,2,3)); // 输出：6
```

### 用闭包实现面向对象

```javascript
var extent = function(){
  var value = 0;
  return {
    call: function(){
      value++;
      console.log( value );
    }
  }
};

var extent = extent();
extent.call(); // 输出：1
extent.call(); // 输出：2
extent.call(); // 输出：3
```

### 闭包与内存管理

把变量放在闭包中和放在全局作用域对内存的影响是一致，这并不能说是内存泄露。

和内存泄露有关系的地方是：使用闭包的同时比较容易形成循环引用，
如果闭包的作用域链中保存着一些DOM节点，这时候就有可能造成内存泄露。

把变量手动设为 `null` 意味着切断变量与它之前引用的值之间的连接，
当垃圾收集器下次运行时就会删除这些值，并回收占用的内存。

## 高阶函数

* 函数可以作为参数被传递
  * 回调函数，把可变部分封装为回调
  * Array.prototype.sort
* 函数可以作为返回值输出

```javascript
// 这个高阶函数的例子，既把函数当作参数传递，又让函数执行后返回了另外一个函数。
var getSingle = function (fn) {
  var ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
};

var getScript = getSingle(function(){
  return document.createElement('script');
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2); // 输出：true
```

### 高阶函数实现面向切面编程 AOP

> AOP 面向切面编程 主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，
> 这些功能通常包括日志统计、安全控制、异常处理等。
> 把这些功能抽离出来后，再通过『动态织入』的方式掺入到业务逻辑中。
> 好处是：可以保持业务逻辑的纯净和高内聚性，其次可以方便复用其他功能模块。
> 类似装饰器模式

```javascript
Function.prototype.before = function (beforefn) {
  var __self = this; // 保存原函数的引用
  return function () { // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，修正this
    return __self.apply(this, arguments); // 执行原函数
  }
};

Function.prototype.after = function (afterfn) {
  var __self = this;
  return function () {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};

var func = function () {
  console.log(2);
};

func = func.before(function () {
  console.log(1);
}).after(function(){
  console.log(3);
});

func(); // 输出 1 2 3
```

### Currying

> currying 又称为 部分求值。
> 一个 currying 的函数首先会接收一些参数，接受了这些参数后不会立即求值，
> 而是继续返回另一个函数，刚传入的参数在函数形成的闭包中被保存起来。
> 等到函数被真正求值时，所有参数才会一次性求值


```javascript
var currying = function (fn) {
  var args = [];
  return function () {
    if (arguments.length === 0){
      return fn.apply(this, args);
    }else{
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  }
};
var cost = (function () {
  var money = 0;
  return function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }
    return money;
  }
})();

var cost = currying(cost); // 转化成currying 函数
cost(100); // 未真正求值
cost(200); // 未真正求值
cost(300); // 未真正求值
console.log(cost()); // 求值并输出：600
```

### uncurrying

```javascript
Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

var push = Array.prototype.push.uncurrying();

(function(){
  push(arguments, 4);
  console.log(arguments); // 输出：[1, 2, 3, 4]
})(1, 2, 3);
```

