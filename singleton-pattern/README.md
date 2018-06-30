# 单例模式

保证一个类只有一个实例（单例），通过接口访问该单例。

适用场景为：应用当且仅当需要唯一的实例，此外，该示例仅当用到时才去初始化。

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
