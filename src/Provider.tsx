import * as React from "react";
import { TINYSTORE_CONTEXT } from "./const";
import { IStore } from "./types";

interface IProps {
  store: IStore<any>;
}

export function Provider({ store, children }: React.PropsWithChildren<IProps>) {
  return <TINYSTORE_CONTEXT.Provider value={store}>{children}</TINYSTORE_CONTEXT.Provider>;
}
