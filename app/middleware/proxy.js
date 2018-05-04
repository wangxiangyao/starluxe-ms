module.exports = (options, app) => {
  return async function proxy(ctx, next) {
    const { method, path, header } = ctx;
    if (path.includes(options.proxyPath)) {
      let query;
      let data;
      const { authorization } = header;
      if (method === 'GET') {
        data = ctx.query;
      } else {
        data = ctx.body;
      }
      const result = await app.curl(`${options.baseURL}${path}`, {
        header: {
          authorization
        },
        method,
        data,
      });
      const proxyData = JSON.parse(result.data.toString('utf8'));
      ctx.status = proxyData.code;
      if (proxyData.code >= 200 && proxyData.code < 300) {
        ctx.body = proxyData.data;
      } else {
        ctx.body = {
          code: proxyData.code,
          message: proxyData.message
        };
      }
    } else {
      await next();
    }
  };
};

// function checkSuccess(result) {
//   if (result.status !== 200) {
//     const errorMsg = result.data && result.data.error
//   }
// }