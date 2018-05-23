const Controller = require('egg').Controller;

class AppController extends Controller {
  async get() {
    const { ctx, service } = this;

    const permission = await service.permission.get(ctx.query.roles);

    ctx.status = 200;
    ctx.body = permission;
  }
}

module.exports = AppController;