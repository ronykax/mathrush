"use client";

import React from "react";

export type AppearanceMode = "light" | "dark";
const AppearanceContext = React.createContext<{ mode: AppearanceMode, changeMode(mode: AppearanceMode): void } | undefined>(undefined);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  // const fetchedMode: AppearanceMode = (localStorage.getItem("mode") as AppearanceMode) || "dark";
  const fetchedMode: AppearanceMode = "dark";
  const [mode, setMode] = React.useState<AppearanceMode>(fetchedMode);

  const changeMode = (mode: AppearanceMode) => {
    setMode(mode);
  }

  return (
    <AppearanceContext.Provider value={{ mode, changeMode }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = React.useContext(AppearanceContext);

  if (context === undefined) {
    throw new Error('useAppearance() must be used within an AppearanceProvider');
  }

  return context;
}