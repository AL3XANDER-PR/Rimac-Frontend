import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
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

interface PlanState {
  user: User | null;
  plan: Plan | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setPlan: (plan: Plan) => void;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      user: null,
      plan: null,

      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setPlan: (plan) => set({ plan }),

      setAuthenticated: (value) => set({ isAuthenticated: value }),

      logout: () => set({ user: null, plan: null, isAuthenticated: false }),
    }),
    {
      name: "plan-storage", // clave en localStorage
      partialize: (state) => ({
        user: state.user,
        plan: state.plan,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
