import { createContext } from "react";
import { IStore } from "./types";

export const PUNYSTORE_CONTEXT = createContext<IStore<any>>(null!);
