"use client";

import React from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const Context = React.createContext<{user: User | null, loading: boolean}>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, isLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      isLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ user: user, loading: loading }}>
      {children}
    </Context.Provider>
  )
}

export function useAuth() {
  const user = React.useContext(Context);

  if (user === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return user;
}