import { HTMLAttributes, ReactNode } from 'react';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  goldBorder?: boolean;
  hoverEffect?: boolean;
  className?: string;
}
