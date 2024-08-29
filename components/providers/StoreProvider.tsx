'use client';

import { AppStore, makeStore } from '@/redux/store';
import { useRef } from 'react';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  readonly children: React.ReactNode;
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
