const MyApp = {};

MyApp.namespace = function (name) {
  const parts = name.split('.');
  let current = MyApp;
  for (let part of parts){
    if (!current[part]){
      current[part] = {};
    }
    current = current[part];
  }
};

MyApp.namespace('event');
MyApp.namespace('dom.style');
MyApp.namespace('foo.bar.baz');

console.dir(MyApp);

// 上述代码等价于：
// const MyApp = {
//   event: {},
//   dom: {
//     style: {}
//   }
// };
