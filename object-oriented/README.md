# 面向对象的 JavaScript

## 鸭子类型

> 鸭子类型（duck typing）
>
> 如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子。
>
> 鸭子类型指导我们只关注*对象的行为*，而不关注对象本身。

|分类|静态类型语言|动态类型语言|
|---|---|---|
|优点|编译时就能发现类型不匹配错误，编译器针对程序进行优化|编写代码量更少，更专注于业务逻辑|
|缺点|类型声明增加代码，分散程序员专注业务思考的精力|无法保证变量类型|

示例代码

```javascript
var duck = {
  duckSinging: function () {
    console.log('嘎嘎嘎');
  }
};
var chicken = {
  duckSinging: function () {
    console.log('嘎嘎嘎');
  }
};
var choir = []; // 合唱团
var joinChoir = function (animal) {
  if (animal && typeof animal.duckSinging === 'function') {
    choir.push(animal);
    console.log('恭喜加入合唱团');
    console.log('合唱团已有成员数量:' + choir.length);
  }
};

joinChoir( duck ); // 恭喜加入合唱团
joinChoir( chicken ); // 恭喜加入合唱团
```

### 面向接口编程

> 面向实现编程，变量指向特定类的实例，有一种强烈的依赖关系，会大大抑制编程的灵活性和可复用性。
>
> 面向接口编程，客户无需知道他们使用对象的特定类型，只需对象有客户所期望的接口（方法）。
>
> 面向接口编程，而不是面向实现编程。

## 多态

> polymorphism
>
> 同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。
>
> 多态思想实际上是把『做什么』和『谁去做』分离开来。

```javascript
var makeSound = function (animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  }
};
var Duck = function () {};
var Chicken = function () {};

makeSound(new Duck());
makeSound(new Chicken());
```

随着动物种类的增加，`makeSound` 函数就会变得越来越大。

多态思想是把不变的部分（动物都会叫）隔离出来，把可变的部分（具体怎么叫）封装起来。

```javascript
var makeSound = function (animal) {
  animal.sound();
};

var Duck = function () {};
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎');
};

var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log('咯咯咯');
};
```

### 使用继承获得多态效果

使用继承（*实现继承*和*接口继承*）来得到多态效果，是让对象表现出多态性的最常用手段。

### JavaScript的多态

由于JavaScript的变量类型在运行期间可变，没有类型检查的过程，不存在类型耦合，这意味着JavaScript对象的多态性是与生俱来的，不需要像JAVA通过向上转型（转型到超类）来实现多态。

### 多态在面向对象程序设计中的作用

利用对象的多态性，发布消息后，不必考虑各个对象接到消息后应该做什么（对象做什么不是临时决定的，而是事先定义为对象的一个方法，安装在对象内部），将行为分布在各个对象中，并让这些对象各自负责自己的行为，正是面向对象设计的优点。

## 封装

> 封装的目的是将信息隐藏，封装数据、封装实现、封装类型、封装变化。

### 封装数据

JavaScript由于不支持 `private`、`public`、`protected` 等关键字，只能通过变量作用域来实现封装特性。

```javascript
var myObject = (function () {
  var _name = 'foo'; // 私有变量
  return {
    getName: function () { // 公开方法
      return _name;
    }
  }
})();

console.log(myObject._name)     // 输出：undefined
console.log(myObject.getName()); // 输出：foo
// 在 ES6 中可以通过 symbol 创建私有属性
```

### 封装实现

封装使得对象内部的变化对其他对象而言是不可见的，对象对自己行为负责，其他对象或用户不关心它的内部实现，封装使得对象之间*松耦合*，对象之间只通过暴露的API来通信。

### 封装类型

JavaScript 并没有对抽象类和接口的支持

### 封装变化

把系统中稳定不变的部分和容易变化的部分隔离开来，在系统演变过程中，只需要替换那些容易变化的部分，如果这些部分是已经封装好的，替换起来也相对容易。

## 原型模式

原型模式不单是一种设计模式，也被称为一种编程泛型。我们不再关心对象的具体类型，而是找到一个对象，通过克隆创建一个一模一样的对象。

```javascript
Object.create = Object.create || function (obj) {
  var F = function () {};
  F.prototype = obj;
  return new F();
}
```

> 基于原型链的委托机制就是原型继承的本质。

### JavaScript中的原型继承

* 对象的构造函数有原型
* 对象把请求委托给它的构造器的原型
* JavaScript的函数既可以作为普通函数被调用，也可以作为*构造器*被调用。

在 Chrome 和 Firefox 等向外暴露了对象 `__proto__` 属性的浏览器下，我们可以通过下面这段代码来理解 `new` 运算的过程：

```javascript
function Person (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

var objectFactory = function(){
  var obj = new Object(); // 从 Object.prototype 上克隆一个空的对象
  var Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是 Person
  obj.__proto__ = Constructor.prototype; // 指向正确的原型
  var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给 obj 设置属性
  return typeof ret === 'object' ? ret : obj; // 确保构造器总是会返回一个对象
};

var a = objectFactory(Person, 'sven');

console.log(a.name); // 输出：sven
console.log(a.getName()); // 输出：sven
console.log(Object.getPrototypeOf( a ) === Person.prototype); // 输出：true
```

原型链并不是无限长的，最后 `Object.prototype.__proto__` 是 `null`，说明原型链后面已经没有了别的节点。

```javascript
//下面的代码是我们最常用的原型继承方式：
var obj = { name: 'foo' };
var A = function () {};
A.prototype = obj;
var a = new A();
console.log(a.name); // 输出：foo

//当我们期望得到一个“类”继承自另外一个“类”的效果时，往往会用下面的代码来模拟实现：
var A = function () {};
A.prototype = { name: 'foo' };
var B = function () {};
B.prototype = new A();
var b = new B();
console.log(b.name); // 输出：foo
```

## 结语

设计模式在很多时候其实都体现了语言的不足之处。

> 设计模式是对语言不足的补充，如果要使用设计模式，不如去找一门更好的语言。
>
> Peter Norving