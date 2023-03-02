const { Role, Permission } = require('../../api/models');
const { createRole } = require('../../api/services/role.services');

const { ROLES, DEFAULT_PERMISSIONS } = require('../userPermission');

module.exports = async () => {
  // Create default roles
  ROLES.forEach(async ({ name, description, key }) => {
    const role = await Role.findOne({ name, key });
    if (!role) {
      await createRole(name, description, key);
    }
  });

  // Update default permissions
  DEFAULT_PERMISSIONS.forEach(async ({ roleKey, permissions }) => {
    await Permission.deleteMany({ roleKey });
    await Promise.all(permissions.map((permissionInfo) => {
      const permission = new Permission({
        roleKey,
        method: permissionInfo.method,
        path: permissionInfo.path,
        isExactly: permissionInfo.isExactly,
      });
      return permission.save();
    }));
  });
};
