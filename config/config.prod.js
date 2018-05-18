/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = app => {
  const exports = {
    proxy: {
      baseURL: 'http://106.15.230.173:8081', // 要代理到的后端的url
      proxyPath: '/api/v1' // 要代理的路径
    }
  };

  return exports;
};
