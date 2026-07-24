export const PALETTE = {
  background: '#050505',
  surface: '#111111',
  card: 'rgba(255, 255, 255, 0.05)',
  primary: '#FFB800',
  secondary: '#FF8A00',
  success: '#00FF95',
  danger: '#FF4D4F',
  text: '#FFFFFF',
  muted: '#8B8B8B',
  border: 'rgba(255, 255, 255, 0.1)',
  borderGold: 'rgba(255, 184, 0, 0.25)',
} as const;

export const SPACING = {
  unit: 8,
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  xxl: '64px',
} as const;

export const FONTS = {
  heading: 'var(--font-space-grotesk), sans-serif',
  body: 'var(--font-inter), sans-serif',
  mono: 'var(--font-jetbrains-mono), monospace',
} as const;
