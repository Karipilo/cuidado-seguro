import Carrusel from "../components/Carrusel";

function Home() {
    return (
        <main>
            {/* Hero / Introducción */}
            <section className="container py-5">
                <div className="text-center">
                    <h1 className="display-5 fw-semibold">Bienvenido a Cuidado Seguro</h1>
                    <p className="lead mt-3">
                        Plataforma web para mejorar la calidad y seguridad en el cuidado de
                        pacientes institucionalizados. Centraliza antecedentes médicos, facilita
                        la comunicación con familiares y profesionales de salud. Ofrece agendamiento
                        de horas, geolocalización de centros médicos y acceso rápido a información
                        clave. Además, contará con centros de salud asociados, lo que permitirá que,
                        cuando un paciente acuda a ellos, el profesional pueda ingresar directamente
                        a la ficha clínica y registrar su atención en la plataforma.
                    </p>

                    <div className="card-vision-mision mt-4">
                        <div className="item">

                            <hr />
                            <h4><strong>Visión</strong></h4>
                            <p>
                                Ser la plataforma líder en gestión de información clínica institucional,
                                garantizando accesibilidad, rapidez y seguridad en los cuidados de salud,
                                con una atención más humana, confiable y tecnológica.
                            </p>
                        </div>
                        <hr />
                        <div className="item">
                            <h4><strong>Misión</strong></h4>
                            <p>
                                Proporcionar a instituciones, profesionales de salud y familiares una
                                herramienta innovadora y segura que permita acceder en segundos a
                                antecedentes médicos clave, optimizando la continuidad del cuidado,
                                reduciendo errores y mejorando la calidad de vida de los pacientes.
                            </p>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>

            {/* Carrusel */}
            <section className="container pb-5">
                <Carrusel />
            </section>
        </main>
    );
}

export default Home;