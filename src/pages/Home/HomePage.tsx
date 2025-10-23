import hero from "../../assets/images/hero.webp";
import "./HomePage.scss";

import { useForm } from "react-hook-form";
import { usePlanStore } from "../../store/plan.store";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { LoginButton } from "../../components/Button/LoginButton";
import { BlurAsset } from "../../components/BlurAsset/BlurAsset";
import { InputNumber } from "../../components/InputNumber/InputNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckboxField } from "../../components/InputCheck/InputCheck";
import { SelectField } from "../../components/InputNroDocumento/InputNroDocumento";
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
      <div className="home">
        <section className="home__section ">
          <div className="home__image">
            <img
              src={hero}
              alt="portada rimac"
              loading="lazy"
              className="home__img"
            />
          </div>

          <div className="home__form">
            <div className="home__form-content md:pr-30">
              <div className="home__header ">
                <div>
                  <span className="home__badge font-br-sonoma-bold ">
                    Seguro Salud Flexible
                  </span>
                  <h2 className="home__h2 font-br-sonoma-bold ">
                    Creado para ti y tu familia
                  </h2>
                </div>
                <img
                  loading="lazy"
                  src={hero}
                  alt="portada rimac"
                  width={135}
                  className="home__mobile-img"
                />
              </div>

              <div className="home__divider " />
              <p className="home__description font-br-sonoma-medium">
                Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                nuestra asesoría. 100% online.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="home__form-box"
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

                <div className="home__checkboxes">
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

                <a href="#" className="home__terms font-br-sonoma-bold">
                  Aplican Términos y Condiciones.
                </a>

                <div className="home__submit">
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
