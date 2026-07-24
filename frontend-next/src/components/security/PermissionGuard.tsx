'use client';

import React from 'react';
import { Permission, usePermissions, UserRole } from '@/hooks/usePermissions';

interface GuardProps {
  permission: Permission;
  role?: UserRole;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGuard: React.FC<GuardProps> = ({
  permission,
  role = 'SUPER_ADMIN',
  fallback = null,
  children,
}) => {
  const { hasPermission } = usePermissions(role);

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
