import Stepper from "../../components/Stepper";
import { useState } from "react";
import SliderPlans from "../../components/SliderPlans";
import { usePlanStore } from "../../store/plan.store";
import { calculateAge } from "../../utils/calcAge";
import { Navigate, useNavigate } from "react-router-dom";
import CardCotizacion from "../../components/Card/CardCotizacion";
import { useGetPlans } from "../../hooks/useGetPlans";

const PlansPage = () => {
  const navigate = useNavigate();
  const user = usePlanStore((state) => state.user);
  const logout = usePlanStore((state) => state.logout);

  const [edad] = useState(calculateAge(user?.birthDay || ""));
  const { plans, getPlans, isLoading } = useGetPlans();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    getPlans({ edad, selectedValue });
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stepper path="/" />

      <div className="py-8 md:py-10">
        <div className="max-w-5xl mx-auto flex flex-col px-5  md:px-10">
          <button
            type="button"
            className="hidden md:flex items-center justify-start hover:underline decoration-[#4F4FFF]  w-0 bg-red-500 cursor-pointer mb-6"
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
          >
            <div className="border-2 border-[#4F4FFF] rounded-full w-[20px] min-w-[20px] h-[20px] grid place-content-center text-[8px] text-[#4F4FFF]">
              <svg
                aria-hidden="true"
                focusable={false}
                data-prefix="fas"
                data-icon="chevron-left"
                className="w-2.5 h-2.5 stroke-[#4F4FFF]"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                />
              </svg>
            </div>
            <div className="text-[#4F4FFF] text-lg font-bold ml-[8px]">
              Volver
            </div>
          </button>

          <div className="">
            <div className="w-full md:w-8/12  mx-auto text-start md:text-center">
              <h2 className="font-bold text-[28px] md:text-[40px] tracking-[-.6px] leading-[36px] md:leading-[48px]">
                {user?.name} ¿Para quién deseas cotizar?
              </h2>
              <h3 className="text-base tracking-[.1px] leading-7 text-[#141938] mt-[8px] font-sans">
                Selecciona la opción que se ajuste más a tus necesidades.
              </h3>
            </div>
          </div>

          <CardCotizacion handleOptionChange={handleOptionChange} />
          {isLoading && <p>Cargando planes...</p>}
          {plans.length > 0 && <SliderPlans plans={plans} />}
        </div>
      </div>
    </>
  );
};
export default PlansPage;
