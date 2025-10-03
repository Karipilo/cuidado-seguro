function Carrusel() {
    return (
        <div
            id="carouselExample"
            className="carousel slide shadow-sm rounded overflow-hidden"
            data-bs-ride="carousel"
            data-bs-interval="3500"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/images/foto.png" className="d-block w-100" alt="Profesional usando Cuidado Seguro" />
                </div>
                <div className="carousel-item">
                    <img src="/images/doc.png" className="d-block w-100" alt="Dashboard de Cuidado Seguro" />
                </div>
                <div className="carousel-item">
                    <img src="/images/foto1.png" className="d-block w-100" alt="Hogar con plataforma en uso" />
                </div>
                <div className="carousel-item">
                    <img src="/images/eleam.png" className="d-block w-100" alt="ELEAM en Cuidado Seguro" />
                </div>
                <div className="carousel-item">
                    <img src="/images/foto2.png" className="d-block w-100" alt="Dashboard alternativo" />
                </div>
                <div className="carousel-item">
                    <img src="/images/derechosydeberes-1024x994.jpg" className="d-block w-100" alt="Derechos y deberes" />
                </div>
            </div>

            {/* Indicadores */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="4" aria-label="Slide 5"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="5" aria-label="Slide 6"></button>
            </div>

            {/* Controles */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}

export default Carrusel;
