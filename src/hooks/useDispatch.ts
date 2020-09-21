import { useContext } from "react";
import { PUNYSTORE_CONTEXT } from "../const";

export function useDispatch() {
  const store = useContext(PUNYSTORE_CONTEXT);
  return store.dispatch;
}

export function createUseDispatch<TDISPATCH extends (action: any) => void>() {
  return useDispatch as () => TDISPATCH;
}
