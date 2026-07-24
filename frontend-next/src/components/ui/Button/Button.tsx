'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden active:scale-[0.98]';

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-[#FFB800] to-[#FF8A00] text-black font-semibold shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:shadow-[0_0_30px_rgba(255,184,0,0.6)] hover:brightness-110 border border-amber-400/30',
      secondary:
        'bg-[#111111] text-white hover:bg-[#1A1A1A] border border-white/10 hover:border-amber-500/40 shadow-sm',
      glass:
        'bg-white/[0.05] backdrop-blur-md text-white border border-white/10 hover:border-amber-500/50 hover:bg-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
      ghost:
        'bg-transparent text-gray-300 hover:text-white hover:bg-white/[0.05]',
      danger:
        'bg-[#FF4D4F] text-white font-semibold hover:bg-red-600 shadow-[0_0_15px_rgba(255,77,79,0.4)]',
    };

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3.5 gap-3 tracking-wide',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
