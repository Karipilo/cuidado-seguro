import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardTutor() {
	// useNavigate: nos permite redirigir al usuario
	const navigate = useNavigate();
	// useState: crea variables reactivas
	const [usuario, setUsuario] = useState(null); // guardará el usuario activo 
	const [vista, setVista] = useState("paciente"); // controla qué sección del panel se muestra (resumen)

	// useEffect: se ejecuta cuando el componente se monta
	useEffect(() => {
		// Intentamos obtener del localStorage al usuario activo
		const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

		// Si no hay usuario logueado o no es profesional, redirige al login
		if (!activo || activo.tipoUsuario !== "Tutor") {
			navigate("/login");
			return;
		}

		// Si existe y es profesional, guardamos sus datos en el estado
		setUsuario(activo);
	}, [navigate]);

	const paciente = {
		nombre: "Juan Pérez Soto",
		centro: "ELEAM Alerces",
		ciudad: "Viña del Mar",
		contacto: "Contacto: María López (Hermana) — +56 9 1234 5678",
		identificacion: "RUT: 12.345.678-9",
		edadSexo: "78 años, Masculino",
		diagnosticos: "Hipertensión arterial, Diabetes tipo II",
		alergias: "Penicilina",
		contactos: "Tutor legal: María López",
		medicamentos: [
			{
				farmaco: "Enalapril",
				dosis: "10 mg",
				via: "VO",
				frecuencia: "1 vez al día",
				indicacion: "HTA",
				desde: "01-01-2024",
				hasta: "—",
			},
			{
				farmaco: "Metformina",
				dosis: "850 mg",
				via: "VO",
				frecuencia: "2 veces al día",
				indicacion: "Diabetes",
				desde: "15-03-2024",
				hasta: "—",
			},
		],
		controles: [
			{
				fecha: "05-06-2024",
				detalle:
					"Control médico general con Dr. Ramírez (Presión y glicemia estables)",
			},
			{
				fecha: "20-07-2024",
				detalle: "Control enfermería (Revisión de pie diabético)",
			},
		],
		quirurgicos: "Colecistectomía (2010)",
		habitos: "Exfumador, actividad física ligera",
		vacunas: "Influenza 2023, COVID-19 esquema completo",
		riesgos: "Caídas, Hipoglicemia",
	};

	const DashboardTutor = () => {
		const [tab, setTab] = useState("detalle");

		return (
			<div className="tutor-body">
				{/* Topbar */}
				<nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top shadow-sm">
					<div className="container-fluid">
						<a className="navbar-brand d-flex align-items-center gap-2" href="/">
							<img src="/public/images/logo.png" alt="logo" width="36" height="30" />
							Home
						</a>
						<div className="ms-auto me-3" style={{ minWidth: 320, maxWidth: 480 }}>
							<div className="input-group input-group-sm">
								<span className="input-group-text">
									<i className="bi bi-person-heart"></i>
								</span>
								<select className="form-select">
									<option>{paciente.nombre}</option>
								</select>
								<button className="btn btn-outline-light" title="Abrir ficha">
									<i className="bi bi-box-arrow-up-right"></i>
								</button>
							</div>
						</div>
					</div>
				</nav>

				<div className="container py-3">
					{/* Encabezado */}
					<div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
						<div>
							<h1 className="h4 mb-1">Panel del Tutor/Familiar</h1>
							<p className="text-muted mb-0">
								Revisa antecedentes, medicamentos y controles del paciente seleccionado.
							</p>
						</div>
						<span className="badge text-bg-success">Conectado</span>
					</div>

					{/* Tabs */}
					<ul className="nav nav-tabs" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link${tab === "detalle" ? " active" : ""}`}
								type="button"
								onClick={() => setTab("detalle")}
							>
								<i className="bi bi-person-vcard me-1"></i> Paciente (detalle)
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link${tab === "mensajes" ? " active" : ""}`}
								type="button"
								onClick={() => setTab("mensajes")}
							>
								<i className="bi bi-chat-dots me-1"></i> Mensajes
							</button>
						</li>
					</ul>

					<div className="tab-content pt-3">
						{/* TAB: PACIENTE (DETALLE) */}
						{tab === "detalle" && (
							<div className="tab-pane fade show active">
								{/* Cabecera paciente */}
								<div className="card shadow-sm mb-3">
									<div className="card-body d-flex flex-wrap align-items-center gap-3">
										<div
											className="rounded-circle bg-light d-flex align-items-center justify-content-center"
											style={{ width: 56, height: 56 }}
										>
											<i className="bi bi-person fs-3 text-muted"></i>
										</div>
										<div className="flex-grow-1">
											<div className="d-flex align-items-center gap-2 flex-wrap">
												<h2 className="h5 mb-0">{paciente.nombre}</h2>
												<span className="badge text-bg-secondary">{paciente.centro}</span>
												<span className="badge text-bg-light border">
													<i className="bi bi-geo-alt me-1"></i>
													{paciente.ciudad}
												</span>
											</div>
											<small className="text-muted">{paciente.contacto}</small>
										</div>
										<div className="text-end">
											<a className="btn btn-sm btn-outline-primary" href="#">
												<i className="bi bi-box-arrow-up-right me-1"></i> Ver ficha completa
											</a>
										</div>
									</div>
								</div>

								{/* Secciones */}
								<div className="row g-3">
									{/* 1) Antecedentes */}
									<div className="col-12">
										<div className="card shadow-sm">
											<div className="card-header d-flex align-items-center justify-content-between">
												<strong>
													<i className="bi bi-clipboard2-pulse me-1"></i> Antecedentes
												</strong>
												<span className="text-muted small">Actualizado —</span>
											</div>
											<div className="card-body">
												<div className="row g-3">
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Identificación</div>
															<div className="fw-semibold">{paciente.identificacion}</div>
															<div className="small text-muted">{paciente.edadSexo}</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Diagnósticos</div>
															<div>{paciente.diagnosticos}</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Alergias</div>
															<div>{paciente.alergias}</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Contactos</div>
															<div>{paciente.contactos}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* 2) Medicamentos */}
									<div className="col-12">
										<div className="card shadow-sm">
											<div className="card-header d-flex align-items-center justify-content-between">
												<strong>
													<i className="bi bi-capsule-pill me-1"></i> Medicamentos activos
												</strong>
												<span className="small text-muted">{paciente.medicamentos.length} activos</span>
											</div>
											<div className="card-body p-0">
												<div className="table-responsive">
													<table className="table table-sm align-middle mb-0">
														<thead className="table-light">
															<tr>
																<th>Fármaco</th>
																<th>Dosis</th>
																<th>Vía</th>
																<th>Frecuencia</th>
																<th>Indicación</th>
																<th>Desde</th>
																<th>Hasta</th>
															</tr>
														</thead>
														<tbody>
															{paciente.medicamentos.map((med, idx) => (
																<tr key={idx}>
																	<td>{med.farmaco}</td>
																	<td>{med.dosis}</td>
																	<td>{med.via}</td>
																	<td>{med.frecuencia}</td>
																	<td>{med.indicacion}</td>
																	<td>{med.desde}</td>
																	<td>{med.hasta}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>

									{/* 3) Controles realizados */}
									<div className="col-12">
										<div className="card shadow-sm">
											<div className="card-header d-flex align-items-center justify-content-between">
												<strong>
													<i className="bi bi-clipboard2-check me-1"></i> Controles realizados
												</strong>
												<div className="input-group input-group-sm" style={{ maxWidth: 260 }}>
													<span className="input-group-text">
														<i className="bi bi-search"></i>
													</span>
													<input className="form-control" placeholder="Filtrar por profesional/motivo…" />
												</div>
											</div>
											<ul className="list-group list-group-flush">
												{paciente.controles.map((control, idx) => (
													<li className="list-group-item" key={idx}>
														<strong>{control.fecha}</strong> — {control.detalle}
													</li>
												))}
											</ul>
										</div>
									</div>

									{/* 4) Otros antecedentes médicos */}
									<div className="col-12">
										<div className="card shadow-sm">
											<div className="card-header">
												<strong>
													<i className="bi bi-journal-medical me-1"></i> Otros antecedentes médicos
												</strong>
											</div>
											<div className="card-body">
												<div className="row g-3">
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Quirúrgicos</div>
															<div>{paciente.quirurgicos}</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Hábitos</div>
															<div>{paciente.habitos}</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Vacunas</div>
															<div>{paciente.vacunas}</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="border rounded p-2 h-100">
															<div className="text-muted small">Riesgos</div>
															<div>{paciente.riesgos}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* TAB: MENSAJES */}
						{tab === "mensajes" && (
							<div className="tab-pane fade show active">
								<div className="row g-3">
									<div className="col-lg-8">
										<div className="card shadow-sm">
											<div className="card-header d-flex justify-content-between align-items-center">
												<strong>Bandeja</strong>
												<span className="badge text-bg-danger">0 sin leer</span>
											</div>
											<div className="list-group list-group-flush"></div>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="card shadow-sm">
											<div className="card-header">
												<strong>Nuevo mensaje</strong>
											</div>
											<div className="card-body">
												<div className="mb-2">
													<label className="form-label">Para</label>
													<select className="form-select">
														<option>Profesional de Salud a cargo</option>
														<option>Administrativo</option>
													</select>
												</div>
												<div className="mb-2">
													<label className="form-label">Asunto</label>
													<input className="form-control" placeholder="Motivo…" />
												</div>
												<div className="mb-3">
													<label className="form-label">Mensaje</label>
													<textarea rows={4} className="form-control" placeholder="Escribe tu mensaje…"></textarea>
												</div>
												<button className="btn btn-primary w-100">
													<i className="bi bi-send"></i> Enviar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};
}
export default DashboardTutor;

