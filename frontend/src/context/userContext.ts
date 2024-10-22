import { User } from "@app/declarations/home/home.did";
import { createContext } from "react";

export interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}

export const defaultUser: User = {
  state: { 'Rejected' : null },
  name: '',
  email: '',
  phone: '',
  logo: '',
  role: [],
  jurisdiction: [],
  manager: [],
};

const defaultUserContext: UserContextProps = {
  user: defaultUser,
  setUser: () => {},
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);