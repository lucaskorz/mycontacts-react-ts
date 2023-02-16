import { useState, useCallback } from "react";
import useIsMounted from "./useIsMounted";

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted()

  const runSafeAsyncAction = useCallback((callback: Function) => {
    if (isMounted()) callback()
  }, [])

  return runSafeAsyncAction
}
