import hero from "../../assets/hero.webp";

import blurAsset from "../../assets/blur-asset.png";
import blurAsset1 from "../../assets/blur-asset1.png";
import blurAssetLeft from "../../assets/blur-asset-left.png";
import blurAssetLeft2 from "../../assets/blur-asset-left2.png";
import { useForm } from "react-hook-form";
import { usePlanStore } from "../../store/plan.store";
import { Navigate, useNavigate } from "react-router-dom";

type FormValues = {
  documentType: string;
  documentNumber: string;
  nroCelular: string;
  acceptPrivacy: boolean;
  acceptComms: boolean;
};

const HomePage = () => {
  const navigate = useNavigate();
  const setUser = usePlanStore((state) => state.setUser);
  const user = usePlanStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      documentType: "DNI",
      documentNumber: "30216147",
      nroCelular: "5130216147",
      acceptPrivacy: false,
      acceptComms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(
        "https://rimac-front-end-challenge.netlify.app/api/user.json"
      );
      const user = await res.json();

      if (user) {
        setUser({
          ...user,
          celular: data.nroCelular,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
        });
        navigate("/plans");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (user) {
    return <Navigate to="/plans" />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="max-w-6xl mx-auto w-full flex md:flex-row items-center justify-between px-0 md:px-4 pt-0 pb-10 md:py-12  gap-0 sm:gap-10 lg:gap-28  h-full">
        <div className="w-full hidden md:flex justify-center items-center overflow-hidden">
          <img
            src={hero}
            alt="portada rimac"
            loading="lazy"
            className="w-full h-full  object-cover rounded-2xl"
          />
        </div>

        <div className=" w-full   px-6 rounded-2xl ">
          <div className="pr-0  lg:pr-30">
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="">
                  <span className="inline-block font-bold py-1 px-2 rounded-sm leading-4 text-xs md:text-sm bg-gradient-to-r from-[#00f4e2] to-[#00ff7f]">
                    Seguro Salud Flexible
                  </span>
                  <h2 className="text-[28px] md:text-4xl leading-9 md:leading-10 font-bold text-gray-900 mt-2 md:mt-4">
                    Creado para ti y tu familia
                  </h2>
                </div>
                <img
                  loading="lazy"
                  src={hero}
                  alt="portada rimac"
                  width={135}
                  className="block md:hidden rounded-3xl"
                />
              </div>

              <div className="w-full h-[1px] bg-gray-300 mt-6 block md:hidden " />
              <p className="text-gray-800 md:mt-2 text-sm font-medium  mt-6">
                Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                nuestra asesoría. 100% online.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-0 mt-6"
            >
              <div className="flex w-full ">
                <div className="relative flex items-center border border-gray-400 border-r-0 bg-white rounded-l-lg gap-[11.8px] h-14 text-gray-700 text-[16px] font-normal">
                  <select
                    {...register("documentType")}
                    id="documentType"
                    name="documentType"
                    className="appearance-none cursor-pointer bg-transparent h-full pl-4 pr-10 outline-none min-w-[140px]"
                  >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 w-4 h-4 text-gray-500 pointer-events-none"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </div>

                <div
                  className={`relative flex-1 border rounded-r-lg bg-white h-14 ${
                    errors.documentNumber ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  <input
                    {...register("documentNumber", {
                      required: "El número de documento es obligatorio",
                      minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    })}
                    id="document"
                    name="documentNumber"
                    type="text"
                    placeholder=" "
                    className="peer w-full h-full px-4 pt-5 pb-1 text-gray-800 outline-none bg-transparent rounded-r-lg"
                  />
                  <label
                    htmlFor="document"
                    className="absolute left-4 top-1/2 text-gray-500 text transform -translate-y-1/2 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-basepeer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-600 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600"
                  >
                    Nro. de documento
                  </label>
                </div>
              </div>
              {errors.documentNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documentNumber.message}
                </p>
              )}

              <div
                className={`relative w-full flex-1 border rounded-lg bg-white h-14 p-1 mt-4 ${
                  errors.nroCelular ? "border-red-500" : "border-gray-400"
                }`}
              >
                <input
                  {...register("nroCelular", {
                    required: "El celular es obligatorio",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Debe tener 9 dígitos numéricos",
                    },
                  })}
                  id="nroCelular"
                  name="nroCelular"
                  type="text"
                  placeholder=" "
                  className="peer w-full h-full px-4 pt-5 pb-1 text-gray-800 outline-none bg-transparent rounded-lg"
                />
                <label
                  htmlFor="nroCelular"
                  className="absolute left-5 top-1/3 text-gray-500 text-sm transform -translate-y-1/2 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-basepeer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-600 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600"
                >
                  Celular
                </label>
              </div>
              {errors.nroCelular && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nroCelular.message}
                </p>
              )}

              <div className="flex flex-col mt-6 text-xs">
                <label
                  className={`relative flex items-center gap-3 cursor-pointer ${
                    errors.acceptPrivacy ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("acceptPrivacy", {
                      required: "Debes aceptar la política de privacidad",
                    })}
                  />
                  <div
                    className={`w-5 h-5 border ${
                      errors.acceptPrivacy
                        ? "border-red-500"
                        : "border-gray-400"
                    }  rounded-sm flex items-center justify-center peer-checked:bg-black`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="w-3 h-3 peer-checked:opacity-0 opacity-100 transition "
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className=" ">Acepto la Política de Privacidad</span>
                </label>

                <label
                  className={`relative flex items-center gap-3 cursor-pointer mt-4 ${
                    errors.acceptPrivacy ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  <input type="checkbox" className="sr-only peer" />
                  <div
                    className={`w-5 h-5 border ${
                      errors.acceptPrivacy
                        ? "border-red-500"
                        : "border-gray-400"
                    }  rounded-sm flex items-center justify-center peer-checked:bg-black`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="w-3 h-3 peer-checked:opacity-0 opacity-100 transition "
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className=" ">
                    Acepto la Política de Comunicaciones Comerciales
                  </span>
                </label>
              </div>

              <a
                href="#"
                className="text-sm text-black font-semibold underline mt-4"
              >
                Aplican Términos y Condiciones.
              </a>

              <div className="flex">
                <button
                  type="submit"
                  className="mt-4 text-xl  bg-black text-white font-bold py-5 px-10 rounded-full hover:opacity-90 transition w-full md:w-auto"
                >
                  Cotiza aquí
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <img
        className="absolute right-0 top-0 select-none hidden md:block -z-10"
        alt=""
        src={blurAsset}
      />
      <img
        className="absolute right-0 -top-20 select-none block md:hidden -z-10"
        alt=""
        src={blurAsset1}
      />
      <img
        className="absolute left-0 bottom-0 select-none hidden md:block -z-10"
        alt=""
        src={blurAssetLeft}
      />
      <img
        className="absolute left-0 bottom-0 select-none block md:hidden -z-10"
        alt=""
        src={blurAssetLeft2}
      />
    </div>
  );
};

export default HomePage;
