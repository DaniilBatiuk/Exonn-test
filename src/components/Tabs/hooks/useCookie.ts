import Cookies from "js-cookie";
import { useCallback, useState } from "react";

type UseCookieReturn<T> = [T, (newValue: T) => void, () => void];

export const useCookie = <T>(name: string, defaultValue: T): UseCookieReturn<T> => {
  const [value, setValue] = useState<T>(() => {
    const cookie = Cookies.get(name);
    if (cookie) {
      try {
        return JSON.parse(cookie) as T;
      } catch {
        return cookie as unknown as T;
      }
    }

    Cookies.set(name, JSON.stringify(defaultValue), {
      sameSite: "strict",
      expires: 30,
    });
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: T) => {
      Cookies.set(name, JSON.stringify(newValue), {
        sameSite: "strict",
        expires: 30,
      });
      setValue(newValue);
    },
    [name],
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(defaultValue);
  }, [name, defaultValue]);

  return [value, updateCookie, deleteCookie];
};
