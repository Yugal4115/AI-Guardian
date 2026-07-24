import { LayoutDashboard, Car, BrainCircuit, Network, Settings } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'overview', label: 'Overview', href: '/dashboard/overview', iconName: 'LayoutDashboard' },
  { id: 'vehicle', label: 'Vehicle', href: '/dashboard/vehicle', iconName: 'Car' },
  { id: 'guardian-ai', label: 'Guardian AI', href: '/dashboard/guardian-ai', iconName: 'BrainCircuit' },
  { id: 'ecosystem', label: 'Ecosystem', href: '/dashboard/ecosystem', iconName: 'Network' },
  { id: 'settings', label: 'Settings', href: '/dashboard/settings', iconName: 'Settings' },
];
