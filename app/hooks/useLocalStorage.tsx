import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // this window object is not available on the SSR
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }

}

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  const setValueFnc = (value: T) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const item = window.localStorage.getItem(key)
    if (item) {
      setValue(JSON.parse(item))
    }

    const listenStorageChange = () => {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  return [value, setValueFnc] ;
}
