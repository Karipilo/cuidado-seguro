import React from 'react';

function Centros() {
	return (
		<main className="py-4">
			<div className="container">
				{/* Anclas */}
				<div className="d-flex gap-3 mb-3">
					<a href="#centros" className="btn btn-outline-primary btn-sm">Ver Centros Médicos</a>
					<a href="#hogares" className="btn btn-outline-success btn-sm">Ver ELEAM / Hogares</a>
				</div>

				{/* Centros Médicos */}
				<section id="centros" className="mb-4">
					<h2 className="h4 mb-3">Centros Médicos</h2>
					<hr />
					<p className="text-center text-muted">
						Estos son los centros médicos que actualmente se encuentran asociados a la plataforma <strong>Cuidado Seguro</strong>, garantizando un acceso confiable y seguro a los servicios de salud para nuestros pacientes institucionalizados.
					</p>
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
						{/* Clínica Los Alerces */}
						<div className="col">
							<div className="card shadow-sm h-100">
								<img className="card-img-top thumb" src="/images/alerces.jpg" alt="Clínica Los Alerces" />
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-start">
										<div>
											<h5 className="card-title mb-0">Clínica Los Alerces</h5>
											<small className="text-muted">Viña del Mar, Valparaíso</small>
										</div>
										<span className="badge text-bg-primary">CENTRO</span>
									</div>
									<p className="mt-2 mb-1 small-muted"><strong>Dirección:</strong> Av. Libertad 1234</p>
									<p className="mb-1 small-muted"><strong>Teléfono:</strong> +56 32 123 4567</p>
									<div className="mb-2">
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Medicina General</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Kinesiología</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Laboratorio</span>
									</div>
									<small className="text-muted"><strong>Horario:</strong> Lun–Vie 08:00–19:00</small>
								</div>
							</div>
						</div>
						{/* Clínica Los Carrera Quilpué */}
						<div className="col">
							<div className="card shadow-sm h-100">
								<img className="card-img-top thumb" src="/images/los_carreras.jpg" alt="Clínica Los Carrera" />
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-start">
										<div>
											<h5 className="card-title mb-0">Clínica Los Carrera</h5>
											<small className="text-muted">Quilpué, Valparaíso</small>
										</div>
										<span className="badge text-bg-primary">CENTRO</span>
									</div>
									<p className="mt-2 mb-1 small-muted"><strong>Dirección:</strong> Av. Los Carrera 800</p>
									<p className="mb-1 small-muted"><strong>Teléfono:</strong> +56 32 765 4321</p>
									<div className="mb-2">
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Pediatría</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Medicina General</span>
									</div>
									<small className="text-muted"><strong>Horario:</strong> Lun–Sáb 09:00–18:00</small>
								</div>
							</div>
						</div>
						{/* Clínica Miraflores */}
						<div className="col">
							<div className="card shadow-sm h-100">
								<img className="card-img-top thumb" src="/images/miraflores.jpeg" alt="Clínica Miraflores" />
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-start">
										<div>
											<h5 className="card-title mb-0">Clínica Miraflores</h5>
											<small className="text-muted">Viña del Mar, Valparaíso</small>
										</div>
										<span className="badge text-bg-primary">CENTRO</span>
									</div>
									<p className="mt-2 mb-1 small-muted"><strong>Dirección:</strong> Miraflores Alto 200</p>
									<p className="mb-1 small-muted"><strong>Teléfono:</strong> +56 32 111 2222</p>
									<div className="mb-2">
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Medicina Familiar</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Vacunatorio</span>
									</div>
									<small className="text-muted"><strong>Horario:</strong> Lun–Vie 08:30–17:00</small>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ELEAM / Hogares */}
				<section id="hogares" className="mb-4">
					<h2 className="h4 mb-3">ELEAM / Hogares</h2>
					<hr />
					<p className="text-center text-muted">
						Estos son los ELEAM que se encuentran actualmente asociados a la plataforma <strong>Cuidado Seguro</strong>, garantizando un acceso confiable y seguro para nuestros pacientes institucionalizados.
					</p>
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
						{/* ELEAM Las Palmas */}
						<div className="col">
							<div className="card shadow-sm h-100">
								<img className="card-img-top thumb" src="/images/las_palmas.jpg" alt="ELEAM Las Palmas" />
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-start">
										<div>
											<h5 className="card-title mb-0">ELEAM Las Palmas</h5>
											<small className="text-muted">Viña del Mar, Valparaíso</small>
										</div>
										<span className="badge text-bg-success">HOGAR</span>
									</div>
									<p className="mt-2 mb-1 small-muted"><strong>Dirección:</strong> Calle Las Palmas 55</p>
									<p className="mb-1 small-muted"><strong>Teléfono:</strong> +56 9 2222 3344</p>
									<div className="mb-2">
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Geriatría</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Enfermería 24/7</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Cuidados Paliativos</span>
									</div>
									<small className="text-muted"><strong>Horario:</strong> 24/7</small>
								</div>
							</div>
						</div>
						{/* Hogar San José */}
						<div className="col">
							<div className="card shadow-sm h-100">
								<img className="card-img-top thumb" src="/images/san_jose.png" alt="Hogar San José" />
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-start">
										<div>
											<h5 className="card-title mb-0">Hogar San José</h5>
											<small className="text-muted">Quilpué, Valparaíso</small>
										</div>
										<span className="badge text-bg-success">HOGAR</span>
									</div>
									<p className="mt-2 mb-1 small-muted"><strong>Dirección:</strong> Pasaje San José 100</p>
									<p className="mb-1 small-muted"><strong>Teléfono:</strong> +56 9 9988 7766</p>
									<div className="mb-2">
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Enfermería</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Rehabilitación</span>
									</div>
									<small className="text-muted"><strong>Horario:</strong> 24/7</small>
								</div>
							</div>
						</div>
						{/* Hogar Santa María */}
						<div className="col">
							<div className="card shadow-sm h-100">
								<img className="card-img-top thumb" src="/images/santa_maria.jpg" alt="Hogar Santa María" />
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-start">
										<div>
											<h5 className="card-title mb-0">Hogar Santa María</h5>
											<small className="text-muted">Villa Alemana, Valparaíso</small>
										</div>
										<span className="badge text-bg-success">HOGAR</span>
									</div>
									<p className="mt-2 mb-1 small-muted"><strong>Dirección:</strong> Av. Valparaíso 300</p>
									<p className="mb-1 small-muted"><strong>Teléfono:</strong> +56 9 3344 5566</p>
									<div className="mb-2">
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Geriatría</span>
										<span className="badge rounded-pill bg-secondary-subtle text-dark">Terapia Ocupacional</span>
									</div>
									<small className="text-muted"><strong>Horario:</strong> 24/7</small>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

export default Centros;