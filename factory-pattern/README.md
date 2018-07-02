# 工厂模式

定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类，该模式使实例化延迟到子类中发生。

不暴露创建对象的具体逻辑，而是将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。工厂模式根据抽象程度的不同可以分为：

* 简单工厂模式
* 工厂方法模式
* 抽象工厂模式

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

## 简单工厂模式

使用 ES6 的 `static` 关键字将简单工厂封装到类的静态方法中。

```javascript
//User类
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case 'superAdmin':
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
        break;
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
        break;
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
```

## 工厂方法模式

```javascript
// 安全模式创建的工厂方法函数
let UserFactory = function(role) {
  if(this instanceof UserFactory) {
    var s = new this[role]();
    return s;
  } else {
    return new UserFactory(role);
  }
}

// 工厂方法函数的原型中设置所有对象的构造函数
UserFactory.prototype = {
  SuperAdmin: function() {
    this.name = "超级管理员",
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
  },
  Admin: function() {
    this.name = "管理员",
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
  },
  NormalUser: function() {
    this.name = '普通用户',
    this.viewPage = ['首页', '通讯录', '发现页']
  }
}

// 调用
let superAdmin = UserFactory('SuperAdmin');
let admin = UserFactory('Admin');
let normalUser = UserFactory('NormalUser');
```

### ES6 重写工厂方法模式

> `new.target` 指向直接被 `new` 执行的构造函数

```javascript
class User {
  constructor(name = '', viewPage = []) {
    if(new.target === User) {
      throw new Error('抽象类不能实例化!');
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case 'superAdmin':
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理']);
        break;
      case 'admin':
        return new UserFactory('普通用户', ['首页', '通讯录', '发现页']);
        break;
      case 'user':
        return new UserFactory('普通用户', ['首页', '通讯录', '发现页']);
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');
```

## 抽象工厂模式

于简单工厂、工厂方法模式不同，抽象工厂模式不直接生成实例，而是类的继承进行类的管理。

```javascript
let AccountAbstractFactory = function (subType, superType) {
  //判断抽象工厂中是否有该抽象类
  if(typeof AccountAbstractFactory[superType] === 'function') {
    //缓存类
    function F() {};
    //继承父类属性和方法
    F.prototype = new AccountAbstractFactory[superType] ();
    //子类原型继承父类
    subType.prototype = new F();
    //将子类的constructor指向子类
    subType.prototype.constructor = subType;
  } else {
    throw new Error('抽象类不存在!')
  }
}

//微信用户抽象类
AccountAbstractFactory.WechatUser = function() {
  this.type = 'wechat';
}
AccountAbstractFactory.WechatUser.prototype = {
  getName: function() {
    return new Error('抽象方法不能调用');
  }
}

//普通微信用户子类
function UserOfWechat(name) {
  this.name = name;
  this.viewPage = ['首页', '通讯录', '发现页']
}
//抽象工厂实现WechatUser类的继承
AccountAbstractFactory(UserOfWechat, 'WechatUser');
//子类中重写抽象方法
UserOfWechat.prototype.getName = function() {
  return this.name;
}

//实例化微信用户
let wechatUserA = new UserOfWechat('微信小李');
console.log(wechatUserA.getName(), wechatUserA.type); //微信小李 wechat
let wechatUserB = new UserOfWechat('微信小王');
console.log(wechatUserB.getName(), wechatUserB.type); //微信小王 wechat
```
