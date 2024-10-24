import { User } from "@app/declarations/home/home.did";
import { loadUserFromStorage, saveUserToStorage, clearUserFromStorage } from "@app/utils/storage";
import { createContext, useState, useEffect } from "react";

// Interfaz del contexto del usuario
export interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

// Usuario por defecto
export const defaultUser: User = {
  state: { Rejected: null },
  name: '',
  email: '',
  phone: '',
  logo: '',
  role: [],
  jurisdiction: [],
  manager: [],
};

// Estado inicial del contexto con carga desde localStorage
const defaultUserContext: UserContextProps = {
  user: loadUserFromStorage() || defaultUser,
  setUser: () => {},
  logout: () => {},
};

// Exportación del contexto
export const UserContext = createContext<UserContextProps>(defaultUserContext);

// Lógica para el manejo del usuario y localStorage
export const useUserState = (): UserContextProps => {
  const [user, setUser] = useState<User>(loadUserFromStorage() || defaultUser);

  useEffect(() => {
    saveUserToStorage(user);
  }, [user]);

  const logout = () => {
    setUser(defaultUser);
    clearUserFromStorage();
  };

  return { user, setUser, logout };
};