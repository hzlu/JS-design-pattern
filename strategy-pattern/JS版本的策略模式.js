// 函数也是对象，更简单和直接的做法是把strategy直接定义为函数
var strategies = {
  "S": function( salary ){
    return salary * 4;
  },
  "A": function( salary ){
    return salary * 3;
  },
  "B": function( salary ){
    return salary * 2;

  }
};

// 用函数充当Context来接受用户请求
var calculateBonus = function( level, salary ){
  return strategies[ level ]( salary );
};

console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000

