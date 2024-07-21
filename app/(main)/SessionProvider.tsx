"use client";

import { Session, User } from "lucia";
import React, { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const Sessioncontext = createContext<SessionContext | null>(null);

const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) => {
  return (
    <Sessioncontext.Provider value={value}>{children}</Sessioncontext.Provider>
  );
};

export default SessionProvider;

export function useSession() {
  const context = useContext(Sessioncontext);
  if (!context) {
    throw new Error("useSession must be used within a session provider");
  }
  return context;
}
