/* eslint-disable */
console.log('构建环境:', EASY_ENV_IS_DEV, EASY_ENV_IS_TEST, EASY_ENV_IS_PROD); // easywebpack 的全局变量

const host = EASY_ENV_IS_DEV ? 'http://star003.starluxe.cn:8081' :
  EASY_ENV_IS_TEST ? '' : 'http://106.15.230.173:8081';

const env = EASY_ENV_IS_DEV ? 'dev' :
  EASY_ENV_IS_TEST ? 'test' : 'prod';

/* eslint-enable */

// proxy 设置代理api地址

module.exports = {
  proxy: () => {

  },
  getBrands() {}
};
