# 工厂模式

定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类，该模式使实例化延迟到子类中发生。

例子 1

```javascript
const CarFactory = (function () {
  const Car = function (model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  };
  return function (model, year, miles) {
    return new Car(model, year, miles);
  };
})();
const bmw = new CarFactory('BMW', 2009, 20000);
const benz = new CarFactory('Benz', 2010, 5000);
```

例子 2

```javascript
const productManager = {};
productManager.createProductA = function () {
  console.log('ProductA');
}
productManager.createProductB = function () {
  console.log('ProductB');
}
productManager.factory = function (typeType) {
  return new productManager[typeType];
}
productManager.factory("createProductA");
productManager.factory("createProductB");
```