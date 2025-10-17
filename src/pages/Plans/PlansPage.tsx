import IcProtectionLight from "../../assets/IcProtectionLight.svg";
import IcAddUserLight from "../../assets/IcAddUserLight.svg";
import Stepper from "../../components/Stepper";
import { useState } from "react";
import SliderPlans from "../../components/SliderPlans";
import { usePlanStore, type Plan } from "../../store/plan.store";
import { calculateAge } from "../../utils/calcAge";
import { Navigate, useNavigate } from "react-router-dom";

const PlansPage = () => {
  const navigate = useNavigate();
  const user = usePlanStore((state) => state.user);
  const logout = usePlanStore((state) => state.logout);

  const [plans, setPlans] = useState<Plan[]>([]);
  // const [tipoPlan, setTipoPlan] = useState("");
  const [edad] = useState(calculateAge(user?.birthDay || ""));

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    // setTipoPlan(selectedValue);

    fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredData =
          selectedValue === "paraMi"
            ? data.list.filter((plan: Plan) => plan.age > edad)
            : data.list
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
      })
      .catch((error) => {
        console.error("Error al obtener los planes:", error);
        setPlans([]);
      });
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stepper path="/" />

      <div className="py-5 md:py-10 ">
        <div className="max-w-5xl mx-auto flex flex-col px-5  md:px-10 ">
          <button
            type="button"
            className="md:inline-flex items-center hide-for-mobile hover:underline decoration-[#4F4FFF] hidden"
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
              <h2 className="font-medium md:font-semibold  text-3xl  md:text-[40px] tracking-[-.6px] leading-[48px]">
                {user?.name} ¿Para quién deseas cotizar?
              </h2>
              <h3 className="text-base tracking-[.1px] leading-7 text-[#141938] mt-[8px]">
                Selecciona la opción que se ajuste más a tus necesidades.
              </h3>
            </div>
          </div>

          <ul className="grid mx-auto w-full md:max-w-[544px] grid-cols-1 md:grid-cols-2  gap-8 mt-8 mb-10">
            <li className="relative">
              <input
                type="radio"
                id="paraMi"
                name="hosting"
                value="paraMi"
                className="hidden peer"
                required
                onChange={handleOptionChange}
              />
              <div className=" absolute top-5 right-5 flex self-end items-center justify-center w-6 h-6 rounded-full border border-gray-300 peer-checked:border-[#389E0D] peer-checked:bg-[#389E0D] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <label
                htmlFor="paraMi"
                className="inline-flex items-center justify-between w-full text-gray-500  border-gray-200  peer-checked:border-gray-900   cursor-pointer rounded-3xl  p-6 transition-all duration-300 shadow-[0_1px_32px_#aeacf359] border-2 pt-10 h-full"
              >
                <div className="flex flex-col items-start ">
                  <img className="select-none" alt="" src={IcProtectionLight} />
                  <div className="text-xl font-black tracking-[-.2px] text-[#141938] mt-[8px]">
                    Para mí
                  </div>
                  <div className="text-[12px] leading-5 tracking-[.2px] mt-[8px]">
                    Cotiza tu seguro de salud y agrega familiares si así lo
                    deseas.
                  </div>
                </div>
              </label>
            </li>
            <li className="relative">
              <input
                type="radio"
                id="paraAlguienMas"
                name="hosting"
                value="paraAlguienMas"
                className="hidden peer"
                required
                onChange={handleOptionChange}
              />
              <div className=" absolute top-5 right-5 flex self-end items-center justify-center w-6 h-6 rounded-full border border-gray-300 peer-checked:border-[#389E0D] peer-checked:bg-[#389E0D] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <label
                htmlFor="paraAlguienMas"
                className="inline-flex items-center justify-between w-full text-gray-500  border-gray-200  peer-checked:border-gray-900   cursor-pointer rounded-3xl  p-6 transition-all duration-300 shadow-[0_1px_32px_#aeacf359] border-2 pt-10 h-full"
              >
                <div className="flex flex-col items-start ">
                  <img className="select-none" alt="" src={IcAddUserLight} />
                  <div className="text-xl font-black tracking-[-.2px] text-[#141938] mt-[8px]">
                    Para alguien más
                  </div>
                  <div className="text-[12px] leading-5 tracking-[.2px] mt-[8px]">
                    Realiza una cotización para uno de tus familiares o
                    cualquier persona.
                  </div>
                </div>
              </label>
            </li>
          </ul>

          {plans.length > 0 && <SliderPlans plans={plans} />}
        </div>
      </div>
    </>
  );
};
export default PlansPage;
