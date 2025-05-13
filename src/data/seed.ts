import { Admision } from "./models/admision";
import { Pacientes } from "./models/pacientes";
import { Hospital_camas } from "./models/hospital_camas";
import { Paciente_antecedentes_familiares } from "./models/paciente_antecedentes_familiares";
import { Paciente_pruebas_diagnosticas } from "./models/paciente_pruebas_diagnosticas";
import { paciente_terapia_fisica } from "./models/paciente_terapia_fisica";
import { Paciente_seguro_medico } from "./models/paciente_seguro_medico";
import { Paciente_Diagnosticos } from "./models/paciente_diagnosticos";
import { Personal_de_admision } from "./models/personal_de_admision";
import { paciente_cirugias } from "./models/paciente_cirugias";
import { Paciente_Alergias } from "./models/paciente_alergias";
import { Paciente_recetas } from "./models/paciente_recetas";
import { Medicamentos } from "./models/medicamentos";
import { Usuarios } from "./models/usuarios";
import { Medicos } from "./models/medicos";
import { Turnos } from "./models/turnos";
import { Roles } from "./models/roles";
import { Paciente_Evaluacion_Fisica } from "./models/paciente_evaluacion_fisica";
import { paciente_tratamientos } from "./models/paciente_tratamientos";
import { Hospital_habitaciones } from "./models/hospital_habitaciones";
import { Hospital_alas } from "./models/hospital_alas";


import { Enfermero } from "./models/enfermeros";

