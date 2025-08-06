import {useCallback, useEffect, useRef} from "react";

/**
 * J'ai utilisé un hook personnalisé pour ne pas rajouter de dépendence en plus (lodash.debounce).
 * J'aurais très bien pu utiliser le hook ici directement que je trouve un peu plus propre https://usehooks-ts.com/react-hook/use-debounce-callback
 * @param callback
 * @param delay
 */
export function useDebounceCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}
