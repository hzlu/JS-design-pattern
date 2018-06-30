/*
 * 缓动算法
 * 4个参数的含义：
 * 动画已消耗的时间、小球原始位置、小球目标位置、动画持续的总时间
 */
var tween = {
  linear: function( t, b, c, d ){
    return c*t/d + b;
  },
  easeIn: function( t, b, c, d ){
    return c * ( t /= d ) * t + b;
  },
  strongEaseIn: function(t, b, c, d){
    return c * ( t /= d ) * t * t * t * t + b;
  },
  strongEaseOut: function(t, b, c, d){
    return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
  },
  sineaseIn: function( t, b, c, d ){
    return c * ( t /= d) * t * t + b;
  },
  sineaseOut: function(t,b,c,d){
    return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
  }
};

// 接收一个参数，即将运动起来的dom节点
var Animate = function( dom ){
  this.dom = dom; // 进行运动的dom 节点
  this.startTime = 0; // 动画开始时间
  this.startPos = 0; // 动画开始时，dom 节点的位置，即dom 的初始位置
  this.endPos = 0; // 动画结束时，dom 节点的位置，即dom 的目标位置
  this.propertyName = null; // dom 节点需要被改变的css 属性名
  this.easing = null; // 缓动算法
  this.duration = null; // 动画持续时间
};

/*
 * 负责启动这个动画，在动画被启动的瞬间要记录一些信息，
 * 供缓动算法在以后计算小球当前位置的时候使用。
 * 此外，还要负责启动定时器
 * 4个参数：要改变的CSS属性名、小球运动的目标位置、动画持续时间、缓动算法
 */
Animate.prototype.start = function( propertyName, endPos, duration, easing ){
  this.startTime = +new Date; // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[ propertyName ]; // dom 节点初始位置
  this.propertyName = propertyName; // dom 节点需要被改变的CSS 属性名
  this.endPos = endPos; // dom 节点目标位置
  this.duration = duration; // 动画持续事件
  this.easing = tween[ easing ]; // 缓动算法
  var self = this;
  var timeId = setInterval(function(){ // 启动定时器，开始执行动画
    if ( self.step() === false ){ // 如果动画已结束，则清除定时器
      clearInterval( timeId );
    }
  }, 19 );
};

/*
 * 该方法代表小球运动的每一帧要做的事情
 * 此外，还要负责计算小球的当前位置
 * 调用更新CSS属性值的方法Animate.prototype.update
 */
Animate.prototype.step = function(){
  var t = +new Date; // 取得当前时间
  if ( t >= this.startTime + this.duration ){ // (1)
    this.update( this.endPos ); // 更新小球的CSS 属性值
    return false;
  }
  var pos = this.easing( t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration ); // pos 为小球当前位置
  this.update( pos ); // 更新小球的CSS 属性值
};

// 负责更新小球的CSS属性
Animate.prototype.update = function( pos ){
  this.dom.style[ this.propertyName ] = pos + 'px';
};

var div = document.getElementById( 'div' );
var animate = new Animate( div );
animate.start( 'left', 500, 1000, 'strongEaseOut' );
animate.start( 'top', 1500, 500, 'strongEaseIn' );

