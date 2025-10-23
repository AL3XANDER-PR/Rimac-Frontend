import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <h1 className="not-found__code">404</h1>
          <p className="not-found__title">Página no encontrada</p>
          <p className="not-found__message">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Link to="/" className="not-found__link">
            Regresar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
