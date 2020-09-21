import * as React from "react";
import { PUNYSTORE_CONTEXT } from "./const";
import { IStore } from "./types";

interface IProps {
  store: IStore<any>;
}

export function Provider({ store, children }: React.PropsWithChildren<IProps>) {
  return <PUNYSTORE_CONTEXT.Provider value={store}>{children}</PUNYSTORE_CONTEXT.Provider>;
}
