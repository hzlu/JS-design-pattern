# 策略模式

## 定义

* 定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换。
* 将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式的目的就是将算法的使用和算法的实现分离开来。

## 实现

一个基于策略模式的程序至少由两部分组成：

* 第一部分是一组策略类
  * 策略类封装了具体的算法
  * 负责具体的计算过程

* 第二部分是环境类 context
  * context 接受客户的请求
  * 把请求委托给某一个策略类
  * context 要维持对某个策略对象的引用

## 多态在策略模式中的体现

每个策略对象负责的算法已被各自封装在对象内部。当我们对这些策略对象发出请求时，它们会返回不同的计算结果，这正是对象多态性的体现。

『它们可以互相替换』替换 context 中当前保存的策略对象，便能执行不同的算法来得到我们想要的结果。

## 封装更广义的『算法』

从定义上看，策略模式就是用来封装算法的。通常会把算法的含义扩散开来，使策略模式也可以用来封装一系列的『业务规则』。只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们。

## 示例

```javascript
const strategies = {
  'S': function (salary) {
      return salary * 4;
  },
  'A': function (salary) {
      return salary * 3;
  },
  'B': function (salary) {
      return salary * 2;
  },
};

const calculateBonus = function (level, salary) {
  return strategies[level](salary);
}

calculateBonus('A', 10000);
```
