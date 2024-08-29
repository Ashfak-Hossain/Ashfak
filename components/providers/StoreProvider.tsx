'use client';

import { ReactNode, useRef } from 'react';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from '@/redux/store';

interface StoreProviderProps {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  //   useEffect(() => {
  //     if (!storeRef.current != null) {
  //       const unsubscribe = setupListeners(storeRef.current.dispatch);
  //       return unsubscribe;
  //     }
  //   }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
