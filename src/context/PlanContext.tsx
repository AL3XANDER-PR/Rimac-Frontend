/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Plan, User } from "../types/types";

type Action =
  | { type: "SET_USER"; payload: any }
  | { type: "SET_PLAN"; payload: any }
  | { type: "SET_AUTH"; payload: boolean }
  | { type: "LOGOUT" };

export interface PlanState {
  user: User | null;
  plan: Plan | null;
  isAuthenticated: boolean;
}

const initialState: PlanState = {
  user: null,
  plan: null,
  isAuthenticated: false,
};

const PlanContext = createContext<{
  state: PlanState;
  setUser: (user: any) => void;
  setPlan: (plan: any) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}>({
  state: initialState,
  setUser: () => {},
  setPlan: () => {},
  setAuthenticated: () => {},
  logout: () => {},
});

function reducer(state: PlanState, action: Action): PlanState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "SET_PLAN":
      return { ...state, plan: action.payload };
    case "SET_AUTH":
      return { ...state, isAuthenticated: action.payload };
    case "LOGOUT":
      return { user: null, plan: null, isAuthenticated: false };
    default:
      return state;
  }
}

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const stored = localStorage.getItem("plan-storage-context");
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("plan-storage-context", JSON.stringify(state));
  }, [state]);

  const setUser = (user: any) => dispatch({ type: "SET_USER", payload: user });
  const setPlan = (plan: any) => dispatch({ type: "SET_PLAN", payload: plan });
  const setAuthenticated = (value: boolean) =>
    dispatch({ type: "SET_AUTH", payload: value });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <PlanContext.Provider
      value={{ state, setUser, setPlan, setAuthenticated, logout }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => useContext(PlanContext);
