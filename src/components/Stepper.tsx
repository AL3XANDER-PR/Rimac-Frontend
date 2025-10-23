import { useNavigate } from "react-router-dom";
import { usePlanStore } from "../store/plan.store";

interface Props {
  completed?: boolean;
  path?: string;
  className?: string;
}

function Stepper({ completed = false, path, className }: Props) {
  const navigate = useNavigate();
  const logout = usePlanStore((state) => state.logout);

  return (
    <div
      className={`${className} bg-[#EDEFFC] h-14 z-10 sticky top-0 w-full flex `}
    >
      <div className="max-w-6xl mx-auto w-full flex justify-center px-6">
        <div className="flex w-full items-center justify-center">
          <div className="md:flex justify-center items-center  hidden ">
            <div className="flex items-center gap-4 mr-4">
              <div className="rounded-full w-6 h-6 text-center text-xs grid place-content-center font-bold transition-colors duration-300 bg-[#4F4FFF] text-white">
                1
              </div>
              <div className="text-base tracking-[.2px] transition-all duration-300 text-[#141938] font-bold">
                Planes y coberturas
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 2"
              className="w-8 h-8 stroke-[#4F4FFF] mr-4"
              fill="none"
            >
              <line
                x1="1"
                y1="1"
                x2="31"
                y2="1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 8"
              />
            </svg>

            <div className="flex items-center gap-4 mr-gap-4 hide-for-mobile">
              <div
                className={`rounded-full w-6 h-6 text-center text-xs grid place-content-center font-bold transition duration-300 border ${
                  completed
                    ? "bg-[#4F4FFF] text-white"
                    : "border-[#7981B2] text-[#7981B2]"
                } `}
              >
                2
              </div>
              <div
                className={`text-base tracking-[.2px] transition-all duration-300 ${
                  completed
                    ? "text-[#141938] font-bold"
                    : "text-[#7981B2] opacity-75"
                } `}
              >
                Resumen
              </div>
            </div>
          </div>

          <div className="flex md:hidden items-center w-full">
            <button
              type="button"
              className="border-2 border-[#4F4FFF] rounded-full w-6 min-w-6 h-6 grid place-content-center text-[8px] text-[#4F4FFF] cursor-pointer"
              onClick={() => {
                if (path === "/") {
                  logout();
                }
                navigate(`${path}`, { replace: true }); // Redirige
              }}
            >
              <svg
                aria-hidden="true"
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
            </button>
            <div className="flex items-center ml-[16px] w-full">
              <div className="text-[10px] tracking-[.8px] leading-4 mr-[16px] font-bold whitespace-nowrap">
                PASO 1 DE 2
              </div>
              <div className="w-full h-1.5 rounded-3xl bg-[#D7DBF5]">
                <div
                  className="bg-[#4F4FFF] h-1.5 transition-all duration-500 rounded-3xl"
                  style={{ width: completed ? "100%" : "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Stepper;
