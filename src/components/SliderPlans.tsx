import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";

import IcHomeLight from "../assets/IcHomeLight.svg";
import IcHospitalLight from "../assets/IcHospitalLight.svg";
import IcProtectionLight from "../assets/IcHomeLight.svg";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import type { Plan } from "../types/types";
import { usePlanStore } from "../store/plan.store";

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
    <>
      <div className="block">
        <Swiper
          autoHeight={false}
          spaceBetween={20}
          slidesPerView={1} // valor por defecto (movil)
          breakpoints={{
            640: {
              // sm
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              // md
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              // lg
              slidesPerView: 3,
              spaceBetween: 28,
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
            <SwiperSlide key={index} className="">
              <div className="w-full h-full pt-16 pb-8 px-8 md:px-7  shadow-2xl rounded-[24px] flex flex-col relative transition-all opacity-100 duration-500">
                {index === 1 && (
                  <div className="recommended absolute top-10 text-xs text-[#141938] bg-[#7DF0BA] py-0.5 px-2 rounded-md font-bold tracking-[.4px]">
                    Plan recomendado
                  </div>
                )}

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-2xl font-bold tracking-[-.2px] text-[#141938]">
                      {plan.name}
                    </div>
                    <div className="mt-[24px] uppercase text-xs text-[#7981B2] tracking-[.6px] font-bold">
                      Costo del plan
                    </div>
                    {plan.precioAnterior && (
                      <div className="text-sm text-[#7981B2] tracking-[-.2px] mt-1 line-through">
                        ${plan.precioAnterior} antes
                      </div>
                    )}
                    <div className="mt-1 text-xl font-bold tracking-[-.2px] text-[#141938]">
                      ${plan.price} al mes
                    </div>
                  </div>
                  <img alt={plan.name} src={icons[index]} />
                </div>
                <div className="w-full h-[1px] bg-[#D7DBF5] my-[24px]" />

                <ul className="mb-10 flex flex-col gap-[24px]">
                  {plan.description.map((item) => (
                    <li
                      key={item}
                      className="list-disc ml-[18px] text-[16px] leading-7 font-sans tracking-[.1px] text-[#141938]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={seleccionarPLan(plan)}
                  className="flex items-center justify-center text-sm md:text-base mt-auto w-full font-bold bg-[#FF1C44] border-[#FF1C44] hover:bg-[#c70233] hover:border-[#e60039] py-3.5 md:px-11 rounded-full text-white"
                >
                  Seleccionar Plan
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles personalizados */}
        <div className=" flex lg:hidden justify-center items-center gap-4 mt-2">
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
    </>
  );
};
export default SliderPlans;
