export function calcularEdad(fechaNacimiento: string): number {
  const fechaActual = new Date();
  const fechaNac = new Date(fechaNacimiento);

  // Asegúrate de que la fecha de nacimiento sea válida
  if (isNaN(fechaNac.getTime())) {
    return NaN; // O lanza un error, dependiendo de tus necesidades
  }

  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

  // Ajusta si el cumpleaños aún no ha ocurrido este año
  if (fechaActual.getMonth() < fechaNac.getMonth() ||
      (fechaActual.getMonth() === fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad;
}