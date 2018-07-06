# this call apply

## this

* this 具体指向哪个对象是在运行时基于函数的执行环境动态绑定，而非声明时的环境
* 作为对象的方法调用，this 指向该对象
* 作为普通函数调用，this 指向全局对象
  * 在严格模式下 this 不会指向全局对象，而是 `undefined`
* 作为构造器函数调用，this 指向返回的对象
  * 如果构造器显式返回一个 `object` 类型的对象，new 运算结果最终返回这个对象，而不是 this
  * 如果不显式返回数据，或返回非对象类型的数据，就不会有上面的问题
* call 和 apply 可以动态改变传入的 this，能很好体现 JavaScript 的函数式语言特性

```javascript
var getId = function (id) {
  return document.getElementById(id);
};
getId('div1');

// 我们也许思考过为什么不能用下面这种更简单的方式：
var getId = document.getElementById;
getId('div1');

// 我们可以尝试利用 apply 把 document 当作this 传入 getId 函数，帮助修正 this：
document.getElementById = (function (func) {
  return function () {
    return func.apply(document, arguments);
  }
})(document.getElementById);

var getId = document.getElementById;
var div = getId('div1');
```

## Function.prototype.call 与 Function.prototype.apply

* JavaScript 的参数在内部就是用一个数组来表示，从这个意义上来说，apply 比 call 使用率更高
* call 是包装在 apply 上面的一颗语法糖
* 如果传入第一个参数是 `null` 函数体内 `this` 会指向默认宿主对象 `global`
  * 严格模式下，函数体内 `this` 还是为 `null`

```javascript
// 模拟 Function.prototype.bind
Function.prototype.bind = function () {
  // 保存原函数
  const self = this;
  // 需绑定的 this 上下文
  const context = [].shift.call(arguments);
  // 剩余的参数转为数组
  const args = [].slice.call(arguments);
  return function () {
    // 合并两次分别传入的参数作为新函数的参数
    return self.apply(context, [].concat(args, [].slice.call(arguments)));
  };
};
```

