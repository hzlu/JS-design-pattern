# 职责链模式

职责链，一系列可能处理请求的对象连接成一条链，请求在这些对象之间依次传递，直到遇到一个可以处理它的对象

示例代码

```javascript
const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到100元优惠券');
  } else {
    order200(orderType, pay, stock);
  }
}

const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到50元优惠券');
  } else {
    orderNormal(orderType, pay, stock);
  }
}

const orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
}

order500(1, true, 500);
order500(1, false, 500);
order500(2, true, 500);
```