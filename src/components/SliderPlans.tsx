import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";

import IcHomeLight from "../assets/IcHomeLight.svg";
import IcHospitalLight from "../assets/IcHospitalLight.svg";
import IcProtectionLight from "../assets/IcHomeLight.svg";
import { usePlanStore, type Plan } from "../store/plan.store";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { useState } from "react";

const icons = [IcHomeLight, IcHospitalLight, IcProtectionLight];

const SliderPlans = ({ plans }: { plans: Plan[] }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const setPlan = usePlanStore((state) => state.setPlan);
  const seleccionarPLan = (plan: Plan) => () => {
    // console.log("Plan seleccionado:", plan);
    setPlan(plan);
    navigate("/summary");
  };

  return (
    <div className="">
      <div className="block md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.1} // valor por defecto (movil)
          breakpoints={{
            766: {
              slidesPerView: 3, // cuando la pantalla sea >= 768px
              spaceBetween: 24,
            },
          }}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          modules={[Navigation]}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
          onSwiper={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
          className=""
        >
          {plans.map((plan, index) => (
            <SwiperSlide key={index} className=" ">
              <div className=" w-full pt-[68px] pb-[51px] px-[32px] shadow-2xl rounded-[24px] flex flex-col relative transition-all opacity-100 duration-500  flex-1">
                {index === 1 && (
                  <div className="recommended absolute top-10 text-xs text-[#141938] bg-[#7DF0BA] py-0.5 px-2 rounded-md font-black tracking-[.4px]">
                    Plan recomendado
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-black tracking-[-.2px] text-[#141938]">
                      {plan.name}
                    </div>
                    <div className="mt-[24px] uppercase text-xs text-[#7981B2] tracking-[.6px] font-black">
                      Costo del plan
                    </div>
                    {plan.precioAnterior && (
                      <div className="text-sm text-[#7981B2] tracking-[-.2px] mt-1 line-through">
                        ${plan.precioAnterior} antes
                      </div>
                    )}
                    <div className="mt-1 text-xl font-black tracking-[-.2px] text-[#141938]">
                      ${plan.price} al mes
                    </div>
                  </div>
                  <img alt={plan.name} src={icons[index]} />
                </div>
                <div className="w-full h-[1px] bg-[#D7DBF5] my-[24px]" />
                <ul className="mb-10 flex flex-col gap-[24px] ">
                  {plan.description.map((item) => (
                    <li
                      key={item}
                      className="list-disc ml-[18px] text-[16px] leading-7 tracking-[.1px] text-[#141938]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={seleccionarPLan(plan)}
                  className="flex items-center justify-center btn mt-auto w-full font-bold bg-[#FF1C44] border-[#FF1C44] hover:bg-[#c70233] hover:border-[#e60039] py-3.5 px-11 rounded-full text-white"
                >
                  Seleccionar Plan
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles personalizados */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button className="prev-btn border-2 border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:border-[#4F4FFF] hover:text-[#4F4FFF] transition">
            ‹
          </button>
          <span className="text-sm font-medium text-gray-600">
            {currentSlide} / {plans.length}
          </span>
          <button className="next-btn border-2 border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:border-[#4F4FFF] hover:text-[#4F4FFF] transition">
            ›
          </button>
        </div>
      </div>

      {/* plans estaticas solo visibles en desktop */}
      <div className="hidden sm:grid-cols-2 md:grid lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-[288px] min-w-[288px] pt-[68px] pb-[51px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px] flex flex-col relative transition-all opacity-100 duration-500  flex-1"
          >
            {index === 1 && (
              <div className="recommended absolute top-10 text-xs text-[#141938] bg-[#7DF0BA] py-0.5 px-2 rounded-md font-black tracking-[.4px]">
                Plan recomendado
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-black tracking-[-.2px] text-[#141938]">
                  {plan.name}
                </div>
                <div className="mt-[24px] uppercase text-xs text-[#7981B2] tracking-[.6px] font-black">
                  Costo del plan
                </div>
                {plan.precioAnterior && (
                  <div className="text-sm text-[#7981B2] tracking-[-.2px] mt-1 line-through">
                    ${plan.precioAnterior} antes
                  </div>
                )}
                <div className="mt-1 text-xl font-black tracking-[-.2px] text-[#141938]">
                  ${plan.price} al mes
                </div>
              </div>
              <img alt={plan.name} src={icons[index]} />
            </div>
            <div className="w-full h-[1px] bg-[#D7DBF5] my-[24px]" />
            <ul className="mb-10 flex flex-col gap-[24px] ">
              {plan.description.map((item) => (
                <li
                  key={item}
                  className="list-disc ml-[18px] text-[14px] font-medium leading-7 tracking-[.1px] text-[#141938]"
                >
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={seleccionarPLan(plan)}
              className="flex items-center justify-center btn mt-auto w-full font-bold bg-[#FF1C44] border-[#FF1C44] hover:bg-[#c70233] hover:border-[#e60039] py-3.5 px-11 rounded-full text-white"
            >
              Seleccionar Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SliderPlans;
