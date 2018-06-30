# 发布订阅模式

发布订阅模式又称为观察者模式，它定义对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知。

## 实现

1. 首先要指定好谁充当发布者（比如售楼处）;
2. 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）；
3. 最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，依次发短信）。

## 能力

建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里，这些包装函数将被存入堆栈中，等到终于有对象订阅此事件的时候，我们才遍历堆栈并且依次执行这些包装函数，也就是重新发布里面的事件。
离线事件的生命周期只有一次。

```javascript
// 发布者
function Publisher() {
  this.listeners = [];
}

Publisher.prototype = {
  'addListener': function(listener) {
    this.listeners.push(listener);
  },
  'removeListener': function(listener) {
    delete this.listeners[listener];
  },
  'notify': function(obj) {
    for(let i = 0; i < this.listeners.length; i += 1) {
      let listener = this.listeners[i];
      if (typeof listener !== 'undefined') {
        listener.process(obj);
      }
    }
  }
};

// 订阅者
function Subscriber() {
}

Subscriber.prototype.process = function (obj) {
  console.log(obj);
};

const publisher = new Publisher();
publisher.addListener(new Subscriber());
publisher.addListener(new Subscriber());
publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者
```
