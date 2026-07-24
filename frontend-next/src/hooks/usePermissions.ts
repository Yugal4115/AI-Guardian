'use client';

export type UserRole =
  | 'VEHICLE_OWNER'
  | 'FLEET_MANAGER'
  | 'SERVICE_ENGINEER'
  | 'ADMINISTRATOR'
  | 'SUPER_ADMIN'
  | 'AUDITOR';

export type Permission =
  | 'VIEW_DASHBOARD'
  | 'RUN_DIAGNOSTICS'
  | 'EXPORT_REPORTS'
  | 'MANAGE_VEHICLES'
  | 'MANAGE_USERS'
  | 'ACCESS_ADMIN';

export function usePermissions(currentRole: UserRole = 'SUPER_ADMIN') {
  const hasPermission = (permission: Permission): boolean => {
    if (currentRole === 'SUPER_ADMIN' || currentRole === 'ADMINISTRATOR') return true;

    switch (permission) {
      case 'VIEW_DASHBOARD':
        return true;
      case 'RUN_DIAGNOSTICS':
        return currentRole === 'SERVICE_ENGINEER' || currentRole === 'VEHICLE_OWNER';
      case 'EXPORT_REPORTS':
        return currentRole !== 'AUDITOR';
      case 'MANAGE_VEHICLES':
        return currentRole === 'FLEET_MANAGER';
      default:
        return false;
    }
  };

  return {
    currentRole,
    hasPermission,
  };
}
