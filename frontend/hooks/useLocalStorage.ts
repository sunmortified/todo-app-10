'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') {
      return JSON.stringify(initialValue);
    }

    const storedValue = window.localStorage.getItem(key);

    return storedValue ?? JSON.stringify(initialValue);
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          callback();
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    },
    [key]
  );

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const value = JSON.parse(storedValue) as T;

  const setValue = (newValue: T) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));

    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
      })
    );
  };

  return [value, setValue] as const;
}