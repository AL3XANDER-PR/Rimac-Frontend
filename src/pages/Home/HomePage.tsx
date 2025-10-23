import hero from "../../assets/images/hero.webp";

import { useForm } from "react-hook-form";
import { usePlanStore } from "../../store/plan.store";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { LoginButton } from "../../components/Button/LoginButton";
import { BlurAsset } from "../../components/BlurAsset";
import { InputNumber } from "../../components/InputNumber";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckboxField } from "../../components/InputCheck";
import { SelectField } from "../../components/InputNroDocumento";
import { fetchUser } from "../../service/fetchUser";
import type { FormValues } from "../../types/types";
import { LoginSchema, type FormData } from "../../schema/LoginSchema";

const HomePage = () => {
  const navigate = useNavigate();
  const setUser = usePlanStore((state) => state.setUser);
  const user = usePlanStore((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      documentType: "DNI",
      documentNumber: "",
      nroCelular: "",
      acceptPrivacy: false,
      acceptComms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const user = await fetchUser();

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
    <>
      <div className="relative h-full flex flex-col justify-center items-center flex-1">
        <section className="max-w-6xl mx-auto w-full flex md:flex-row items-center justify-between px-0 md:px-4 pt-0 pb-10 md:py-12  gap-0 sm:gap-10 lg:gap-28  h-full">
          <div className="w-full hidden md:flex justify-center items-center overflow-hidden">
            <img
              src={hero}
              alt="portada rimac"
              loading="lazy"
              className="w-full h-full  object-cover rounded-2xl"
            />
          </div>

          <div className="w-full px-6 rounded-2xl">
            <div className="pr-0  lg:pr-30">
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="">
                    <span className="inline-block font-br-sonoma-bold py-1 px-2 rounded-sm leading-4 text-xs md:text-sm bg-gradient-to-r from-[#00f4e2] to-[#00ff7f]">
                      Seguro Salud Flexible
                    </span>
                    <h2 className="text-[28px] md:text-4xl font-br-sonoma-bold leading-9 md:leading-10 font-bold text-gray-900 mt-2 md:mt-4">
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
                <p className="text-gray-800 md:mt-2 text-sm font-br-sonoma-medium  mt-6">
                  Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                  nuestra asesoría. 100% online.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-0 mt-6"
              >
                <SelectField
                  name="documentNumber"
                  control={control}
                  error={errors.documentNumber?.message}
                  options={[
                    { label: "DNI", value: "DNI" },
                    { label: "RUC", value: "RUC" },
                  ]}
                />

                <InputNumber
                  label="Celular"
                  name="nroCelular"
                  type="text"
                  control={control}
                  error={errors.nroCelular?.message}
                />

                <div className="flex flex-col mt-6 text-xs">
                  <CheckboxField
                    name="acceptPrivacy"
                    label="Acepto la Política de Privacidad"
                    control={control}
                    error={errors.acceptPrivacy?.message}
                  />
                  <CheckboxField
                    name="acceptComms"
                    label="Acepto la Política de Comunicaciones Comerciales"
                    control={control}
                    error={errors.acceptComms?.message}
                  />
                </div>
                <a
                  href="#"
                  className="text-sm font-br-sonoma-bold font-semibold underline mt-4"
                >
                  Aplican Términos y Condiciones.
                </a>
                <div className="flex pt-8 pb-10 md:pb-0 md:mt-0">
                  <LoginButton />
                </div>
              </form>
            </div>
          </div>
        </section>

        <BlurAsset />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
