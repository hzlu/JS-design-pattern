const CreateDiv = function (html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

const ProxySingletonCreateDiv = (function(){
  let instance;
  return function (html) {
    if (!instance) {
      // 代理给 CreateDiv
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();

const a = new ProxySingletonCreateDiv('foo');
const b = new ProxySingletonCreateDiv('bar');

console.log(a === b);
