import { SetStateAction, useEffect, useState } from "react";
import { localStorageImpl } from "../lib/utils";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(defaultValue);

  const handleSetValueWithStorage = (action: SetStateAction<T>) => {
    setValue((prevValue) => {
      let newState: T;
      if (typeof action === "function") {
        // Allow value to be a function so we have the same API as useState
        newState = (action as (prevValue: T) => T)(prevValue);
      } else {
        newState = action;
      }
      localStorageImpl.save(key, newState);
      return newState;
    });
  };

  // Use useEffect to prevent hydration errors with localStorage.
  useEffect(() => {
    let initial = defaultValue;
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      initial = JSON.parse(saved) as T;

      if (saved !== JSON.stringify(defaultValue)) {
        setValue(initial);
      }
    } else {
      localStorage.setItem(key, JSON.stringify(initial));
    }

    const onStorage = (event: StorageEvent) => {
      const { newValue } = event;
      if (event.key !== key) return;

      if (newValue) {
        const valueParse = JSON.parse(newValue);
        setValue(valueParse);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, handleSetValueWithStorage] as const;
}
