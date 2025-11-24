// -----------------------------------------
// NORMALIZAR → deja solo números + dígito verificador
// Ej: "6.345.678-k" → "6345678K"
// -----------------------------------------
export function normalizarRut(rut) {
  if (!rut) return "";

  let limpio = rut
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^0-9K]/g, ""); // solo números y K

  return limpio;
}

// -----------------------------------------
// FORMATEAR → agrega el guion correctamente
// Ej: "6345678K" → "6.345.678-K"
// -----------------------------------------
export function formatearRut(rut) {
  rut = normalizarRut(rut);
  if (rut.length < 2) return rut;

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  // agregar puntos cada 3 dígitos
  const cuerpoConPuntos = cuerpo
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .join(".")
    .split("")
    .reverse()
    .join("");

  return `${cuerpoConPuntos}-${dv}`;
}

// -----------------------------------------
// VALIDAR RUT → acepta DV entre 0–9 y K/k
// -----------------------------------------
export function validarRut(rut) {
  const limpio = normalizarRut(rut);

  if (limpio.length < 2) return false;

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1).toUpperCase();

  // Validar que cuerpo sea numérico
  if (!/^\d+$/.test(cuerpo)) return false;

  // Calcular DV
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  let dvEsperado = 11 - resto;

  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dvEsperado === dvIngresado;
}
