import { User } from "@app/declarations/home/home.did";

export const loadUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) as User : null;
  }
  return null; // En el servidor, no hay acceso a localStorage
};

export const saveUserToStorage = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const clearUserFromStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('user');
  }
};
