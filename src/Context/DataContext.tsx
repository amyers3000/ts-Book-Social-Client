import { createContext } from "react";
import { Book } from "../App/models/book";

interface HandleSubmit {
    handleSubmit?: () =>void;
}

export const AppCtx = createContext<Book | null>(null);
export const Submit = createContext<HandleSubmit | null>(null);



