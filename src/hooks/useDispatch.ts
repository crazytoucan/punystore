import { useContext } from "react";
import { TINYSTORE_CONTEXT } from "../const";

export function useDispatch() {
  const store = useContext(TINYSTORE_CONTEXT);
  return store.dispatch;
}

export function createUseDispatch<TDISPATCH extends (action: any) => void>() {
  return useDispatch as () => TDISPATCH;
}
