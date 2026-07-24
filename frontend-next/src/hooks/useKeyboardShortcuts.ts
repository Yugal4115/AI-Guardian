'use client';

import { useState, useEffect } from 'react';

export function useKeyboardShortcuts() {
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isShortcutsHelpOpen, setIsShortcutsHelpOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMetaOrCtrl = e.metaKey || e.ctrlKey;

      if (isMetaOrCtrl && e.key === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      } else if (isMetaOrCtrl && e.key === '/') {
        e.preventDefault();
        setIsShortcutsHelpOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsCmdPaletteOpen(false);
        setIsShortcutsHelpOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isCmdPaletteOpen,
    setIsCmdPaletteOpen,
    isShortcutsHelpOpen,
    setIsShortcutsHelpOpen,
  };
}
