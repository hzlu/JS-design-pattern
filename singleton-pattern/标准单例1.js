const Singleton = function (name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = function (name) {
  if (!this.instance){
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const a = Singleton.getInstance('foo');
const b = Singleton.getInstance('bar');

a.getName(); // true
console.log(a === b); // true