import {
  useEffect,
  useSyncExternalStore,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { localStorageImpl } from "../lib/utils";

const isFunction = <T,>(
  value: T | ((prevState: T) => T)
): value is (prevState: T) => T => typeof value === "function";

const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);

const localStorageSubscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const getSnapshot = () => getLocalStorageItem(key);
  const store = useSyncExternalStore(
    localStorageSubscribe,
    getSnapshot,
    () => null
  );

  const setState = useCallback(
    (v: SetStateAction<T>) => {
      try {
        let nextState;
        if (isFunction(v)) {
          const parsedStore = store ? JSON.parse(store) : null;
          nextState = (v as (prevValue: T) => T)(parsedStore ?? initialValue);
        } else {
          nextState = v;
        }

        if (nextState === undefined || nextState === null) {
          localStorageImpl.remove(key);
        } else {
          localStorageImpl.save(key, nextState);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [key, store, initialValue]
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      localStorageImpl.save(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
};

export default useLocalStorage;
