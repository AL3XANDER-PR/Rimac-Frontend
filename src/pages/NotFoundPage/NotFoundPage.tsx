import { Link } from "react-router-dom";

// src/pages/NotFoundPage.tsx
const NotFoundPage = () => {
  return (
    <section className="py-5 md:py-10 h-full flex ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-9xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Página no encontrada
          </p>
          <p className="mb-4 text-lg font-medium text-gray-500 ">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="inline-flex text-[#ee0022]  hover:text-[#cf0524]  underline font-medium rounded-lg text  text-center "
          >
            Regresar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
