// 把校验逻辑封装成策略对象
var strategies = {
  isNonEmpty: function( value, errorMsg ){ // 不为空
    if ( value === '' ){
      return errorMsg ;
    }
  },
  minLength: function( value, length, errorMsg ){ // 限制最小长度
    if ( value.length < length ){
      return errorMsg;
    }
  },
  isMobile: function( value, errorMsg ){ // 手机号码格式
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
      return errorMsg;
    }
  }
};

// Validator 类在这里作为context，负责接收用户的请求并委托给strategy对象
var Validator = function(){
  this.cache = []; // 保存校验规则
};

// 通过add方法往validator对象中添加一些检验规则
Validator.prototype.add = function( dom, rule, errorMsg ){
  var ary = rule.split( ':' ); // 把strategy 和参数分开
  this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入cache
    var strategy = ary.shift(); // 用户挑选的strategy
    ary.unshift( dom.value ); // 把input 的value 添加进参数列表
    ary.push( errorMsg ); // 把errorMsg 添加进参数列表
    return strategies[ strategy ].apply( dom, ary );
  });
};

// 启动检验
Validator.prototype.start = function(){
  for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
    var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
    if ( msg ){ // 如果有确切的返回值，说明校验没有通过
      return msg;
    }
  }
};

/*
 * 用户通过validateFunc向validator类发送请求
 */
var validataFunc = function(){
  var validator = new Validator(); // 创建一个validator 对象
  /***************添加一些校验规则****************/
  validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
  validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6 位' );
  validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );
  var errorMsg = validator.start(); // 获得校验结果
  return errorMsg; // 返回校验结果
}

var registerForm = document.getElementById( 'registerForm' );

registerForm.onsubmit = function(){
  var errorMsg = validataFunc(); // 如果errorMsg 有确切的返回值，说明未通过校验
  if ( errorMsg ){
    alert ( errorMsg );
    return false; // 阻止表单提交
  }
};

