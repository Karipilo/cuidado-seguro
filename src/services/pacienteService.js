// src/services/pacienteService.js
import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/pacientes`;

/**
 * Convierte los campos del backend (snake_case)
 * a camelCase para el frontend.
 */
const normalizarPaciente = (p) => ({
  id: p.id,
  nombreCompleto: p.nombre_completo,
  rut: p.rut,
  edad: p.edad,
  diagnostico: p.diagnostico,
  alergias: p.alergias,
  observaciones: p.observaciones,
  centro: p.centro,
  ciudad: p.ciudad,

  // Se dejan listas por si agregas backend:
  medicamentos: p.medicamentos || [],
  notas: p.notas || [],
  controles: p.controles || [],
  mensajesTutor: p.mensajesTutor || [],
  evoluciones: p.evoluciones || [],
});

export const getPacientes = async () => {
  const response = await axios.get(API);

  // Convertir cada paciente
  return response.data.map((p) => normalizarPaciente(p));
};

export const getPacienteById = async (id) => {
  const response = await axios.get(`${API}/${id}`);

  return normalizarPaciente(response.data);
};
