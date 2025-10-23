import { useState } from "react";
import { fetchPlans } from "../service/fetchPlans";
import type { Plan } from "../types/types";
// import type { Plan } from "../types/types";

export const useGetPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);

  const getPlans = async ({
    edad,
    selectedValue,
  }: {
    edad: number;
    selectedValue: string;
  }) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un retraso de 1 segundo
      const response = await fetchPlans();
      if (!response) {
        setPlans([]);
      }

      const filteredData =
        selectedValue === "paraMi"
          ? response.list.filter((plan: Plan) => plan.age > edad)
          : response.list
              .filter((plan: Plan) => plan.age > edad)
              .map((plan: Plan) => {
                const precioAnterior = plan.price;
                const precioConDescuento = +(plan.price * 0.95).toFixed(2); // -5%

                return {
                  ...plan,
                  precioAnterior,
                  price: precioConDescuento,
                };
              });

      setPlans(filteredData);

      // setPlans(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    plans,
    isLoading,
    error,
    getPlans,
  };
};
