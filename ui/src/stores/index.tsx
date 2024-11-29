import { createContext } from "react";
import { rootStore } from "./RootStore";

export const rootStoreContext = createContext({
    rootStore: rootStore
})