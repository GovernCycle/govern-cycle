import { createContext, useState, useContext } from 'react';
import { User } from '@app/declarations/home/home.did';

// Define las propiedades del contexto de usuario
interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Inicializa el UserContext
export const UserContext = createContext<UserContextProps | null>(null);

// Hook para usar el UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};