"use strict";
// import { Admision } from "./models/Admision";
// import { Pacientes } from "./models/Pacientes";
// import { Hospital_camas } from "./models/Hospital_camas";
// import { Paciente_antecedentes_familiares } from "./models/Paciente_antecedentes_familiares";
// import { Paciente_pruebas_diagnosticas } from "./models/Paciente_pruebas_diagnosticas";
// import { paciente_terapia_fisica } from "./models/paciente_terapia_fisica";
// import { Paciente_seguro_medico } from "./models/Paciente_seguro_medico";
// import { Paciente_Diagnosticos } from "./models/Paciente_Diagnosticos";
// import { Personal_de_admision } from "./models/Personal_de_admision";
// import { Paciente_Cirugias } from "./models/Paciente_Cirugias";
// import { Paciente_Alergias } from "./models/Paciente_Alergias";
// import { Paciente_recetas } from "./models/Paciente_recetas";
// import { Medicamentos } from "./models/Medicamentos";
// import { Usuarios } from "./models/Usuarios";
// import { Medicos } from "./models/Medicos";
// import { Turnos } from "./models/Turnos";
// import { Roles } from "./models/Roles";
// import { Paciente_Evaluacion_Fisica } from "./models/Paciente_Evaluacion_Fisica";
// import { paciente_tratamientos } from "./models/paciente_tratamientos";
// import { Hospital_habitaciones } from "./models/Hospital_habitaciones";
// import { Hospital_alas } from "./models/Hospital_alas";
// import { Tipo_De_tratamiento } from "./models/Tipo_De_tratamiento";
// import { Tipo_De_Diagnostico } from "./models/Tipo_De_Diagnostico";
// import { nombre_Prueba_Diagnostica } from "./models/nombre_Prueba_Diagnostica";
// import { nombre_Cirugia } from "./models/nombre_Cirugia";
// import { Enfermero } from "./models/Enfermero";
// import { tipo_De_Admision } from "./models/tipo_De_Admision";
// import { CategoriaSeguro } from "./models/CategoriaSeguro";
// import { Prioridad_De_Atencion } from "./models/Prioridad_De_Atencion";
// import { motivo_De_Internacion } from "./models/motivo_De_Internacion";
// import { Lazo_Familiar } from "./models/Lazo_familiar";
// import { Especialidades } from "./models/Especialidades";
// import { Tipo_De_Medicamento } from "./models/Tipo_De_Medicamento";
// import { Tipo_Sanguineo } from "./models/Tipo_Sanguineo";
// import { Sintomas } from "./models/Sintomas";
// import { nombre_Alergia } from "./models/nombre_Alergia";
// export async function seedDatabase() {
//     try {
//         // Insertar datos en tablas sin dependencias primero
//         const categoriasSeguro = await CategoriaSeguro.bulkCreate([
//             { nombre: 'Premium' },
//             { nombre: 'Básico' },
//             { nombre: 'Estándar' }
//         ]);
//         const tiposSanguineos = await tiposSanguineos.bulkCreate([
//             { nombre: 'O+' },
//             { nombre: 'A-' },
//             { nombre: 'B+' },
//             { nombre: 'AB-' },
//             { nombre: 'O-' },
//             { nombre: 'A+' }
//         ]);
//         const nombrePruebasDiagnosticas = await nombre_Prueba_Diagnostica.bulkCreate([
//             { nombre: 'Radiografía de tórax' },
//             { nombre: 'Análisis de sangre' },
//             { nombre: 'Electrocardiograma' },
//             { nombre: 'Resonancia magnética' },
//             { nombre: 'Tomografía computarizada' }
//         ]);
//         // Insertar datos en tablas con dependencias
//         const segurosMedicos = await Paciente_seguro_medico.bulkCreate([
//             { numero: 1001, estado: true, id_categoria_seguro: categoriasSeguro[0].id },
//             { numero: 1002, estado: false, id_categoria_seguro: categoriasSeguro[1].id },
//             { numero: 1003, estado: true, id_categoria_seguro: categoriasSeguro[2].id }
//         ]);
//         const pacientes = await Pacientes.bulkCreate([
//             {
//                 nombre: 'Juan',
//                 apellido: 'Pérez',
//                 dni: 12345678,
//                 fecha_nac: new Date('1990-01-01'),
//                 edad: 35,
//                 peso: 70.5,
//                 genero: 'Masculino',
//                 telefono: 123456789,
//                 telefono_De_Emergencia: 987654321,
//                 direccion: 'Calle Falsa 123',
//                 id_tipo_sanguineo: tiposSanguineos[0].id,
//                 id_seguro_medico: segurosMedicos[0].id
//             },
//             {
//                 nombre: 'María',
//                 apellido: 'Gómez',
//                 dni: 87654321,
//                 fecha_nac: new Date('1985-05-15'),
//                 edad: 40,
//                 peso: 65.2,
//                 genero: 'Femenino',
//                 telefono: 234567890,
//                 telefono_De_Emergencia: 876543210,
//                 direccion: 'Avenida Siempreviva 742',
//                 id_tipo_sanguineo: tiposSanguineos[1].id,
//                 id_seguro_medico: segurosMedicos[1].id
//             }
//         ]);
//         // Insertar datos en paciente_diagnosticos antes de paciente_pruebas_diagnosticas
//         const diagnosticos = await Paciente_Diagnosticos.bulkCreate([
//             {
//                 fecha: new Date('2025-05-01'),
//                 detalles: 'Presión arterial elevada detectada en consulta médica.',
//                 id_medico: 1,
//                 id_paciente: 1,
//                 id_tratamiento: 1
//             },
//             {
//                 fecha: new Date('2025-05-02'),
//                 detalles: 'Infección respiratoria aguda diagnosticada.',
//                 id_medico: 2,
//                 id_paciente: 2,
//                 id_tratamiento: 2
//             }
//         ]);
//         // Ahora insertar datos en paciente_pruebas_diagnosticas
//         const pruebasDiagnosticas = await Paciente_pruebas_diagnosticas.bulkCreate([
//             {
//                 id_nombre_prueba_diagnostica: 1,
//                 resultado: 'No se detectaron anomalías en la radiografía.',
//                 id_diagnostico: diagnosticos[0].id,
//                 id_paciente: 1
//             },
//             {
//                 id_nombre_prueba_diagnostica: 2,
//                 resultado: 'Niveles elevados de glucosa en sangre.',
//                 id_diagnostico: diagnosticos[1].id,
//                 id_paciente: 2
//             }
//         ]);
//         // Insertar datos en Hospital_alas
//         const alas = await Hospital_alas.bulkCreate([
//             { nombre: 'Ala Norte', cantidad_Habitaciones: 3, unidad: 'Pediatría' },
//             { nombre: 'Ala Sur', cantidad_Habitaciones: 2, unidad: 'Traumatología' },
//             { nombre: 'Ala Este', cantidad_Habitaciones: 4, unidad: 'Cardiología' },
//             { nombre: 'Ala Oeste', cantidad_Habitaciones: 1, unidad: 'Neurología' },
//             { nombre: 'Ala Central', cantidad_Habitaciones: 5, unidad: 'Emergencias' }
//         ]);
//         // Insertar datos en Hospital_habitaciones
//         const habitaciones = await Hospital_habitaciones.bulkCreate([
//             { nro_Habitacion: 101, cantidad_Camas: 2, id_ala: alas[0].id_Ala },
//             { nro_Habitacion: 102, cantidad_Camas: 2, id_ala: alas[0].id_Ala },
//             { nro_Habitacion: 103, cantidad_Camas: 2, id_ala: alas[0].id_Ala },
//             { nro_Habitacion: 201, cantidad_Camas: 2, id_ala: alas[1].id_Ala },
//             { nro_Habitacion: 202, cantidad_Camas: 2, id_ala: alas[1].id_Ala },
//             { nro_Habitacion: 301, cantidad_Camas: 2, id_ala: alas[2].id_Ala },
//             { nro_Habitacion: 302, cantidad_Camas: 2, id_ala: alas[2].id_Ala },
//             { nro_Habitacion: 303, cantidad_Camas: 2, id_ala: alas[2].id_Ala },
//             { nro_Habitacion: 304, cantidad_Camas: 2, id_ala: alas[2].id_Ala },
//             { nro_Habitacion: 401, cantidad_Camas: 2, id_ala: alas[3].id_Ala },
//             { nro_Habitacion: 501, cantidad_Camas: 2, id_ala: alas[4].id_Ala },
//             { nro_Habitacion: 502, cantidad_Camas: 2, id_ala: alas[4].id_Ala },
//             { nro_Habitacion: 503, cantidad_Camas: 2, id_ala: alas[4].id_Ala },
//             { nro_Habitacion: 504, cantidad_Camas: 2, id_ala: alas[4].id_Ala },
//             { nro_Habitacion: 505, cantidad_Camas: 2, id_ala: alas[4].id_Ala }
//         ]);
//         // Insertar datos en Hospital_camas
//         await Hospital_camas.bulkCreate([
//             { disponible: true, id_habitacion: habitaciones[0].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[0].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[1].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[1].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[2].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[2].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[3].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[3].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[4].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[4].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[5].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[5].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[6].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[6].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[7].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[7].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[8].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[8].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[9].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[9].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[10].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[10].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[11].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[11].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[12].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[12].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[13].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[13].id_Habitacion },
//             { disponible: true, id_habitacion: habitaciones[14].id_Habitacion },
//             { disponible: false, id_habitacion: habitaciones[14].id_Habitacion }
//         ]);
//         // Insertar datos en tipo_De_Admision
//         await tipo_De_Admision.bulkCreate([
//             { tipo: 'Urgencia' },
//             { tipo: 'Programada' },
//             { tipo: 'Emergencia' },
//             { tipo: 'Consulta Externa' },
//             { tipo: 'Hospitalización' }
//         ]);
//         // Insertar datos en motivo_De_Internacion
//         await motivo_De_Internacion.bulkCreate([
//             { motivo: 'Fractura de pierna' },
//             { motivo: 'Chequeo general' },
//             { motivo: 'Apendicitis' },
//             { motivo: 'Cirugía de rodilla' },
//             { motivo: 'Accidente automovilístico' },
//             { motivo: 'Rehabilitación postoperatoria' },
//             { motivo: 'Dolor abdominal' },
//             { motivo: 'Infección respiratoria' },
//             { motivo: 'Control de diabetes' },
//             { motivo: 'Evaluación neurológica' }
//         ]);
//         // Insertar datos en PrioridadDeAtencion
//         await Prioridad_De_Atencion.bulkCreate([
//             { prioridad: 'Alta' },
//             { prioridad: 'Media' },
//             { prioridad: 'Baja' },
//             { prioridad: 'Crítica' },
//             { prioridad: 'Urgente' }
//         ]);
//         // Insertar datos en Admisiones
//         await Admision.bulkCreate([
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 1,
//                 id_prioridad_de_atencion: 1,
//                 id_tipo_de_admision: 1,
//                 fecha_De_Admision: new Date('2025-05-01'),
//                 fecha_De_Actualizacion: new Date('2025-05-01'),
//                 id_Paciente: 1,
//                 id_Cama: 1
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 2,
//                 id_prioridad_de_atencion: 2,
//                 id_tipo_de_admision: 2,
//                 fecha_De_Admision: new Date('2025-05-02'),
//                 fecha_De_Actualizacion: new Date('2025-05-02'),
//                 id_Paciente: 2,
//                 id_Cama: 2
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 3,
//                 id_prioridad_de_atencion: 3,
//                 id_tipo_de_admision: 3,
//                 fecha_De_Admision: new Date('2025-05-03'),
//                 fecha_De_Actualizacion: new Date('2025-05-03'),
//                 id_Paciente: 3,
//                 id_Cama: 3
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 4,
//                 id_prioridad_de_atencion: 4,
//                 id_tipo_de_admision: 4,
//                 fecha_De_Admision: new Date('2025-05-04'),
//                 fecha_De_Actualizacion: new Date('2025-05-04'),
//                 id_Paciente: 4,
//                 id_Cama: 4
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 5,
//                 id_prioridad_de_atencion: 5,
//                 id_tipo_de_admision: 5,
//                 fecha_De_Admision: new Date('2025-05-05'),
//                 fecha_De_Actualizacion: new Date('2025-05-05'),
//                 id_Paciente: 5,
//                 id_Cama: 5
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 6,
//                 id_prioridad_de_atencion: 1,
//                 id_tipo_de_admision: 1,
//                 fecha_De_Admision: new Date('2025-05-06'),
//                 fecha_De_Actualizacion: new Date('2025-05-06'),
//                 id_Paciente: 6,
//                 id_Cama: 6
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 7,
//                 id_prioridad_de_atencion: 2,
//                 id_tipo_de_admision: 2,
//                 fecha_De_Admision: new Date('2025-05-07'),
//                 fecha_De_Actualizacion: new Date('2025-05-07'),
//                 id_Paciente: 7,
//                 id_Cama: 7
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 8,
//                 id_prioridad_de_atencion: 3,
//                 id_tipo_de_admision: 3,
//                 fecha_De_Admision: new Date('2025-05-08'),
//                 fecha_De_Actualizacion: new Date('2025-05-08'),
//                 id_Paciente: 8,
//                 id_Cama: 8
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 9,
//                 id_prioridad_de_atencion: 4,
//                 id_tipo_de_admision: 4,
//                 fecha_De_Admision: new Date('2025-05-09'),
//                 fecha_De_Actualizacion: new Date('2025-05-09'),
//                 id_Paciente: 9,
//                 id_Cama: 9
//             },
//             {
//                 estado: 'Activo',
//                 id_motivo_de_Internacion: 10,
//                 id_prioridad_de_atencion: 5,
//                 id_tipo_de_admision: 5,
//                 fecha_De_Admision: new Date('2025-05-10'),
//                 fecha_De_Actualizacion: new Date('2025-05-10'),
//                 id_Paciente: 10,
//                 id_Cama: 10
//             }
//         ]);
//         // Actualizar disponibilidad de camas
//         await Hospital_camas.update({ disponible: false }, { where: { id_Cama: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } });
//         // Repite el proceso para cada modelo con sus respectivos atributos y ejemplos
//         // Ejemplo de seed para el modelo Paciente_antecedentes_familiares
//         await Paciente_antecedentes_familiares.bulkCreate([
//             {
//                 nombre_Enfermedad: 'Diabetes tipo 2',
//                 detalles: 'Presente en la familia desde hace dos generaciones.',
//                 id_Paciente: 1
//             },
//             {
//                 nombre_Enfermedad: 'Hipertensión arterial',
//                 detalles: 'Historial de hipertensión en la familia materna.',
//                 id_Paciente: 2
//             },
//             {
//                 nombre_Enfermedad: 'Cáncer de colon',
//                 detalles: 'Diagnóstico en un familiar cercano.',
//                 id_Paciente: 3
//             },
//             {
//                 nombre_Enfermedad: 'Asma',
//                 detalles: 'Condición hereditaria en la familia.',
//                 id_Paciente: 4
//             },
//             {
//                 nombre_Enfermedad: 'Enfermedad cardíaca',
//                 detalles: 'Problemas cardíacos recurrentes en la familia.',
//                 id_Paciente: 5
//             }
//         ]);
//         // Insertar datos en Lazo_Familiar
//         await Lazo_Familiar.bulkCreate([
//             { lazo: 'Padre', id_paciente_antecedente_familiar: 1 },
//             { lazo: 'Madre', id_paciente_antecedente_familiar: 2 },
//             { lazo: 'Tío', id_paciente_antecedente_familiar: 3 },
//             { lazo: 'Hermano', id_paciente_antecedente_familiar: 4 },
//             { lazo: 'Abuelo', id_paciente_antecedente_familiar: 5 }
//         ]);
//         // Ejemplo de seed para el modelo Usuarios
//         await Usuarios.bulkCreate([
//             { email: 'usuario1@example.com', password_hash: 'hashedpassword1', activo: true, intentos_fallidos: 0 },
//             { email: 'usuario2@example.com', password_hash: 'hashedpassword2', activo: true, intentos_fallidos: 0 },
//             { email: 'usuario3@example.com', password_hash: 'hashedpassword3', activo: true, intentos_fallidos: 0 },
//             { email: 'usuario4@example.com', password_hash: 'hashedpassword4', activo: true, intentos_fallidos: 0 },
//             { email: 'usuario5@example.com', password_hash: 'hashedpassword5', activo: true, intentos_fallidos: 0 },
//             { email: 'usuario6@example.com', password_hash: 'hashedpassword6', activo: true, intentos_fallidos: 0 }
//         ]);
//         // Insertar datos en Especialidad
//         await Especialidades.bulkCreate([
//             { nombre: 'Cardiología' },
//             { nombre: 'Neurología' },
//             { nombre: 'Traumatología' },
//             { nombre: 'Pediatría' },
//             { nombre: 'Dermatología' },
//             { nombre: 'Ginecología' }
//         ]);
//         // Insertar datos en Tipo_De_Medicamento
//         await Tipo_De_Medicamento.bulkCreate([
//             { nombre: 'Analgésico' },
//             { nombre: 'Antiinflamatorio' },
//             { nombre: 'Antibiótico' },
//             { nombre: 'Antihistamínico' },
//             { nombre: 'Antidiabético' },
//             { nombre: 'Inhibidor de la bomba de protones' }
//         ]);
//         // Insertar datos en Medicamentos
//         await Medicamentos.bulkCreate([
//             {
//                 nombre: 'Paracetamol',
//                 id_tipo_de_medicamento: 1,
//                 dosis_Recomendada: 500,
//                 cantidad_Contenida: 20,
//                 codigo: 1001
//             },
//             {
//                 nombre: 'Ibuprofeno',
//                 id_tipo_de_medicamento: 2,
//                 dosis_Recomendada: 400,
//                 cantidad_Contenida: 30,
//                 codigo: 1002
//             },
//             {
//                 nombre: 'Amoxicilina',
//                 id_tipo_de_medicamento: 3,
//                 dosis_Recomendada: 250,
//                 cantidad_Contenida: 15,
//                 codigo: 1003
//             },
//             {
//                 nombre: 'Loratadina',
//                 id_tipo_de_medicamento: 4,
//                 dosis_Recomendada: 10,
//                 cantidad_Contenida: 10,
//                 codigo: 1004
//             },
//             {
//                 nombre: 'Metformina',
//                 id_tipo_de_medicamento: 5,
//                 dosis_Recomendada: 850,
//                 cantidad_Contenida: 60,
//                 codigo: 1005
//             },
//             {
//                 nombre: 'Omeprazol',
//                 id_tipo_de_medicamento: 6,
//                 dosis_Recomendada: 20,
//                 cantidad_Contenida: 14,
//                 codigo: 1006
//             }
//         ]);
//         // Insertar datos en medicos y guardar los IDs generados
//         const medicos = await Medicos.bulkCreate([
//             {
//                 nombre: 'Dr. Juan',
//                 apellido: 'Pérez',
//                 dni: 12345678,
//                 fecha_nac: new Date('1980-01-01'),
//                 edad: 45,
//                 peso: 70.5,
//                 genero: 'Masculino',
//                 telefono: 123456789,
//                 telefono_De_Emergencia: 987654321,
//                 direccion: 'Calle Principal 123',
//                 id_Especialidad: 1,
//                 id_usuario: 1
//             },
//             {
//                 nombre: 'Dra. Ana',
//                 apellido: 'Gómez',
//                 dni: 87654321,
//                 fecha_nac: new Date('1985-05-15'),
//                 edad: 40,
//                 peso: 65.2,
//                 genero: 'Femenino',
//                 telefono: 234567890,
//                 telefono_De_Emergencia: 876543210,
//                 direccion: 'Avenida Central 456',
//                 id_Especialidad: 2,
//                 id_usuario: 2
//             }
//         ], { returning: true });
//         // Mapear los IDs generados
//         const idMedicos = medicos.map(m => m.id_Medico);
//         // Crear ejemplos en Paciente_Diagnosticos y relacionarlos con Medicos usando los IDs generados
//         await Paciente_Diagnosticos.bulkCreate([
//             {
//                 fecha: new Date('2025-05-01'),
//                 id_medico: idMedicos[0],
//                 detalles: 'Presión arterial elevada detectada en consulta médica.',
//                 id_paciente: 1,
//                 id_tratamiento: 1
//             },
//             {
//                 fecha: new Date('2025-05-02'),
//                 id_medico: idMedicos[1],
//                 detalles: 'Infección respiratoria aguda diagnosticada.',
//                 id_paciente: 2,
//                 id_tratamiento: 2
//             }
//         ]);
//         // Insertar datos en Enfermeros
//         await Enfermero.bulkCreate([
//             {
//                 nombre: 'Enfermero Juan',
//                 apellido: 'Pérez',
//                 dni: 12345678,
//                 fecha_nac: new Date('1980-01-01'),
//                 edad: 45,
//                 peso: 70.5,
//                 genero: 'Masculino',
//                 telefono: 123456789,
//                 telefono_De_Emergencia: 987654321,
//                 direccion: 'Calle Principal 123',
//             },
//             {
//                 nombre: 'Enfermera Ana',
//                 apellido: 'Gómez',
//                 dni: 87654321,
//                 fecha_nac: new Date('1985-05-15'),
//                 edad: 40,
//                 peso: 65.2,
//                 genero: 'Femenino',
//                 telefono: 234567890,
//                 telefono_De_Emergencia: 876543210,
//                 direccion: 'Avenida Central 456',
//             },
//             {
//                 nombre: 'Enfermero Carlos',
//                 apellido: 'López',
//                 dni: 11223344,
//                 fecha_nac: new Date('1975-03-20'),
//                 edad: 50,
//                 peso: 80.3,
//                 genero: 'Masculino',
//                 telefono: 345678901,
//                 telefono_De_Emergencia: 765432109,
//                 direccion: 'Boulevard Secundario 789',
//             },
//             {
//                 nombre: 'Enfermera María',
//                 apellido: 'Martínez',
//                 dni: 55667788,
//                 fecha_nac: new Date('1990-07-10'),
//                 edad: 35,
//                 peso: 55.0,
//                 genero: 'Femenino',
//                 telefono: 456789012,
//                 telefono_De_Emergencia: 654321098,
//                 direccion: 'Calle Tercera 321',
//             },
//             {
//                 nombre: 'Enfermero Luis',
//                 apellido: 'Hernández',
//                 dni: 99887766,
//                 fecha_nac: new Date('1970-11-25'),
//                 edad: 55,
//                 peso: 75.4,
//                 genero: 'Masculino',
//                 telefono: 567890123,
//                 telefono_De_Emergencia: 543210987,
//                 direccion: 'Pasaje Cuarto 654',
//             },
//             {
//                 nombre: 'Enfermera Laura',
//                 apellido: 'Fernández',
//                 dni: 33445566,
//                 fecha_nac: new Date('1980-09-05'),
//                 edad: 45,
//                 peso: 60.8,
//                 genero: 'Femenino',
//                 telefono: 678901234,
//                 telefono_De_Emergencia: 432109876,
//                 direccion: 'Camino Real 987',
//             }
//         ]);
//         // Insertar datos en Tipo_De_tratamiento
//         const tiposDeTratamiento = await Tipo_De_tratamiento.bulkCreate([
//             { nombre: 'Fisioterapia' },
//             { nombre: 'Medicación' },
//             { nombre: 'Terapia ocupacional' },
//             { nombre: 'Rehabilitación' },
//             { nombre: 'Terapia psicológica' }
//         ]);
//         // Insertar datos en paciente_tratamientos
//         await paciente_tratamientos.bulkCreate([
//             {
//                 id_tipo_de_tratamiento: tiposDeTratamiento[0].id_Tipo_De_Tratamiento,
//                 detalle: 'Rehabilitación de rodilla',
//                 cantidad_suministrada: 10,
//                 fecha_de_inicio: new Date('2025-05-01'),
//                 fecha_de_fin: new Date('2025-05-10'),
//                 id_paciente: 1,
//                 id_medicamento: 1,
//                 id_enfermero: 1
//             },
//             {
//                 id_tipo_de_tratamiento: tiposDeTratamiento[1].id_Tipo_De_Tratamiento,
//                 detalle: 'Tratamiento para hipertensión',
//                 cantidad_suministrada: 20,
//                 fecha_de_inicio: new Date('2025-05-02'),
//                 fecha_de_fin: new Date('2025-05-12'),
//                 id_paciente: 2,
//                 id_medicamento: 2,
//                 id_enfermero: 2
//             },
//             {
//                 id_tipo_de_tratamiento: tiposDeTratamiento[2].id_Tipo_De_Tratamiento,
//                 detalle: 'Mejorar habilidades motoras',
//                 cantidad_suministrada: 15,
//                 fecha_de_inicio: new Date('2025-05-03'),
//                 fecha_de_fin: new Date('2025-05-13'),
//                 id_paciente: 3,
//                 id_medicamento: 3,
//                 id_enfermero: 3
//             },
//             {
//                 id_tipo_de_tratamiento: tiposDeTratamiento[3].id_Tipo_De_Tratamiento,
//                 detalle: 'Recuperación postoperatoria',
//                 cantidad_suministrada: 12,
//                 fecha_de_inicio: new Date('2025-05-04'),
//                 fecha_de_fin: new Date('2025-05-14'),
//                 id_paciente: 4,
//                 id_medicamento: 4,
//                 id_enfermero: 4
//             },
//             {
//                 id_tipo_de_tratamiento: tiposDeTratamiento[4].id_Tipo_De_Tratamiento,
//                 detalle: 'Terapia psicológica para ansiedad',
//                 cantidad_suministrada: 8,
//                 fecha_de_inicio: new Date('2025-05-05'),
//                 fecha_de_fin: new Date('2025-05-15'),
//                 id_paciente: 5,
//                 id_medicamento: 5,
//                 id_enfermero: 5
//             }
//         ]);
//         // Limpiar la tabla tipo_de_diagnosticos antes de insertar datos
//         await Tipo_De_Diagnostico.destroy({ where: {}, truncate: true });
//         // Asegurar que los datos en tipo_de_diagnosticos se inserten correctamente antes de ser referenciados
//         const tiposDeDiagnosticos = await Tipo_De_Diagnostico.bulkCreate([
//             { nombre: 'Enfermedad crónica' },
//             { nombre: 'Enfermedad aguda' },
//             { nombre: 'Trastorno respiratorio' },
//             { nombre: 'Deficiencia nutricional' },
//             { nombre: 'Trastorno neurológico' }
//         ], { returning: true });
//         // Mapear los IDs generados
//         const idTipoDiagnostico = tiposDeDiagnosticos.map(t => t.id_tipo_de_diagnostico);
//         // Crear ejemplos en Paciente_Diagnosticos y relacionarlos con Tipo_De_Diagnosticos usando los IDs generados
//         await Paciente_Diagnosticos.bulkCreate([
//             {
//                 fecha: new Date('2025-05-01'),
//                 id_tipo_de_diagnostico: idTipoDiagnostico[0],
//                 detalles: 'Presión arterial elevada detectada en consulta médica.',
//                 id_medico: 1,
//                 id_paciente: 1,
//                 id_tratamiento: 1
//             },
//             {
//                 fecha: new Date('2025-05-02'),
//                 id_tipo_de_diagnostico: idTipoDiagnostico[1],
//                 detalles: 'Infección respiratoria aguda diagnosticada.',
//                 id_medico: 2,
//                 id_paciente: 2,
//                 id_tratamiento: 2
//             },
//             {
//                 fecha: new Date('2025-05-03'),
//                 id_tipo_de_diagnostico: idTipoDiagnostico[2],
//                 detalles: 'Asma crónica con episodios recurrentes.',
//                 id_medico: 3,
//                 id_paciente: 3,
//                 id_tratamiento: 3
//             },
//             {
//                 fecha: new Date('2025-05-04'),
//                 id_tipo_de_diagnostico: idTipoDiagnostico[3],
//                 detalles: 'Deficiencia de hierro detectada en análisis de sangre.',
//                 id_medico: 4,
//                 id_paciente: 4,
//                 id_tratamiento: 4
//             },
//             {
//                 fecha: new Date('2025-05-05'),
//                 id_tipo_de_diagnostico: idTipoDiagnostico[4],
//                 detalles: 'Epilepsia diagnosticada tras evaluación neurológica.',
//                 id_medico: 5,
//                 id_paciente: 5,
//                 id_tratamiento: 5
//             }
//         ]);
//         // Crear ejemplos en Sintomas
//         await Sintomas.bulkCreate([
//             { nombre: 'Dolor de cabeza', id_Admision: 1, id_Paciente_Diagnosticos: 1 },
//             { nombre: 'Mareos', id_Admision: 1, id_Paciente_Diagnosticos: 1 },
//             { nombre: 'Visión borrosa', id_Admision: 1, id_Paciente_Diagnosticos: 1 },
//             { nombre: 'Sed excesiva', id_Admision: 2, id_Paciente_Diagnosticos: 2 },
//             { nombre: 'Micción frecuente', id_Admision: 2, id_Paciente_Diagnosticos: 2 },
//             { nombre: 'Fatiga', id_Admision: 2, id_Paciente_Diagnosticos: 2 },
//             { nombre: 'Dificultad para respirar', id_Admision: 3, id_Paciente_Diagnosticos: 3 },
//             { nombre: 'Opresión en el pecho', id_Admision: 3, id_Paciente_Diagnosticos: 3 },
//             { nombre: 'Tos', id_Admision: 3, id_Paciente_Diagnosticos: 3 },
//             { nombre: 'Piel pálida', id_Admision: 4, id_Paciente_Diagnosticos: 4 },
//             { nombre: 'Dificultad para concentrarse', id_Admision: 4, id_Paciente_Diagnosticos: 4 },
//             { nombre: 'Náuseas', id_Admision: 5, id_Paciente_Diagnosticos: 5 },
//             { nombre: 'Sensibilidad a la luz', id_Admision: 5, id_Paciente_Diagnosticos: 5 }
//         ]);
//         // Crear ejemplos en nombre_Prueba_Diagnostica
//         await nombre_Prueba_Diagnostica.bulkCreate([
//             { nombre: 'Radiografía de tórax' },
//             { nombre: 'Análisis de sangre' },
//             { nombre: 'Electrocardiograma' },
//             { nombre: 'Resonancia magnética' },
//             { nombre: 'Tomografía computarizada' }
//         ]);
//         // Actualizar ejemplos en Paciente_pruebas_diagnosticas para reflejar el modelo actualizado
//         await Paciente_pruebas_diagnosticas.bulkCreate([
//             {
//                 id_nombre_prueba_diagnostica: 1,
//                 resultado: 'No se detectaron anomalías en la radiografía.',
//                 id_diagnostico: 1,
//                 id_paciente: 1
//             },
//             {
//                 id_nombre_prueba_diagnostica: 2,
//                 resultado: 'Niveles elevados de glucosa en sangre.',
//                 id_diagnostico: 2,
//                 id_paciente: 2
//             },
//             {
//                 id_nombre_prueba_diagnostica: 3,
//                 resultado: 'Ritmo cardíaco irregular detectado.',
//                 id_diagnostico: 3,
//                 id_paciente: 3
//             },
//             {
//                 id_nombre_prueba_diagnostica: 4,
//                 resultado: 'Lesión cerebral leve identificada.',
//                 id_diagnostico: 4,
//                 id_paciente: 4
//             },
//             {
//                 id_nombre_prueba_diagnostica: 5,
//                 resultado: 'Fractura ósea confirmada en la tomografía.',
//                 id_diagnostico: 5,
//                 id_paciente: 5
//             }
//         ]);
//         // Ejemplo de seed para el modelo paciente_terapia_fisica
//         // await paciente_terapia_fisica.bulkCreate([
//         //     {
//         //         fecha: new Date('2025-05-01'),
//         //         nombre: 'Rehabilitación de rodilla',
//         //         duracion: 30,
//         //         id_paciente: 1,
//         //         id_tratamiento: 1
//         //     },
//         //     {
//         //         fecha: new Date('2025-05-02'),
//         //         nombre: 'Terapia de espalda',
//         //         duracion: 45,
//         //         id_paciente: 2,
//         //         id_tratamiento: 2
//         //     },
//         //     {
//         //         fecha: new Date('2025-05-03'),
//         //         nombre: 'Fortalecimiento muscular',
//         //         duracion: 60,
//         //         id_paciente: 3,
//         //         id_tratamiento: 3
//         //     },
//         //     {
//         //         fecha: new Date('2025-05-04'),
//         //         nombre: 'Terapia de equilibrio',
//         //         duracion: 40,
//         //         id_paciente: 4,
//         //         id_tratamiento: 4
//         //     },
//         //     {
//         //         fecha: new Date('2025-05-05'),
//         //         nombre: 'Rehabilitación postoperatoria',
//         //         duracion: 50,
//         //         id_paciente: 5,
//         //         id_tratamiento: 5
//         //     },
//         //     {
//         //         fecha: new Date('2025-05-06'),
//         //         nombre: 'Terapia de movilidad',
//         //         duracion: 35,
//         //         id_paciente: 6,
//         //         id_tratamiento: 6
//         //     }
//         // ]);
//         // Ejemplo de seed para el modelo Personal_de_admision
//         await Personal_de_admision.bulkCreate([
//             {
//                 nombre: 'Carlos',
//                 apellido: 'González',
//                 dni: 12345678,
//                 fecha_nac: new Date('1980-01-01'),
//                 edad: 45,
//                 genero: 'Masculino',
//                 telefono: 123456789,
//                 telefono_De_Emergencia: 987654321,
//                 direccion: 'Calle Principal 123',
//                 id_usuario: 1
//             },
//             {
//                 nombre: 'Ana',
//                 apellido: 'Martínez',
//                 dni: 87654321,
//                 fecha_nac: new Date('1985-05-15'),
//                 edad: 40,
//                 genero: 'Femenino',
//                 telefono: 234567890,
//                 telefono_De_Emergencia: 876543210,
//                 direccion: 'Avenida Central 456',
//                 id_usuario: 2
//             },
//             {
//                 nombre: 'Luis',
//                 apellido: 'Hernández',
//                 dni: 11223344,
//                 fecha_nac: new Date('1990-03-20'),
//                 edad: 35,
//                 genero: 'Masculino',
//                 telefono: 345678901,
//                 telefono_De_Emergencia: 765432109,
//                 direccion: 'Boulevard Secundario 789',
//                 id_usuario: 3
//             },
//             {
//                 nombre: 'María',
//                 apellido: 'López',
//                 dni: 55667788,
//                 fecha_nac: new Date('1995-07-10'),
//                 edad: 30,
//                 genero: 'Femenino',
//                 telefono: 456789012,
//                 telefono_De_Emergencia: 654321098,
//                 direccion: 'Calle Tercera 321',
//                 id_usuario: 4
//             },
//             {
//                 nombre: 'Jorge',
//                 apellido: 'Pérez',
//                 dni: 99887766,
//                 fecha_nac: new Date('1975-11-25'),
//                 edad: 50,
//                 genero: 'Masculino',
//                 telefono: 567890123,
//                 telefono_De_Emergencia: 543210987,
//                 direccion: 'Pasaje Cuarto 654',
//                 id_usuario: 5
//             },
//             {
//                 nombre: 'Laura',
//                 apellido: 'Fernández',
//                 dni: 33445566,
//                 fecha_nac: new Date('1980-09-05'),
//                 edad: 45,
//                 genero: 'Femenino',
//                 telefono: 678901234,
//                 telefono_De_Emergencia: 432109876,
//                 direccion: 'Camino Real 987',
//                 id_usuario: 6
//             }
//         ]);
//         // Crear ejemplos en nombre_Cirugia
//         await nombre_Cirugia.bulkCreate([
//             { nombre: 'Reparación de ligamentos cruzados' },
//             { nombre: 'Apendicectomía' },
//             { nombre: 'Cesárea' },
//             { nombre: 'Bypass gástrico' },
//             { nombre: 'Cirugía de cataratas' }
//         ]);
//         // Actualizar ejemplos en paciente_cirugias para reflejar el formato solicitado
//         await Paciente_Cirugias.bulkCreate([
//             {
//                 fecha: new Date('2025-05-01'),
//                 id_nombre_cirugia: 1,
//                 descripcion: 'Reparación de ligamentos cruzados.',
//                 id_medico: 1,
//                 id_paciente: 1
//             },
//             {
//                 fecha: new Date('2025-05-02'),
//                 id_nombre_cirugia: 2,
//                 descripcion: 'Extracción del apéndice inflamado.',
//                 id_medico: 2,
//                 id_paciente: 2
//             },
//             {
//                 fecha: new Date('2025-05-03'),
//                 id_nombre_cirugia: 3,
//                 descripcion: 'Parto por cesárea programado.',
//                 id_medico: 3,
//                 id_paciente: 3
//             },
//             {
//                 fecha: new Date('2025-05-04'),
//                 id_nombre_cirugia: 4,
//                 descripcion: 'Reducción de peso mediante bypass gástrico.',
//                 id_medico: 4,
//                 id_paciente: 4
//             },
//             {
//                 fecha: new Date('2025-05-05'),
//                 id_nombre_cirugia: 5,
//                 descripcion: 'Corrección de visión mediante cirugía de cataratas.',
//                 id_medico: 5,
//                 id_paciente: 5
//             }
//         ]);
//         // Ejemplo de seed para el modelo Paciente_Alergias
//         // Crear ejemplos en paciente_alergias
//         await Paciente_Alergias.bulkCreate([
//             { id_nombre_alergia: 1, descripcion: 'Reacción severa al polen en primavera', id_paciente: 1, id_tratamiento: 2 },
//             { id_nombre_alergia: 2, descripcion: 'Dificultad respiratoria por ácaros del polvo', id_paciente: 2, id_tratamiento: 3 },
//             { id_nombre_alergia: 3, descripcion: 'Erupción cutánea por contacto con pelo de animales', id_paciente: 3, id_tratamiento: 4 },
//             { id_nombre_alergia: 4, descripcion: 'Reacción alérgica severa a mariscos', id_paciente: 4, id_tratamiento: 5 },
//             { id_nombre_alergia: 5, descripcion: 'Anafilaxia por penicilina', id_paciente: 5, id_tratamiento: 6 }
//         ]);
//         // Ejemplo de seed para el modelo Paciente_recetas
//         await Paciente_recetas.bulkCreate([
//             {
//                 fecha: new Date('2025-05-01'),
//                 id_paciente: 1,
//                 id_medico: 1,
//                 id_medicamento: 1
//             },
//             {
//                 fecha: new Date('2025-05-02'),
//                 id_paciente: 2,
//                 id_medico: 2,
//                 id_medicamento: 2
//             },
//             {
//                 fecha: new Date('2025-05-03'),
//                 id_paciente: 3,
//                 id_medico: 3,
//                 id_medicamento: 3
//             },
//             {
//                 fecha: new Date('2025-05-04'),
//                 id_paciente: 4,
//                 id_medico: 4,
//                 id_medicamento: 4
//             },
//             {
//                 fecha: new Date('2025-05-05'),
//                 id_paciente: 5,
//                 id_medico: 5,
//                 id_medicamento: 5
//             },
//             {
//                 fecha: new Date('2025-05-06'),
//                 id_paciente: 6,
//                 id_medico: 6,
//                 id_medicamento: 6
//             }
//         ]);
//         // Ejemplo de seed para el modelo Roles
//         await Roles.bulkCreate([
//             {
//                 nombre: 'Administrador'
//             },
//             {
//                 nombre: 'Médico'
//             },
//             {
//                 nombre: 'Enfermero'
//             },
//             {
//                 nombre: 'Paciente'
//             }
//         ]);
//         // Ejemplo de seed para el modelo Turnos
//         await Turnos.bulkCreate([
//             {
//                 fecha: new Date('2025-05-10'),
//                 horario: new Date('2025-05-10T08:00:00'),
//                 motivo: 'Consulta general',
//                 id_paciente: 1,
//                 id_medico: 1
//             },
//             {
//                 fecha: new Date('2025-05-11'),
//                 horario: new Date('2025-05-11T09:00:00'),
//                 motivo: 'Revisión postoperatoria',
//                 id_paciente: 2,
//                 id_medico: 2
//             },
//             {
//                 fecha: new Date('2025-05-12'),
//                 horario: new Date('2025-05-12T10:00:00'),
//                 motivo: 'Chequeo anual',
//                 id_paciente: 3,
//                 id_medico: 3
//             },
//             {
//                 fecha: new Date('2025-05-13'),
//                 horario: new Date('2025-05-13T11:00:00'),
//                 motivo: 'Control de presión arterial',
//                 id_paciente: 4,
//                 id_medico: 4
//             },
//             {
//                 fecha: new Date('2025-05-14'),
//                 horario: new Date('2025-05-14T12:00:00'),
//                 motivo: 'Consulta por dolor de espalda',
//                 id_paciente: 5,
//                 id_medico: 5
//             },
//             {
//                 fecha: new Date('2025-05-15'),
//                 horario: new Date('2025-05-15T13:00:00'),
//                 motivo: 'Evaluación de alergias',
//                 id_paciente: 6,
//                 id_medico: 6
//             }
//         ]);
//         // Crear ejemplos en nombre_de_alergias
//         await nombre_Alergia.bulkCreate([
//             { nombre: 'Polen' },
//             { nombre: 'Ácaros del polvo' },
//             { nombre: 'Pelo de animales' },
//             { nombre: 'Mariscos' },
//             { nombre: 'Penicilina' }
//         ]);
//         console.log('Seed completado exitosamente.');
//     } catch (error) {
//         console.error('Error al realizar el seed:', error);
//     }
// }
//# sourceMappingURL=seed.js.map