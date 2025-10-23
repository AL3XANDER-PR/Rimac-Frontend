import Stepper from "../../components/Stepper";

import IcUsers from "../../assets/icons/IcUsers.svg";
// import { usePlanStore } from "../../store/plan.store";
import { Link, Navigate } from "react-router-dom";
import { usePlanContext } from "../../context/PlanContext";

import "./SummaryPage.scss";

function SummaryPage() {
  // Estadp con zustand
  // const user = usePlanStore((state) => state.user);
  // const plan = usePlanStore((state) => state.plan);

  // estados con context api
  const {
    state: { user, plan },
  } = usePlanContext();

  if (!user || !plan) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stepper completed={true} path="/plans" className="summary__stepper" />

      <div className="summary">
        <div className="summary__container">
          <Link to="/plans" className="summary__back">
            <div className="summary__back-icon">
              <svg
                aria-hidden="true"
                focusable={false}
                data-prefix="fas"
                data-icon="chevron-left"
                className="summary__chevron"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192
                     c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8
                     0-45.3L77.3 256 246.6 86.6c12.5-12.5
                     12.5-32.8 0-45.3s-32.8-12.5-45.3
                     0l-192 192z"
                />
              </svg>
            </div>
            <div className="summary__back-text">Volver</div>
          </Link>

          <div className="summary__header">
            <h2 className="summary__title">Resumen del seguro</h2>
          </div>

          <div className="summary__card">
            <div className="summary__label">Precios calculados para:</div>

            <div className="summary__user">
              <img alt="" src={IcUsers} />
              <div className="summary__user-name">
                {user?.name} {user?.lastName}
              </div>
            </div>

            <div className="summary__divider" />

            <div className="summary__section-title">Responsable de pago</div>
            <div className="summary__text">
              {user?.documentType}: {user?.documentNumber}
            </div>
            <div className="summary__text">Celular: {user?.celular}</div>

            <div className="summary__section-title">Plan elegido</div>
            <div className="summary__text">{plan?.name}</div>
            <div className="summary__text">
              Costo del Plan: ${plan?.price} al mes
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SummaryPage;
