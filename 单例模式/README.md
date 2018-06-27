# 单例模式

## 使用闭包封装私有变量

```javascript
var user = (function(){
  var __name = 'sven',
      __age = 29;
  return {
    getUserInfo: function(){
      return __name + '-' + __age;
    }
  }
})();
```
