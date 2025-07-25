import React, { createContext, useCallback, useContext, useState } from 'react';

interface LinkStatusContextType {
  pendingPathName: string | null;
  setPendingPathName: (path: string | null) => void;
}

const LinkStatusContext = createContext<LinkStatusContextType | undefined>(
  undefined,
);

export const LinkStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pendingPathName, setPendingPathName] = useState<string | null>(null);
  const setPending = useCallback(
    (path: string | null) => setPendingPathName(path),
    [],
  );
  return (
    <LinkStatusContext.Provider
      value={{ pendingPathName, setPendingPathName: setPending }}
    >
      {children}
    </LinkStatusContext.Provider>
  );
};

export const useLinkStatusContext = () => {
  const ctx = useContext(LinkStatusContext);
  if (!ctx)
    throw new Error(
      'useLinkStatusContext must be used within LinkStatusProvider',
    );
  return ctx;
};
