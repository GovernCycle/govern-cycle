import { User } from "@app/declarations/db/db.did";
import { createContext } from "react";

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);