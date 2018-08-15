'use strict'
const target = process.env.npm_lifecycle_event;
if (target == 'test') {
  //测试
  var obj = {
    NODE_ENV: '"production"',
    //post用当前域名
    API_ROOT: '"http://www.baidu.com"'
  }
}else {
  //线上
  var obj = {
    NODE_ENV: '"production"',
    //post用当前域名
    API_ROOT: '"http://www.google.com"'
  }
}
module.exports = obj;
                                  // module.exports = {
                                  //   NODE_ENV: '"production"'
                                  // }