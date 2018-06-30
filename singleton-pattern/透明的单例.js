const OnlyDiv = (function () {
  let instance;
  const CreateDiv = function (html) {
    if (instance){
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  };
  CreateDiv.prototype.init = function () {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();

const a = new OnlyDiv('foo');
const b = new OnlyDiv('bar');
console.log(a === b); // true
