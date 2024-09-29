import { toast } from "react-toastify";

export const handleErrorApi = ({ error, duration }: { error: any; duration?: number }) => {
  if (false) {
    error.payload.errors.forEach((item: any) => {
      //
    });
  } else {
    toast.error("Something went wrong");
  }
};

export const localStorageImpl = {
  save: <T>(key: string, value: T) => {
    const stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
    dispatchStorageEvent(key, stringifyValue);
  },

  load: <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  remove: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
    dispatchStorageEvent(key, null);
  },
};

export const dispatchStorageEvent = (key: string, newValue: string | null) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};
