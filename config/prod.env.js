'use strict'
const target = process.env.npm_lifecycle_event;
if (target == 'online') {
  //测试
  var obj = {
    NODE_ENV: '"production"',
    //post用当前域名
    API_ROOT: '"https://api.ysjy.artreedu.com"'
  }
}else {
  //线上
  var obj = {
    NODE_ENV: '"production"',
    //post用当前域名
    API_ROOT: '"https://eduweixin.test.artreedu.com"'
  }
}
module.exports = obj;
                                  // module.exports = {
                                  //   NODE_ENV: '"production"'
                                  // }