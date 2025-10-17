import Stepper from "../../components/Stepper";

import IcUsers from "../../assets/IcUsers.svg";
import { usePlanStore } from "../../store/plan.store";
import { Link, Navigate } from "react-router-dom";

function SummaryPage() {
  const user = usePlanStore((state) => state.user);
  const plan = usePlanStore((state) => state.plan);

  if (!user || !plan) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stepper completed={true} path="/plans" />

      <div className="py-5 md:py-10 ">
        <div className="max-w-5xl mx-auto flex flex-col px-5  md:px-10 ">
          <Link
            to="/plans"
            className="md:inline-flex items-center hide-for-mobile hover:underline decoration-[#4F4FFF] hidden "
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
          </Link>

          <div className="content__info mt-8 mb-8 text-center md:text-start">
            <h2 className="font-bold text-3xl md:text-[40px] tracking-[-.6px] leading-[48px] ">
              Resumen del seguro
            </h2>
          </div>
          <div className="content__block py-[24px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px]">
            <div className="uppercase text-[#141938] text-[10px] leading-[16px] tracking-[.8px] font-black">
              Precios calculados para:
            </div>
            <div className="flex items-center gap-[12px] mt-[8px]">
              <img alt="" src={IcUsers} />
              <div className="text-xl font-black tracking-[-.2px] text-[#141938]">
                {user?.name} {user?.lastName}
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#D7DBF5] my-[16px]" />
            <div className="text-base font-black tracking-[.2px] text-[#141938] mt-[8px]">
              Responsable de pago
            </div>
            <div className="text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[#141938]">
              {user?.documentType}: {user?.documentNumber}
            </div>
            <div className="text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[#141938]">
              Celular: {user?.celular}
            </div>
            <div className="text-base font-black tracking-[.2px] text-[#141938] mt-[16px]">
              Plan elegido
            </div>
            <div className="text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[#141938]">
              {plan?.name}
              {/* <pre>{JSON.stringify(plan, null, 2)}</pre> */}
            </div>
            <div className="text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[#141938]">
              Costo del Plan: ${plan?.price} al mes
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SummaryPage;
