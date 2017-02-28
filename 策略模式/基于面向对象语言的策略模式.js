// 把每种绩效的计算规则封装在对应的策略类里面
var performanceS = function(){};
performanceS.prototype.calculate = function( salary ){
  return salary * 4;
};

var performanceA = function(){};
performanceA.prototype.calculate = function( salary ){
  return salary * 3;
};

var performanceB = function(){};
performanceB.prototype.calculate = function( salary ){
  return salary * 2;
};

//接下来定义奖金类Bonus(环境类Context)：
var Bonus = function(){
  this.salary = null; // 原始工资
  this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function( salary ){
  this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function( strategy ){
  this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function(){ // 取得奖金数额
  // 把计算奖金的操作委托给对应的策略对象
  return this.strategy.calculate( this.salary );
};

var bonus = new Bonus();
bonus.setSalary( 10000 );

// 设置策略对象
bonus.setStrategy( new performanceS() );
console.log( bonus.getBonus() ); // 输出：40000

// 设置策略对象
bonus.setStrategy( new performanceA() );
console.log( bonus.getBonus() ); // 输出：30000

