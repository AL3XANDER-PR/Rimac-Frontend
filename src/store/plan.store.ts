import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanState } from "../types/types";

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
