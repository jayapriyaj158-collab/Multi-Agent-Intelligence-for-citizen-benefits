import React, { createContext, useContext, useState, useEffect } from 'react';

interface SimpleModeContextType {
  isSimpleMode: boolean;
  toggleSimpleMode: () => void;
  setSimpleMode: (enabled: boolean) => void;
}

const SimpleModeContext = createContext<SimpleModeContextType | undefined>(undefined);

export const SimpleModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(() => {
    return localStorage.getItem('simple_mode') === 'true';
  });

  const toggleSimpleMode = () => {
    setIsSimpleMode((prev) => {
      const next = !prev;
      localStorage.setItem('simple_mode', String(next));
      return next;
    });
  };

  const setSimpleMode = (enabled: boolean) => {
    localStorage.setItem('simple_mode', String(enabled));
    setIsSimpleMode(enabled);
  };

  return (
    <SimpleModeContext.Provider value={{ isSimpleMode, toggleSimpleMode, setSimpleMode }}>
      {children}
    </SimpleModeContext.Provider>
  );
};

export const useSimpleMode = () => {
  const context = useContext(SimpleModeContext);
  if (!context) throw new Error('useSimpleMode must be used within SimpleModeProvider');
  return context;
};
