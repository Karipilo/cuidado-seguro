// src/components/MensajesTutor.jsx
import React from "react";

function MensajesTutor({ mensajes, setMensajes, para, setPara, asunto, setAsunto, cuerpo, setCuerpo }) {
  const enviarMensaje = () => {
    if (asunto.trim() === "" || cuerpo.trim() === "") return;
    const nuevo = {
      id: mensajes.length + 1,
      para,
      asunto,
      cuerpo,
      leido: false,
    };
    setMensajes([nuevo, ...mensajes]);
    setAsunto("");
    setCuerpo("");
  };

  return (
    <div className="row g-3">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Bandeja</strong>
            <span className="badge text-bg-danger">{mensajes.filter(m => !m.leido).length} sin leer</span>
          </div>
          <div className="list-group list-group-flush">
            {mensajes.length === 0 && (
              <div className="list-group-item text-muted">No hay mensajes aún.</div>
            )}
            {mensajes.map(msg => (
              <div key={msg.id} className="list-group-item">
                <div className="fw-semibold">{msg.asunto}</div>
                <small className="text-muted">Para: {msg.para}</small>
                <p className="mb-1 small">{msg.cuerpo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-lg-4">
  <div className="card shadow-sm">
    <div className="card-header">
      <strong>Nuevo mensaje</strong>
    </div>
    <div className="card-body">
      <div className="mb-2">
        <label className="form-label" htmlFor="para">Para</label>
        <select
          id="para"
          className="form-select"
          value={para}
          onChange={e => setPara(e.target.value)}
        >
          <option>Profesional de Salud a cargo</option>
          <option>Administrativo</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label" htmlFor="asunto">Asunto</label>
        <input
          id="asunto"
          className="form-control"
          value={asunto}
          onChange={e => setAsunto(e.target.value)}
          placeholder="Motivo…"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          className="form-control"
          rows="4"
          value={cuerpo}
          onChange={e => setCuerpo(e.target.value)}
          placeholder="Escribe tu mensaje…"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={enviarMensaje}>
        <i className="bi bi-send"></i> Enviar
      </button>
    </div>
  </div>
</div>

    </div>
  );
}

export default MensajesTutor;