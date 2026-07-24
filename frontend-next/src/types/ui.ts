import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}
