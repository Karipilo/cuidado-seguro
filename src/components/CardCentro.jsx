import React from 'react';

function CardCentro({ centro }) {
    const { nombre, direccion, telefono, imagen, descripcion } = centro;

    return (
        <div className="card shadow-sm" style={{ width: '18rem' }}>
            <img src={imagen} className="card-img-top" alt={`Centro ${nombre}`} />
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text"><strong>Dirección:</strong> {direccion}</p>
                <p className="card-text"><strong>Teléfono:</strong> {telefono}</p>
                {descripcion && <p className="card-text">{descripcion}</p>}
                {/* Puedes agregar un botón si quieres hacer algo como ver detalles */}
            </div>
        </div>
    );
}

export default CardCentro;
