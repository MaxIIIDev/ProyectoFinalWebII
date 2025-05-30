INSERT INTO `roles` (`id_Rol`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Médico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Enfermero', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Admisión', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `categoriasseguros` (`id_Categoria_Seguro`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Platinum', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Gold', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Silver', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Bronze', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `mutuales` (`id_mutual`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'OSDE', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Swiss Medical', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Galeno', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Medifé', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Omint', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `tipo_sanguineo` (`id_tipo_sanguineo`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'A+', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'A-', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'B+', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'B-', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'AB+', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(6, 'AB-', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(7, 'O+', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(8, 'O-', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(9, 'No especificado', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `especialidades` (`id_Especialidad`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Cardiología', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Pediatría', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Traumatología', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Neurología', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Dermatología', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `tipo_de_tratamiento` (`id_Tipo_De_Tratamiento`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Medicación oral', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Inyección', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Terapia física', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Cirugía', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Terapia psicológica', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `tipo_de_medicamento` (`id_tipo_de_medicamento`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Analgésico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Antibiótico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Antiinflamatorio', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Antihistamínico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Antipirético', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `tipo_de_diagnostico` (`id_tipo_de_diagnostico`, `nombre`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 'Presuntivo', 'Diagnóstico basado en síntomas iniciales', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Definitivo', 'Diagnóstico confirmado con pruebas', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Diferencial', 'Lista de posibles diagnósticos', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Anatomopatológico', 'Basado en estudios de tejidos', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `nombre_alergia` (`id_nombre_alergia`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Penicilina', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Ácaros', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Polen', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Mariscos', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Látex', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `nombre_cirugia` (`id_nombre_cirugia`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Apéndice', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Vesícula', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Rodilla', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Cesárea', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Bypass gástrico', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `nombre_prueba_diagnostica` (`id_nombre_prueba_diagnostica`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Análisis de sangre', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Radiografía', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Resonancia magnética', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Electrocardiograma', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Endoscopía', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `hospital_alas` (`id_Ala`, `nombre`, `cantidad_Habitaciones`, `unidad`, `createdAt`, `updatedAt`) VALUES
(1, 'Ala Norte', 10, 'Cardiología', '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(2, 'Ala Sur', 8, 'Pediatría', '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(3, 'Ala Este', 12, 'Cirugía', '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(4, 'Ala Oeste', 6, 'Terapia Intensiva', '2025-05-18 04:56:34', '2025-05-18 04:56:34');

INSERT INTO `motivo_de_internacion` (`id_motivo_de_Internacion`, `motivo`, `createdAt`, `updatedAt`) VALUES
(1, 'Cirugía programada', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Emergencia médica', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Observación', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Parto', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Tratamiento intensivo', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `tipo_de_admision` (`id_tipo_de_admision`, `tipo`, `createdAt`, `updatedAt`) VALUES
(1, 'Programada', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Derivacion Medica', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Emergencia', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Traslado', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `prioridad_de_atencion` (`id_prioridad_de_atencion`, `prioridad`, `createdAt`, `updatedAt`) VALUES
(1, 'Crítica', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Urgente', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Estable', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Rutinaria', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `horarios_turnos` (`id_horario_turno`, `hora`, `createdAt`, `updatedAt`) VALUES
(1, '08:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, '08:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, '08:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, '09:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, '09:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(6, '09:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(7, '10:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(8, '10:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(9, '10:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(10, '11:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(11, '11:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(12, '11:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(13, '12:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(14, '12:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(15, '12:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(16, '13:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(17, '13:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(18, '13:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(19, '14:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(20, '14:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(21, '14:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(22, '15:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(23, '15:20', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(24, '15:40', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(25, '16:00', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

INSERT INTO `usuarios` (`id_Usuario`, `email`, `password_hash`, `activo`, `intentos_fallidos`, `id_Rol`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 'medico1@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 2, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(3, 'medico2@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 2, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(4, 'enfermero1@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 3, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 'admision1@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 4, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

INSERT INTO `paciente_seguro_medico` (`id_seguro_medico`, `id_mutual`, `numero`, `estado`, `id_categoria_seguro`, `createdAt`, `updatedAt`) VALUES
(1, 1, 123456, 1, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 2, 654321, 1, 2, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(3, 3, 987654, 1, 3, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(4, 4, 456789, 1, 4, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 5, 789123, 1, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

INSERT INTO `medicamentos` (`id_Medicamento`, `nombre`, `id_tipo_de_medicamento`, `dosis_Recomendada`, `cantidad_Contenida`, `codigo`, `createdAt`, `updatedAt`) VALUES
(1, 'Ibuprofeno', 1, 400, 20, 1001, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 'Amoxicilina', 2, 500, 10, 1002, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(3, 'Paracetamol', 5, 500, 30, 1003, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(4, 'Diclofenac', 3, 50, 20, 1004, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 'Loratadina', 4, 10, 15, 1005, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

INSERT INTO `hospital_habitaciones` ( `nro_Habitacion`, `cantidad_Camas`, `id_ala`, `createdAt`, `updatedAt`) VALUES
( 101, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 102, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 201, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 202, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 301, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 401, 2, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 103, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 104, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 105, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 106, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 107, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 108, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 109, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 110, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 203, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 204, 1, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 205, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 206, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 207, 1, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 208, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 302, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 303, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 304, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 305, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 306, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 307, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 308, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 309, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 310, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 311, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 312, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 403, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 404, 2, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 405, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
( 406, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34');

INSERT INTO `medicos` (`id_Medico`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `peso`, `genero`, `telefono`, `telefono_De_Emergencia`, `direccion`, `id_Especialidad`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan', 'Pérez', 30123456, '1975-05-15 00:00:00', 48, 75.5, 'Masculino', 1145678901, 1198765432, 'Av. Siempreviva 742', 1, 2, '2025-05-18 04:56:22', '2025-05-18 04:56:22'),
(2, 'María', 'Gómez', 28987654, '1980-08-22 00:00:00', 43, 62.3, 'Femenino', 1156789012, 1198765433, 'Calle Falsa 123', 2, 3, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

INSERT INTO `enfermeros` (`id_Enfermero`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `peso`, `genero`, `telefono`, `telefono_de_emergencia`, `direccion`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Carlos', 'López', 25678901, '1985-03-10 00:00:00', 38, 80.2, 'Masculino', 1167890123, 1198765434, 'Av. Libertador 2048', 4, '2025-05-18 04:56:22', '2025-05-18 04:56:22'),
(2, 'Ana', 'Martínez', 27890123, '1988-11-25 00:00:00', 35, 58.7, 'Femenino', 1178901234, 1198765435, 'Calle 13 456', NULL, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

INSERT INTO `personal_de_admision` (`id_personal_de_admision`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `genero`, `telefono`, `telefono_De_Emergencia`, `direccion`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Laura', 'Rodríguez', 29012345, '1990-07-18 00:00:00', 33, 'Femenino', 1189012345, 1198765436, 'Av. Corrientes 1234', 5, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

INSERT INTO `pacientes` (`id_Paciente`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `peso`, `genero`, `telefono`, `telefono_De_Emergencia`, `direccion`, `id_tipo_sanguineo`, `id_seguro_medico`, `createdAt`, `updatedAt`) VALUES
(1, 'Roberto', 'García', 20123456, '1980-02-15 00:00:00', 43, 78.5, 'Masculino', 1156789012, 1198765432, 'Calle 123 456', 1, 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Lucía', 'Fernández', 28987654, '1995-07-22 00:00:00', 28, 62, 'Femenino', 1167890123, 1198765433, 'Av. Rivadavia 2048', 3, 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Pedro', 'Sánchez', 18765432, '1972-11-30 00:00:00', 51, 85.3, 'Masculino', 1178901234, 1198765434, 'Calle Florida 100', 5, 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Sofía', 'López', 32123456, '2005-05-10 00:00:00', 18, 55.7, 'Femenino', 1189012345, 1198765435, 'Av. Santa Fe 1234', 7, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Miguel', 'Díaz', 23456789, '1990-09-18 00:00:00', 33, 70.2, 'Masculino', 1190123456, 1198765436, 'Calle Corrientes 567', 2, 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

INSERT INTO `hospital_camas` (`id_Cama`, `disponible`, `id_habitacion`, `createdAt`, `updatedAt`) VALUES
(1, 0, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(2, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(3, 0, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(4, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(5, 0, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(6, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(7, 0, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(8, 1, 5, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(9, 0, 6, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(10, 1, 6, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(11, 1, 7, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(12, 1, 7, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(13, 1, 8, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(14, 1, 9, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(15, 1, 9, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(16, 1, 10, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(17, 1, 10, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(18, 1, 11, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(19, 1, 12, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(20, 1, 12, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(21, 1, 13, '2025-05-18 04:56:34', '2025-05-18 04:56:34')
(22, 1, 14, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(23, 1, 14, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(24, 1, 15, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(25, 1, 15, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(26, 1, 16, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(27, 1, 17, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(28, 1, 17, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(29, 1, 18, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(30, 1, 18, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(31, 1, 19, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(32, 1, 20, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(33, 1, 20, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(34, 1, 21, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(35, 1, 22, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(36, 1, 22, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(37, 1, 23, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(38, 1, 24, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(39, 1, 24, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(40, 1, 25, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),

(41, 1, 26, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(42, 1, 26, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(43, 1, 27, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(44, 1, 28, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(45, 1, 28, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(46, 1, 29, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(47, 1, 30, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(48, 1, 30, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(49, 1, 31, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(50, 1, 32, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(51, 1, 33, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(52, 1, 33, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(53, 1, 34, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(54, 1, 35, '2025-05-18 04:56:34', '2025-05-18 04:56:34');

INSERT INTO `paciente_tratamientos` (`id_tratamiento`, `id_tipo_de_tratamiento`, `detalle`, `cantidad_suministrada`, `fecha_de_inicio`, `fecha_de_fin`, `id_paciente`, `id_medicamento`, `id_enfermero`, `updatedAt`) VALUES
(1, 1, 'Ibuprofeno cada 8 horas por 5 días', 10, '2023-05-18 10:15:00', '2023-05-23 00:00:00', 1, 1, 1, '2025-05-18 04:57:30'),
(2, 2, 'Amoxicilina inyectable cada 12 horas por 7 días', 7, '2023-05-18 10:45:00', '2023-05-25 00:00:00', 2, 2, 1, '2025-05-18 04:57:30'),
(3, 1, 'Paracetamol cada 6 horas por dolor', 15, '2023-05-18 11:15:00', '2023-05-21 00:00:00', 3, 3, 2, '2025-05-18 04:57:30'),
(4, 1, 'Loratadina diaria por alergia', 7, '2023-05-18 11:45:00', '2023-05-25 00:00:00', 4, 5, 2, '2025-05-18 04:57:30'),
(5, 1, 'Diclofenac cada 12 horas por 3 días', 6, '2023-05-18 12:15:00', '2023-05-21 00:00:00', 5, 4, 1, '2025-05-18 04:57:30');

INSERT INTO `paciente_evaluacion_fisica` (`id_Evaluacion_fisica`, `fecha`, `presion_arterial`, `frecuencia_cardiaca`, `color_de_piel`, `respuesta_a_estimulos`, `paciente_id`, `enfermero_id`, `updatedAt`) VALUES
(1, '2023-05-18 09:30:00', 120, 75, 'Normal', 'Alert', 1, 1, '2025-05-18 04:57:09'),
(2, '2023-05-18 10:00:00', 130, 80, 'Pálido', 'Alert', 2, 1, '2025-05-18 04:57:09'),
(3, '2023-05-18 10:45:00', 110, 70, 'Normal', 'Alert', 3, 2, '2025-05-18 04:57:09'),
(4, '2023-05-18 11:15:00', 115, 78, 'Normal', 'Alert', 4, 2, '2025-05-18 04:57:09'),
(5, '2023-05-18 11:45:00', 125, 82, 'Normal', 'Alert', 5, 1, '2025-05-18 04:57:09');

INSERT INTO `paciente_recetas` (`id_Receta`, `fecha`, `id_paciente`, `id_medico`, `id_medicamento`, `updatedAt`) VALUES
(1, '2023-05-18 10:15:00', 1, 1, 1, '2025-05-18 05:00:59'),
(2, '2023-05-18 10:45:00', 2, 2, 2, '2025-05-18 05:00:59'),
(3, '2023-05-18 11:15:00', 3, 1, 3, '2025-05-18 05:00:59'),
(4, '2023-05-18 11:45:00', 4, 2, 5, '2025-05-18 05:00:59'),
(5, '2023-05-18 12:15:00', 5, 1, 4, '2025-05-18 05:00:59');

INSERT INTO `paciente_cirugias` (`id_cirugia`, `fecha`, `id_nombre_cirugia`, `descripcion`, `id_medico`, `id_paciente`, `createdAt`, `updatedAt`) VALUES
(1, '2020-05-15 10:30:00', 1, 'Apendicectomía por apendicitis aguda', 1, 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, '2021-03-22 08:45:00', 3, 'Artroscopía de rodilla derecha', 2, 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, '2022-11-10 14:15:00', 2, 'Colecistectomía laparoscópica', 1, 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

INSERT INTO `paciente_antecedentes_familiares` (`id_Antecedente_Familiar`, `nombre_Enfermedad`, `detalles`, `id_Paciente`, `createdAt`, `updatedAt`) VALUES
(1, 'Diabetes', 'Padre con diabetes tipo 2', 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Hipertensión', 'Madre con hipertensión arterial', 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Cáncer de pulmón', 'Abuelo materno fallecido por cáncer de pulmón', 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Asma', 'Hermano con asma bronquial', 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Enfermedad cardíaca', 'Padre con infarto a los 50 años', 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

INSERT INTO `turnos` (`id_turno`, `fecha`, `id_horario_turno`, `motivo`, `id_paciente`, `createdAt`, `updatedAt`, `id_medico`) VALUES
(1, '2023-05-19 00:00:00', 5, 'Control postoperatorio', 1, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1),
(2, '2023-05-20 00:00:00', 10, 'Dolor abdominal', 2, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 2),
(3, '2023-05-21 00:00:00', 15, 'Seguimiento tratamiento', 3, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1),
(4, '2023-05-22 00:00:00', 20, 'Consulta pediátrica', 4, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 2),
(5, '2023-05-23 00:00:00', 3, 'Revisión anual', 5, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1);

INSERT INTO `admisiones` (`id_Admision`, `estado`, `id_motivo_de_Internacion`, `id_prioridad_de_atencion`, `id_tipo_de_admision`, `fecha_De_Admision`, `fecha_De_Actualizacion`, `id_Paciente`, `id_Cama`) VALUES
(1, 'Activo', 1, 3, 1, '2023-05-18 09:00:00', NULL, 1, 1),
(2, 'Alta', 2, 2, 3, '2023-05-17 15:30:00', '2023-05-18 10:00:00', 2, 3),
(3, 'Activo', 3, 4, 1, '2023-05-18 10:15:00', NULL, 3, 5),
(4, 'Activo', 5, 1, 3, '2023-05-18 08:45:00', NULL, 4, 7),
(5, 'Alta', 4, 3, 1, '2023-05-16 14:00:00', '2023-05-18 09:30:00', 5, 9);

INSERT INTO `paciente_diagnosticos` (`id_Paciente_Diagnosticos`, `fecha`, `id_tipo_de_diagnostico`, `detalles`, `id_medico`, `id_paciente`, `id_tratamiento`, `updatedAt`) VALUES
(1, '2023-05-18 10:00:00', 2, 'Apendicitis aguda resuelta con cirugía', 1, 1, 1, '2025-05-18 04:57:09'),
(2, '2023-05-18 10:30:00', 1, 'Gastroenteritis aguda', 2, 2, 2, '2025-05-18 04:57:09'),
(3, '2023-05-18 11:00:00', 2, 'Artrosis de rodilla derecha', 1, 3, 3, '2025-05-18 04:57:09'),
(4, '2023-05-18 11:30:00', 1, 'Asma bronquial', 2, 4, 4, '2025-05-18 04:57:09'),
(5, '2023-05-18 12:00:00', 2, 'Colecistitis crónica', 1, 5, 5, '2025-05-18 04:57:09');

INSERT INTO `paciente_alergias` (`id_Alergia`, `id_nombre_alergia`, `descripcion`, `id_paciente`, `id_tratamiento`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Reacción alérgica severa a penicilina', 1, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 4, 'Alergia moderada a mariscos', 3, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 5, 'Alergia al látex con urticaria', 5, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

INSERT INTO `lazo_familiar` (`id_Lazo_Familiar`, `lazo`, `id_paciente_antecedente_familiar`, `createdAt`, `updatedAt`) VALUES
(1, 'Padre', 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Madre', 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Abuelo', 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Hermano', 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Padre', 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

INSERT INTO `paciente_pruebas_diagnosticas` (`id_Prueba_Diagnostica`, `id_nombre_prueba_diagnostica`, `resultado`, `id_diagnostico`, `id_paciente`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Leucocitosis con neutrofilia', 1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(2, 2, 'Distensión de asas intestinales', 2, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(3, 3, 'Desgaste articular grado II', 3, 3, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(4, 4, 'Espirometría con patrón obstructivo', 4, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(5, 5, 'Cálculos en vesícula biliar', 5, 5, '2025-05-18 04:57:09', '2025-05-18 04:57:09');

INSERT INTO `sintomas` (`id_Sintoma`, `nombre`, `id_Admision`, `id_Paciente_Diagnosticos`, `createdAt`, `updatedAt`) VALUES
(1, 'Dolor abdominal', 1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(2, 'Náuseas', 1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(3, 'Vómitos', 2, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(4, 'Diarrea', 2, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(5, 'Dolor en rodilla', 3, 3, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(6, 'Dificultad respiratoria', 4, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(7, 'Silbidos en el pecho', 4, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(8, 'Dolor en hipocondrio derecho', 5, 5, '2025-05-18 04:57:09', '2025-05-18 04:57:09');