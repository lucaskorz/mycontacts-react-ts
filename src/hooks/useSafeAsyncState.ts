import { useState, useCallback } from "react";
import useIsMounted from "./useIsMounted";

export default function useSafeAsyncState<T>(initialState: any) {
  const [state, setState] = useState(initialState)

  const isMounted = useIsMounted()

  const setSafeAsyncState = useCallback((data: unknown) => {
    if (isMounted()) setState(data)
  }, [])

  return [state, setSafeAsyncState];
}
