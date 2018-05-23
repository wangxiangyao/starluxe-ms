const Service = require('egg').Service;

class PermissionService extends Service {
  async get(roles) {

    const { ctx } = this;
    const rolesArray = roles.split(',');

    const permissionArray = await Promise.all(rolesArray.map((item) => {
      return ctx.model.Permission.findOne({ role: item });
    }));
    let permissionMap = {}
    
    return permissionMap;
  }
}

module.exports = PermissionService;