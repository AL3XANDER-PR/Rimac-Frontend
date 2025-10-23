export interface User {
  name: string;
  lastName: string;
  birthDay: string;
  celular?: string;
  documentType?: string;
  documentNumber?: string;
  // puedes agregar más campos según tu backend
}

export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
  precioAnterior?: number;
}

export interface PlanState {
  user: User | null;
  plan: Plan | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setPlan: (plan: Plan) => void;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
}
