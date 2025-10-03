import React, { useState } from 'react';

function FormularioPaciente() {

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h3>Formulario Paciente</h3>

            <div className="mb-3">
                <label className="form-label">RUT *</label>
                <input type="text" className="form-control" value={rut} onChange={(e) => setRut(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Nombre *</label>
                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Edad *</label>
                <input type="number" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Diagnóstico</label>
                <textarea className="form-control" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Medicamentos</label>
                <input type="text" className="form-control" value={medicamentos} onChange={(e) => setMedicamentos(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary">Guardar Paciente</button>
        </form>
    );
}

export default FormularioPaciente;
