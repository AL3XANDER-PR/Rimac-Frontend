import Stepper from "../../components/Stepper";
import { useState } from "react";
import SliderPlans from "../../components/SliderPlans";
// import { usePlanStore } from "../../store/plan.store";
import { calculateAge } from "../../utils/calcAge";
import { Navigate, useNavigate } from "react-router-dom";
import CardCotizacion from "../../components/Card/CardCotizacion";
import { useGetPlans } from "../../hooks/useGetPlans";
import { usePlanContext } from "../../context/PlanContext";
import { SkeletonPlans } from "../../components/skeleton/SkeletonPLans";

import "./PlansPage.scss";

const PlansPage = () => {
  const navigate = useNavigate();
  // const user = usePlanStore((state) => state.user);
  // const logout = usePlanStore((state) => state.logout);
  const { state, logout } = usePlanContext();

  const [edad] = useState(calculateAge(state.user?.birthDay || ""));
  const { plans, getPlans, isLoading } = useGetPlans();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    getPlans({ edad, selectedValue });
  };

  if (!state.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stepper path="/" />

      <div className="plans-page">
        <div className="plans-page__container">
          <button
            type="button"
            className="plans-page__back"
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
          >
            <div className="plans-page__back-icon">
              <svg
                aria-hidden="true"
                focusable={false}
                data-prefix="fas"
                data-icon="chevron-left"
                className="chevron-icon"
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
            <div className="plans-page__back-text">Volver</div>
          </button>

          <div className="plans-page__titles">
            <div className="plans-page__titles-inner">
              <h2>{state.user?.name} ¿Para quién deseas cotizar?</h2>
              <h3>Selecciona la opción que se ajuste más a tus necesidades.</h3>
            </div>
          </div>

          <CardCotizacion handleOptionChange={handleOptionChange} />
          {isLoading && <SkeletonPlans />}
          {plans.length > 0 && !isLoading && <SliderPlans plans={plans} />}
        </div>
      </div>
    </>
  );
};
export default PlansPage;
