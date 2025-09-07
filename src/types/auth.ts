export interface User {
  name: string;
  email: string;
}
export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
