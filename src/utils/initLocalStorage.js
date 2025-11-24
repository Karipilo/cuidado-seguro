// src/utils/initLocalStorage.js
import pacientesData from "../data/pacientes";

export function inicializarLocalStorage() {
  const almacenados = JSON.parse(localStorage.getItem("pacientes"));

  // Primera carga (cuando no existe o está vacío [])
  if (!almacenados || almacenados.length === 0) {
    localStorage.setItem("pacientes", JSON.stringify(pacientesData));
    return;
  }

  // Mezclar con datos dinámicos
  const actualizados = pacientesData.map((base) => {
    const existente = almacenados.find((p) => p.id === base.id);

    if (!existente) {
      return {
        ...base,
        notasExterno: [],
        examenes: [],
        recetas: [],
        certificados: [],
      };
    }

    return {
      ...base,
      notas: existente.notas || [],
      controles: existente.controles || [],
      mensajes: existente.mensajes || [],
      evoluciones: existente.evoluciones || [],

      // ➜ NUEVOS CAMPOS PARA PROFESIONAL EXTERNO
      notasExterno: existente.notasExterno || [],
      examenes: existente.examenes || [],
      recetas: existente.recetas || [],
      certificados: existente.certificados || [],
    };
  });

  localStorage.setItem("pacientes", JSON.stringify(actualizados));
}
