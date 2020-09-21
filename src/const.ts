import { createContext } from "react";
import { IStore } from "./types";

export const TINYSTORE_CONTEXT = createContext<IStore<any>>(null!);