export async function seedDatabase() {
    try {
        

        // Insertar los datos
        await Paciente_seguro_medico.bulkCreate([
            {
                numero: 1001,
                estado: true,
                categoria: 'Premium'
            },
            {
                numero: 1002,
                estado: true,
                categoria: 'Básico'
            },
            {
                numero: 1003,
                estado: false,
                categoria: 'Estándar'
            },
            {
                numero: 1004,
                estado: true,
                categoria: 'Premium'
            },
            {
                numero: 1005,
                estado: false,
                categoria: 'Básico'
            },
            {
                numero: 1006,
                estado: true,
                categoria: 'Estándar'
            },
            {
                numero: 10033,
                estado: true,
                categoria: 'Estándar'
            }
        ]);

        // Ejemplo para Pacientes
        await Pacientes.bulkCreate([
            {
                nombre: 'Juan',
                apellido: 'Pérez',
                dni: 12345678,
                fecha_nac: new Date('1990-01-01'),
                edad: 35,
                peso: 70.5,
                genero: 'Masculino',
                telefono: 123456789,
                telefono_De_Emergencia: 987654321,
                direccion: 'Calle Falsa 123',
                tipo_sanguineo: 'O+',
                id_seguro_medico: 1
            },
            {
                nombre: 'María',
                apellido: 'Gómez',
                dni: 87654321,
                fecha_nac: new Date('1985-05-15'),
                edad: 40,
                peso: 65.2,
                genero: 'Femenino',
                telefono: 234567890,
                telefono_De_Emergencia: 876543210,
                direccion: 'Avenida Siempreviva 742',
                tipo_sanguineo: 'A-',
                id_seguro_medico: 2
            },
            {
                nombre: 'Carlos',
                apellido: 'López',
                dni: 11223344,
                fecha_nac: new Date('1975-03-20'),
                edad: 50,
                peso: 80.3,
                genero: 'Masculino',
                telefono: 345678901,
                telefono_De_Emergencia: 765432109,
                direccion: 'Boulevard Principal 456',
                tipo_sanguineo: 'B+',
                id_seguro_medico: 3
            },
            {
                nombre: 'Ana',
                apellido: 'Martínez',
                dni: 55667788,
                fecha_nac: new Date('2000-07-10'),
                edad: 25,
                peso: 55.0,
                genero: 'Femenino',
                telefono: 456789012,
                telefono_De_Emergencia: 654321098,
                direccion: 'Calle Secundaria 789',
                tipo_sanguineo: 'AB-',
                id_seguro_medico: 4
            },
            {
                nombre: 'Luis',
                apellido: 'Hernández',
                dni: 99887766,
                fecha_nac: new Date('1995-11-25'),
                edad: 30,
                peso: 75.4,
                genero: 'Masculino',
                telefono: 567890123,
                telefono_De_Emergencia: 543210987,
                direccion: 'Pasaje Oculto 321',
                tipo_sanguineo: 'O-',
                id_seguro_medico: 5
            },
            {
                nombre: 'Laura',
                apellido: 'Fernández',
                dni: 33445566,
                fecha_nac: new Date('1980-09-05'),
                edad: 45,
                peso: 60.8,
                genero: 'Femenino',
                telefono: 678901234,
                telefono_De_Emergencia: 432109876,
                direccion: 'Camino Real 654',
                tipo_sanguineo: 'A+',
                id_seguro_medico: 6
            },
            {
                nombre: 'Prueba',
                apellido: 'Fernández',
                dni: 3333,
                fecha_nac: new Date('1980-09-05'),
                edad: 45,
                peso: 60.8,
                genero: 'Masculino',
                telefono: 678901234,
                telefono_De_Emergencia: 432109876,
                direccion: 'Camino Real 654',
                tipo_sanguineo: 'A+',
                
            }
        ]);

        // Asegurar que los datos de hospital_alas se insertan antes de hospital_habitaciones
        await Hospital_alas.bulkCreate([
            { nombre: 'Ala Norte', cantidad_Habitaciones: 10, unidad: 'Pediatría' },
            { nombre: 'Ala Sur', cantidad_Habitaciones: 15, unidad: 'Traumatología' },
            { nombre: 'Ala Este', cantidad_Habitaciones: 8, unidad: 'Cardiología' },
            { nombre: 'Ala Oeste', cantidad_Habitaciones: 12, unidad: 'Neurología' },
            { nombre: 'Ala Central', cantidad_Habitaciones: 20, unidad: 'Emergencias' },
            { nombre: 'Ala VIP', cantidad_Habitaciones: 5, unidad: 'Privada' }
        ]);

        // Luego insertar los datos de hospital_habitaciones
        await Hospital_habitaciones.bulkCreate([
            { nro_Habitacion: 101, cantidad_Camas: 2, id_ala: 1 },
            { nro_Habitacion: 102, cantidad_Camas: 2, id_ala: 2 },
            { nro_Habitacion: 103, cantidad_Camas: 1, id_ala: 3 },
            { nro_Habitacion: 104, cantidad_Camas: 2, id_ala: 4 },
            { nro_Habitacion: 105, cantidad_Camas: 1, id_ala: 5 },
            { nro_Habitacion: 106, cantidad_Camas: 2, id_ala: 6 }
        ]);

        // Insertar datos en hospital_camas y obtener los IDs generados automáticamente
        const camas = await Hospital_camas.bulkCreate([
            { disponible: false, id_habitacion: 1 },
            { disponible: false, id_habitacion: 2 },
            { disponible: false, id_habitacion: 3 },
            { disponible: false, id_habitacion: 4 },
            { disponible: false, id_habitacion: 5 },
            { disponible: false, id_habitacion: 6 },
            { disponible: true },
            { disponible: true },

        ], { returning: true });

        // Usar los IDs generados para insertar en Admisions
        await Admision.bulkCreate([
            {
                tipo_De_Admision: 'Urgencia',
                estado: 'Activo',
                motivo_De_Internacion: 'Fractura de pierna',
                fecha_De_Admision: new Date('2025-05-01'),
                fecha_De_Actualizacion: new Date('2025-05-01'),
                id_Paciente: 1,
                id_Cama: camas[0].id_Cama
            },
            {
                tipo_De_Admision: 'Programada',
                estado: 'Activo',
                motivo_De_Internacion: 'Chequeo general',
                fecha_De_Admision: new Date('2025-05-02'),
                fecha_De_Actualizacion: new Date('2025-05-02'),
                id_Paciente: 2,
                id_Cama: camas[1].id_Cama
            },
            {
                tipo_De_Admision: 'Urgencia',
                estado: 'Activo',
                motivo_De_Internacion: 'Apendicitis',
                fecha_De_Admision: new Date('2025-05-03'),
                fecha_De_Actualizacion: new Date('2025-05-03'),
                id_Paciente: 3,
                id_Cama: camas[2].id_Cama
            },
            {
                tipo_De_Admision: 'Programada',
                estado: 'Activo',
                motivo_De_Internacion: 'Cirugía de rodilla',
                fecha_De_Admision: new Date('2025-05-04'),
                fecha_De_Actualizacion: new Date('2025-05-04'),
                id_Paciente: 4,
                id_Cama: camas[3].id_Cama
            },
            {
                tipo_De_Admision: 'Urgencia',
                estado: 'Activo',
                motivo_De_Internacion: 'Accidente automovilístico',
                fecha_De_Admision: new Date('2025-05-05'),
                fecha_De_Actualizacion: new Date('2025-05-05'),
                id_Paciente: 5,
                id_Cama: camas[4].id_Cama
            },
            {
                tipo_De_Admision: 'Programada',
                estado: 'Activo',
                motivo_De_Internacion: 'Rehabilitación postoperatoria',
                fecha_De_Admision: new Date('2025-05-06'),
                fecha_De_Actualizacion: new Date('2025-05-06'),
                id_Paciente: 6,
                id_Cama: camas[5].id_Cama
            }
        ]);

       

        // Repite el proceso para cada modelo con sus respectivos atributos y ejemplos
        // Ejemplo de seed para el modelo Paciente_antecedentes_familiares
        await Paciente_antecedentes_familiares.bulkCreate([
            {
                nombre_Enfermedad: 'Diabetes tipo 2',
                detalles: 'Presente en la familia desde hace dos generaciones.',
                lazo_familiar: 'Padre',
                id_Paciente: 1
            },
            {
                nombre_Enfermedad: 'Hipertensión arterial',
                detalles: 'Historial de hipertensión en la familia materna.',
                lazo_familiar: 'Madre',
                id_Paciente: 2
            },
            {
                nombre_Enfermedad: 'Cáncer de colon',
                detalles: 'Diagnóstico en un familiar cercano.',
                lazo_familiar: 'Tío',
                id_Paciente: 3
            },
            {
                nombre_Enfermedad: 'Asma',
                detalles: 'Condición hereditaria en la familia.',
                lazo_familiar: 'Hermano',
                id_Paciente: 4
            },
            {
                nombre_Enfermedad: 'Enfermedad cardíaca',
                detalles: 'Problemas cardíacos recurrentes en la familia.',
                lazo_familiar: 'Abuelo',
                id_Paciente: 5
            },
            {
                nombre_Enfermedad: 'Artritis reumatoide',
                detalles: 'Condición presente en familiares cercanos.',
                lazo_familiar: 'Tía',
                id_Paciente: 6
            }
        ]);

        // Ejemplo de seed para el modelo Usuarios
        await Usuarios.bulkCreate([
            { email: 'usuario1@example.com', password_hash: 'hashedpassword1', activo: true, intentos_fallidos: 0 },
            { email: 'usuario2@example.com', password_hash: 'hashedpassword2', activo: true, intentos_fallidos: 0 },
            { email: 'usuario3@example.com', password_hash: 'hashedpassword3', activo: true, intentos_fallidos: 0 },
            { email: 'usuario4@example.com', password_hash: 'hashedpassword4', activo: true, intentos_fallidos: 0 },
            { email: 'usuario5@example.com', password_hash: 'hashedpassword5', activo: true, intentos_fallidos: 0 },
            { email: 'usuario6@example.com', password_hash: 'hashedpassword6', activo: true, intentos_fallidos: 0 }
        ]);

        // Ejemplo de seed para el modelo Medicos
        await Medicos.bulkCreate([
            {
                nombre: 'Dr. Juan',
                apellido: 'Pérez',
                dni: 12345678,
                fecha_nac: new Date('1980-01-01'),
                edad: 45,
                peso: 70.5,
                genero: 'Masculino',
                telefono: 123456789,
                telefono_De_Emergencia: 987654321,
                direccion: 'Calle Principal 123',
                especialidad: 'Cardiología',
                id_usuario: 1
            },
            {
                nombre: 'Dra. Ana',
                apellido: 'Gómez',
                dni: 87654321,
                fecha_nac: new Date('1985-05-15'),
                edad: 40,
                peso: 65.2,
                genero: 'Femenino',
                telefono: 234567890,
                telefono_De_Emergencia: 876543210,
                direccion: 'Avenida Central 456',
                especialidad: 'Neurología',
                id_usuario: 2
            },
            {
                nombre: 'Dr. Carlos',
                apellido: 'López',
                dni: 11223344,
                fecha_nac: new Date('1975-03-20'),
                edad: 50,
                peso: 80.3,
                genero: 'Masculino',
                telefono: 345678901,
                telefono_De_Emergencia: 765432109,
                direccion: 'Boulevard Secundario 789',
                especialidad: 'Traumatología',
                id_usuario: 3
            },
            {
                nombre: 'Dra. María',
                apellido: 'Martínez',
                dni: 55667788,
                fecha_nac: new Date('1990-07-10'),
                edad: 35,
                peso: 55.0,
                genero: 'Femenino',
                telefono: 456789012,
                telefono_De_Emergencia: 654321098,
                direccion: 'Calle Tercera 321',
                especialidad: 'Pediatría',
                id_usuario: 4
            },
            {
                nombre: 'Dr. Luis',
                apellido: 'Hernández',
                dni: 99887766,
                fecha_nac: new Date('1970-11-25'),
                edad: 55,
                peso: 75.4,
                genero: 'Masculino',
                telefono: 567890123,
                telefono_De_Emergencia: 543210987,
                direccion: 'Pasaje Cuarto 654',
                especialidad: 'Dermatología',
                id_usuario: 5
            },
            {
                nombre: 'Dra. Laura',
                apellido: 'Fernández',
                dni: 33445566,
                fecha_nac: new Date('1980-09-05'),
                edad: 45,
                peso: 60.8,
                genero: 'Femenino',
                telefono: 678901234,
                telefono_De_Emergencia: 432109876,
                direccion: 'Camino Real 987',
                especialidad: 'Ginecología',
                id_usuario: 6
            }
        ]);

        // Insertar datos en medicamentos antes de paciente_tratamientos
        await Medicamentos.bulkCreate([
            {
                nombre: 'Paracetamol',
                tipo: 'Analgésico',
                dosis_Recomendada: 500,
                cantidad_Contenida: 20,
                codigo: 1001
            },
            {
                nombre: 'Ibuprofeno',
                tipo: 'Antiinflamatorio',
                dosis_Recomendada: 400,
                cantidad_Contenida: 30,
                codigo: 1002
            },
            {
                nombre: 'Amoxicilina',
                tipo: 'Antibiótico',
                dosis_Recomendada: 250,
                cantidad_Contenida: 15,
                codigo: 1003
            },
            {
                nombre: 'Loratadina',
                tipo: 'Antihistamínico',
                dosis_Recomendada: 10,
                cantidad_Contenida: 10,
                codigo: 1004
            },
            {
                nombre: 'Metformina',
                tipo: 'Antidiabético',
                dosis_Recomendada: 850,
                cantidad_Contenida: 60,
                codigo: 1005
            },
            {
                nombre: 'Omeprazol',
                tipo: 'Inhibidor de la bomba de protones',
                dosis_Recomendada: 20,
                cantidad_Contenida: 14,
                codigo: 1006
            }
        ]);

        // Insertar datos en enfermeros antes de paciente_tratamientos
        await Enfermero.bulkCreate([
            {
                nombre: 'Enfermero Juan',
                apellido: 'Pérez',
                dni: 12345678,
                fecha_nac: new Date('1980-01-01'),
                edad: 45,
                peso: 70.5,
                genero: 'Masculino',
                telefono: 123456789,
                telefono_De_Emergencia: 987654321,
                direccion: 'Calle Principal 123',
                tipo_sanguineo: 'O+',
                id_usuario: 1
            },
            {
                nombre: 'Enfermera Ana',
                apellido: 'Gómez',
                dni: 87654321,
                fecha_nac: new Date('1985-05-15'),
                edad: 40,
                peso: 65.2,
                genero: 'Femenino',
                telefono: 234567890,
                telefono_De_Emergencia: 876543210,
                direccion: 'Avenida Central 456',
                tipo_sanguineo: 'A-',
                id_usuario: 2
            },
            {
                nombre: 'Enfermero Carlos',
                apellido: 'López',
                dni: 11223344,
                fecha_nac: new Date('1975-03-20'),
                edad: 50,
                peso: 80.3,
                genero: 'Masculino',
                telefono: 345678901,
                telefono_De_Emergencia: 765432109,
                direccion: 'Boulevard Secundario 789',
                tipo_sanguineo: 'B+',
                id_usuario: 3
            },
            {
                nombre: 'Enfermera María',
                apellido: 'Martínez',
                dni: 55667788,
                fecha_nac: new Date('1990-07-10'),
                edad: 35,
                peso: 55.0,
                genero: 'Femenino',
                telefono: 456789012,
                telefono_De_Emergencia: 654321098,
                direccion: 'Calle Tercera 321',
                tipo_sanguineo: 'AB-',
                id_usuario: 4
            },
            {
                nombre: 'Enfermero Luis',
                apellido: 'Hernández',
                dni: 99887766,
                fecha_nac: new Date('1970-11-25'),
                edad: 55,
                peso: 75.4,
                genero: 'Masculino',
                telefono: 567890123,
                telefono_De_Emergencia: 543210987,
                direccion: 'Pasaje Cuarto 654',
                tipo_sanguineo: 'O-',
                id_usuario: 5
            },
            {
                nombre: 'Enfermera Laura',
                apellido: 'Fernández',
                dni: 33445566,
                fecha_nac: new Date('1980-09-05'),
                edad: 45,
                peso: 60.8,
                genero: 'Femenino',
                telefono: 678901234,
                telefono_De_Emergencia: 432109876,
                direccion: 'Camino Real 987',
                tipo_sanguineo: 'A+',
                id_usuario: 6
            }
        ]);

        // Ejemplo de seed para el modelo paciente_tratamientos
        await paciente_tratamientos.bulkCreate([
            {
                tipo: 'Fisioterapia',
                detalle: 'Rehabilitación de rodilla',
                cantidad_suministrada: 10,
                fecha_de_inicio: new Date('2025-05-01'),
                fecha_de_fin: new Date('2025-05-10'),
                id_paciente: 1,
                id_medicamento: 1,
                id_enfermero: 1
            },
            {
                tipo: 'Medicación',
                detalle: 'Tratamiento para hipertensión',
                cantidad_suministrada: 20,
                fecha_de_inicio: new Date('2025-05-02'),
                fecha_de_fin: new Date('2025-05-12'),
                id_paciente: 2,
                id_medicamento: 2,
                id_enfermero: 2
            },
            {
                tipo: 'Terapia ocupacional',
                detalle: 'Mejorar habilidades motoras',
                cantidad_suministrada: 15,
                fecha_de_inicio: new Date('2025-05-03'),
                fecha_de_fin: new Date('2025-05-13'),
                id_paciente: 3,
                id_medicamento: 3,
                id_enfermero: 3
            },
            {
                tipo: 'Rehabilitación',
                detalle: 'Recuperación postoperatoria',
                cantidad_suministrada: 12,
                fecha_de_inicio: new Date('2025-05-04'),
                fecha_de_fin: new Date('2025-05-14'),
                id_paciente: 4,
                id_medicamento: 4,
                id_enfermero: 4
            },
            {
                tipo: 'Fisioterapia',
                detalle: 'Fortalecimiento muscular',
                cantidad_suministrada: 8,
                fecha_de_inicio: new Date('2025-05-05'),
                fecha_de_fin: new Date('2025-05-15'),
                id_paciente: 5,
                id_medicamento: 5,
                id_enfermero: 5
            },
            {
                tipo: 'Medicación',
                detalle: 'Control de diabetes',
                cantidad_suministrada: 25,
                fecha_de_inicio: new Date('2025-05-06'),
                fecha_de_fin: new Date('2025-05-16'),
                id_paciente: 6,
                id_medicamento: 6,
                id_enfermero: 6
            }
        ]);

        // Ejemplo de seed para el modelo Paciente_Diagnosticos
        await Paciente_Diagnosticos.bulkCreate([
            {
                fecha: new Date('2025-05-01'),
                nombre: 'Diagnóstico 1',
                sintomas: 'Síntomas 1',
                detalles: 'Detalles 1',
                id_medico: 1,
                id_paciente: 1,
                id_tratamiento: 1
            },
            {
                fecha: new Date('2025-05-02'),
                nombre: 'Diagnóstico 2',
                sintomas: 'Síntomas 2',
                detalles: 'Detalles 2',
                id_medico: 2,
                id_paciente: 2,
                id_tratamiento: 2
            },
            {
                fecha: new Date('2025-05-03'),
                nombre: 'Diagnóstico 3',
                sintomas: 'Síntomas 3',
                detalles: 'Detalles 3',
                id_medico: 3,
                id_paciente: 3,
                id_tratamiento: 3
            },
            {
                fecha: new Date('2025-05-04'),
                nombre: 'Diagnóstico 4',
                sintomas: 'Síntomas 4',
                detalles: 'Detalles 4',
                id_medico: 4,
                id_paciente: 4,
                id_tratamiento: 4
            },
            {
                fecha: new Date('2025-05-05'),
                nombre: 'Diagnóstico 5',
                sintomas: 'Síntomas 5',
                detalles: 'Detalles 5',
                id_medico: 5,
                id_paciente: 5,
                id_tratamiento: 5
            },
            {
                fecha: new Date('2025-05-06'),
                nombre: 'Diagnóstico 6',
                sintomas: 'Síntomas 6',
                detalles: 'Detalles 6',
                id_medico: 6,
                id_paciente: 6,
                id_tratamiento: 6
            }
        ]);

        // Ejemplo de seed para el modelo Paciente_pruebas_diagnosticas
        await Paciente_pruebas_diagnosticas.bulkCreate([
            {
                nombre: 'Radiografía de tórax',
                resultado: 'Sin anomalías detectadas.',
                id_diagnostico: 1,
                id_paciente: 1
            },
            {
                nombre: 'Análisis de sangre',
                resultado: 'Niveles normales de hemoglobina.',
                id_diagnostico: 2,
                id_paciente: 2
            },
            {
                nombre: 'Electrocardiograma',
                resultado: 'Ritmo cardíaco normal.',
                id_diagnostico: 3,
                id_paciente: 3
            },
            {
                nombre: 'Tomografía computarizada',
                resultado: 'No se detectaron masas anormales.',
                id_diagnostico: 4,
                id_paciente: 4
            },
            {
                nombre: 'Prueba de función pulmonar',
                resultado: 'Capacidad pulmonar dentro del rango normal.',
                id_diagnostico: 5,
                id_paciente: 5
            },
            {
                nombre: 'Ecografía abdominal',
                resultado: 'Órganos abdominales sin alteraciones.',
                id_diagnostico: 6,
                id_paciente: 6
            }
        ]);

        // Ejemplo de seed para el modelo paciente_terapia_fisica
        await paciente_terapia_fisica.bulkCreate([
            {
                fecha: new Date('2025-05-01'),
                nombre: 'Rehabilitación de rodilla',
                duracion: 30,
                id_paciente: 1,
                id_tratamiento: 1
            },
            {
                fecha: new Date('2025-05-02'),
                nombre: 'Terapia de espalda',
                duracion: 45,
                id_paciente: 2,
                id_tratamiento: 2
            },
            {
                fecha: new Date('2025-05-03'),
                nombre: 'Fortalecimiento muscular',
                duracion: 60,
                id_paciente: 3,
                id_tratamiento: 3
            },
            {
                fecha: new Date('2025-05-04'),
                nombre: 'Terapia de equilibrio',
                duracion: 40,
                id_paciente: 4,
                id_tratamiento: 4
            },
            {
                fecha: new Date('2025-05-05'),
                nombre: 'Rehabilitación postoperatoria',
                duracion: 50,
                id_paciente: 5,
                id_tratamiento: 5
            },
            {
                fecha: new Date('2025-05-06'),
                nombre: 'Terapia de movilidad',
                duracion: 35,
                id_paciente: 6,
                id_tratamiento: 6
            }
        ]);

        // Ejemplo de seed para el modelo Personal_de_admision
        await Personal_de_admision.bulkCreate([
            {
                nombre: 'Carlos',
                apellido: 'González',
                dni: 12345678,
                fecha_nac: new Date('1980-01-01'),
                edad: 45,
                genero: 'Masculino',
                telefono: 123456789,
                telefono_De_Emergencia: 987654321,
                direccion: 'Calle Principal 123',
                tipo_sanguineo: 'O+',
                id_usuario: 1
            },
            {
                nombre: 'Ana',
                apellido: 'Martínez',
                dni: 87654321,
                fecha_nac: new Date('1985-05-15'),
                edad: 40,
                genero: 'Femenino',
                telefono: 234567890,
                telefono_De_Emergencia: 876543210,
                direccion: 'Avenida Central 456',
                tipo_sanguineo: 'A-',
                id_usuario: 2
            },
            {
                nombre: 'Luis',
                apellido: 'Hernández',
                dni: 11223344,
                fecha_nac: new Date('1990-03-20'),
                edad: 35,
                genero: 'Masculino',
                telefono: 345678901,
                telefono_De_Emergencia: 765432109,
                direccion: 'Boulevard Secundario 789',
                tipo_sanguineo: 'B+',
                id_usuario: 3
            },
            {
                nombre: 'María',
                apellido: 'López',
                dni: 55667788,
                fecha_nac: new Date('1995-07-10'),
                edad: 30,
                genero: 'Femenino',
                telefono: 456789012,
                telefono_De_Emergencia: 654321098,
                direccion: 'Calle Tercera 321',
                tipo_sanguineo: 'AB-',
                id_usuario: 4
            },
            {
                nombre: 'Jorge',
                apellido: 'Pérez',
                dni: 99887766,
                fecha_nac: new Date('1975-11-25'),
                edad: 50,
                genero: 'Masculino',
                telefono: 567890123,
                telefono_De_Emergencia: 543210987,
                direccion: 'Pasaje Cuarto 654',
                tipo_sanguineo: 'O-',
                id_usuario: 5
            },
            {
                nombre: 'Laura',
                apellido: 'Fernández',
                dni: 33445566,
                fecha_nac: new Date('1980-09-05'),
                edad: 45,
                genero: 'Femenino',
                telefono: 678901234,
                telefono_De_Emergencia: 432109876,
                direccion: 'Camino Real 987',
                tipo_sanguineo: 'A+',
                id_usuario: 6
            }
        ]);

        // Ejemplo de seed para el modelo paciente_cirugias
        await paciente_cirugias.bulkCreate([
            {
                fecha: new Date('2025-05-01'),
                nombre: 'Cirugía de rodilla',
                descripcion: 'Reparación de ligamentos cruzados.',
                id_medico: 1,
                id_paciente: 1
            },
            {
                fecha: new Date('2025-05-02'),
                nombre: 'Cirugía de cadera',
                descripcion: 'Reemplazo total de cadera.',
                id_medico: 2,
                id_paciente: 2
            },
            {
                fecha: new Date('2025-05-03'),
                nombre: 'Cirugía de corazón',
                descripcion: 'Bypass coronario.',
                id_medico: 3,
                id_paciente: 3
            },
            {
                fecha: new Date('2025-05-04'),
                nombre: 'Cirugía de columna',
                descripcion: 'Fusión espinal.',
                id_medico: 4,
                id_paciente: 4
            },
            {
                fecha: new Date('2025-05-05'),
                nombre: 'Cirugía de mano',
                descripcion: 'Reparación de tendones.',
                id_medico: 5,
                id_paciente: 5
            },
            {
                fecha: new Date('2025-05-06'),
                nombre: 'Cirugía ocular',
                descripcion: 'Corrección de cataratas.',
                id_medico: 6,
                id_paciente: 6
            }
        ]);

        // Ejemplo de seed para el modelo Paciente_Alergias
        await Paciente_Alergias.bulkCreate([
            {
                nombre: 'Polen',
                descripcion: 'Reacción alérgica severa al polen.',
                id_paciente: 1,
                id_tratamiento: 1
            },
            {
                nombre: 'Ácaros',
                descripcion: 'Alergia a los ácaros del polvo.',
                id_paciente: 2,
                id_tratamiento: 2
            },
            {
                nombre: 'Lácteos',
                descripcion: 'Intolerancia severa a la lactosa.',
                id_paciente: 3,
                id_tratamiento: 3
            },
            {
                nombre: 'Frutos secos',
                descripcion: 'Alergia a nueces y almendras.',
                id_paciente: 4,
                id_tratamiento: 4
            },
            {
                nombre: 'Mariscos',
                descripcion: 'Reacción alérgica a camarones y cangrejo.',
                id_paciente: 5,
                id_tratamiento: 5
            },
            {
                nombre: 'Medicamentos',
                descripcion: 'Alergia a la penicilina.',
                id_paciente: 6,
                id_tratamiento: 6
            }
        ]);

        // Ejemplo de seed para el modelo Paciente_recetas
        await Paciente_recetas.bulkCreate([
            {
                fecha: new Date('2025-05-01'),
                id_paciente: 1,
                id_medico: 1,
                id_medicamento: 1
            },
            {
                fecha: new Date('2025-05-02'),
                id_paciente: 2,
                id_medico: 2,
                id_medicamento: 2
            },
            {
                fecha: new Date('2025-05-03'),
                id_paciente: 3,
                id_medico: 3,
                id_medicamento: 3
            },
            {
                fecha: new Date('2025-05-04'),
                id_paciente: 4,
                id_medico: 4,
                id_medicamento: 4
            },
            {
                fecha: new Date('2025-05-05'),
                id_paciente: 5,
                id_medico: 5,
                id_medicamento: 5
            },
            {
                fecha: new Date('2025-05-06'),
                id_paciente: 6,
                id_medico: 6,
                id_medicamento: 6
            }
        ]);

        // Ejemplo de seed para el modelo Roles
        await Roles.bulkCreate([
            {
                nombre: 'Administrador'
            },
            {
                nombre: 'Médico'
            },
            {
                nombre: 'Enfermero'
            },            
            {
                nombre: 'Paciente'
            }
            
        ]);

        // Ejemplo de seed para el modelo Turnos
        await Turnos.bulkCreate([
            {
                fecha: new Date('2025-05-10'),
                horario: new Date('2025-05-10T08:00:00'),
                motivo: 'Consulta general',
                id_paciente: 1,
                id_medico: 1
            },
            {
                fecha: new Date('2025-05-11'),
                horario: new Date('2025-05-11T09:00:00'),
                motivo: 'Revisión postoperatoria',
                id_paciente: 2,
                id_medico: 2
            },
            {
                fecha: new Date('2025-05-12'),
                horario: new Date('2025-05-12T10:00:00'),
                motivo: 'Chequeo anual',
                id_paciente: 3,
                id_medico: 3
            },
            {
                fecha: new Date('2025-05-13'),
                horario: new Date('2025-05-13T11:00:00'),
                motivo: 'Control de presión arterial',
                id_paciente: 4,
                id_medico: 4
            },
            {
                fecha: new Date('2025-05-14'),
                horario: new Date('2025-05-14T12:00:00'),
                motivo: 'Consulta por dolor de espalda',
                id_paciente: 5,
                id_medico: 5
            },
            {
                fecha: new Date('2025-05-15'),
                horario: new Date('2025-05-15T13:00:00'),
                motivo: 'Evaluación de alergias',
                id_paciente: 6,
                id_medico: 6
            }
        ]);

       

        // Ejemplo de seed para el modelo Paciente_Evaluacion_Fisica
        await Paciente_Evaluacion_Fisica.bulkCreate([
            {
                presion_arterial: 120,
                frecuencia_cardiaca: 80,
                color_de_piel: 'Normal',
                respuesta_a_estimulos: 'Adecuada',
                paciente_id: 1,
                enfermero_id: 1
            },
            {
                presion_arterial: 130,
                frecuencia_cardiaca: 85,
                color_de_piel: 'Pálida',
                respuesta_a_estimulos: 'Lenta',
                paciente_id: 2,
                enfermero_id: 2
            },
            {
                presion_arterial: 110,
                frecuencia_cardiaca: 75,
                color_de_piel: 'Normal',
                respuesta_a_estimulos: 'Adecuada',
                paciente_id: 3,
                enfermero_id: 3
            },
            {
                presion_arterial: 140,
                frecuencia_cardiaca: 90,
                color_de_piel: 'Rojiza',
                respuesta_a_estimulos: 'Adecuada',
                paciente_id: 4,
                enfermero_id: 4
            },
            {
                presion_arterial: 125,
                frecuencia_cardiaca: 78,
                color_de_piel: 'Normal',
                respuesta_a_estimulos: 'Adecuada',
                paciente_id: 5,
                enfermero_id: 5
            },
            {
                presion_arterial: 135,
                frecuencia_cardiaca: 82,
                color_de_piel: 'Pálida',
                respuesta_a_estimulos: 'Lenta',
                paciente_id: 6,
                enfermero_id: 6
            }
        ]);

        console.log('Seed completado exitosamente.');
    } catch (error) {
        console.error('Error al realizar el seed:', error);
    }
}