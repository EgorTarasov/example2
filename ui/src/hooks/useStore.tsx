import { rootStoreContext } from "@/stores";
import { useContext } from "react";

export const useStores = () => useContext(rootStoreContext);