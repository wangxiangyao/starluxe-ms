module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const dataManageMenu = new Schema({
    member: Boolean,
    order: Boolean,
    commodity: Boolean
  });

  const dataAnalyseMenu = new Schema({
    member: Boolean,
    order: Boolean,
    commodity: Boolean
  });

  const menuPermission = new Schema({
    home: Boolean,
    dataManage: dataManageMenu,
    dataAnalyse: dataAnalyseMenu
  });

  const PermissionSchema = new Schema({
    role: { type: String },
    menu: menuPermission
  });

  return mongoose.model('Permission', PermissionSchema, 'permission');
};
