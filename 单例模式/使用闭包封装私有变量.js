var user = (function(){
  var __name = 'sven',
      __age = 29;
  return {
    getUserInfo: function(){
      return __name + '-' + __age;
    }
  }
})();

