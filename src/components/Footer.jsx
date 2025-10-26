// Pie de página del sitio web Cuidado Seguro
import React from "react";

function Footer() {
  const handleClick = () => {
    alert("Gracias por visitar Cuidado Seguro");
  };

  return (
    <footer className="footer-rect bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row text-center text-md-start align-items-center">
          {/* Columna izquierda */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">VISÍTANOS</h5>
            <p className="mb-1">Oficina Central Viña del Mar</p>
            <p className="mb-1">Av. Libertad 1348, Oficina 504</p>
            <p className="mb-1">Edificio Empresarial Plaza Viña</p>
            <p>Región de Valparaíso, Chile</p>
          </div>

          {/* Columna central con logo y contacto */}
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <img
              src="/images/logo.png"
              alt="Logo Cuidado Seguro"
              className="footer-logo mb-3"
              style={{ maxWidth: "100px" }} // Ajusta el tamaño si es necesario
            />
            <h5 className="fw-bold">CONTÁCTANOS</h5>
            <p className="mb-1">Teléfono de contacto:</p>
            <p>
              <a
                href="tel:+56964190492"
                className="link-footer text-light text-decoration-none"
              >
                +56 9 6419 0492
              </a>
            </p>
            <p className="mb-1">Correo electrónico</p>
            <p>
              <a
                href="mailto:contacto@cuidadoseguro.cl"
                className="link-footer text-light text-decoration-none"
              >
                contacto@cuidadoseguro.cl
              </a>
            </p>
          </div>

          {/* Columna derecha */}
          <div className="col-md-4 text-md-end text-center">
            <h5 className="fw-bold">HORARIO DE ATENCIÓN</h5>
            <p className="mb-1">Lunes a Viernes</p>
            <p>09:00 a 18:00 hrs.</p>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div
          className="text-center small"
          onClick={handleClick}
          role="button"
          tabIndex="0"
          style={{ cursor: "pointer" }}
        >
          © 2025 Cuidado Seguro - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
