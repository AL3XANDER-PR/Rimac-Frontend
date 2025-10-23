import IcProtectionLight from "../../assets/IcProtectionLight.svg";
import IcAddUserLight from "../../assets/IcAddUserLight.svg";

interface Props {
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CardCotizacion({ handleOptionChange }: Props) {
  return (
    <div className="grid mx-auto w-full md:max-w-[544px] grid-cols-1 md:grid-cols-2  gap-8 mt-8 mb-5">
      <div className="relative">
        <input
          type="radio"
          id="paraMi"
          name="hosting"
          value="paraMi"
          className="hidden peer"
          required
          onChange={handleOptionChange}
        />
        <label
          htmlFor="paraMi"
          className="absolute cursor-pointer top-5 right-5 flex self-end items-center justify-center w-6 h-6 rounded-full border border-[#A9AFD9] peer-checked:border-[#389E0D] peer-checked:bg-[#389E0D] text-white"
        >
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
        </label>
        <label
          htmlFor="paraMi"
          className="inline-flex items-center justify-between w-full   border-gray-200  peer-checked:border-gray-900   cursor-pointer rounded-3xl  p-6 transition-all duration-300 shadow-[0_1px_32px_#aeacf359] border-2 pt-10 h-full"
        >
          <div className="flex flex-col items-start ">
            <img className="select-none" alt="" src={IcProtectionLight} />
            <div className="text-xl font-bold tracking-[-.2px] text-[#141938] mt-[8px]">
              Para mí
            </div>
            <div className="text-[12px] leading-5 tracking-[.2px] mt-[8px] font-sans">
              Cotiza tu seguro de salud y agrega familiares si así lo deseas.
            </div>
          </div>
        </label>
      </div>
      <div className="relative">
        <input
          type="radio"
          id="paraAlguienMas"
          name="hosting"
          value="paraAlguienMas"
          className="hidden peer"
          required
          onChange={handleOptionChange}
        />
        <label
          htmlFor="paraAlguienMas"
          className="absolute cursor-pointer top-5 right-5 flex self-end items-center justify-center w-6 h-6 rounded-full border border-[#A9AFD9] peer-checked:border-[#389E0D] peer-checked:bg-[#389E0D] text-white"
        >
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
        </label>
        <label
          htmlFor="paraAlguienMas"
          className="inline-flex items-center justify-between w-full   border-gray-200  peer-checked:border-gray-900   cursor-pointer rounded-3xl  p-6 transition-all duration-300 shadow-[0_1px_32px_#aeacf359] border-2 pt-10 h-full"
        >
          <div className="flex flex-col items-start ">
            <img className="select-none" alt="" src={IcAddUserLight} />
            <div className="text-xl font-bold tracking-[-.2px] text-[#141938] mt-[8px]">
              Para alguien más
            </div>
            <div className="text-[12px] leading-5 tracking-[.2px] mt-[8px] font-sans">
              Realiza una cotización para uno de tus familiares o cualquier
              persona.
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
export default CardCotizacion;
