-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 31-05-2025 a las 04:05:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--
CREATE DATABASE IF NOT EXISTS `prueba` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `prueba`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admisiones`
--

CREATE TABLE `admisiones` (
  `id_Admision` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `id_motivo_de_Internacion` int(11) DEFAULT NULL,
  `id_prioridad_de_atencion` int(11) DEFAULT NULL,
  `id_tipo_de_admision` int(11) DEFAULT NULL,
  `fecha_De_Admision` datetime NOT NULL,
  `fecha_De_Actualizacion` datetime DEFAULT NULL,
  `id_Paciente` int(11) DEFAULT NULL,
  `id_Cama` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admisiones`
--

INSERT INTO `admisiones` (`id_Admision`, `estado`, `id_motivo_de_Internacion`, `id_prioridad_de_atencion`, `id_tipo_de_admision`, `fecha_De_Admision`, `fecha_De_Actualizacion`, `id_Paciente`, `id_Cama`) VALUES
(1, 'Activo', 1, 3, 1, '2023-05-18 09:00:00', NULL, 1, 1),
(2, 'Alta', 2, 2, 3, '2023-05-17 15:30:00', '2023-05-18 10:00:00', 2, 3),
(3, 'Activo', 3, 4, 1, '2023-05-18 10:15:00', NULL, 3, 5),
(4, 'Activo', 5, 1, 3, '2023-05-18 08:45:00', NULL, 4, 7),
(5, 'Alta', 4, 3, 1, '2023-05-16 14:00:00', '2023-05-18 09:30:00', 5, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriasseguros`
--

CREATE TABLE `categoriasseguros` (
  `id_Categoria_Seguro` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoriasseguros`
--

INSERT INTO `categoriasseguros` (`id_Categoria_Seguro`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Platinum', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Gold', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Silver', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Bronze', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermeros`
--

CREATE TABLE `enfermeros` (
  `id_Enfermero` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `fecha_nac` datetime NOT NULL,
  `edad` int(11) NOT NULL,
  `peso` double DEFAULT NULL,
  `genero` varchar(255) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `telefono_de_emergencia` int(11) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enfermeros`
--

INSERT INTO `enfermeros` (`id_Enfermero`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `peso`, `genero`, `telefono`, `telefono_de_emergencia`, `direccion`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Carlos', 'López', 25678901, '1985-03-10 00:00:00', 38, 80.2, 'Masculino', 1167890123, 1198765434, 'Av. Libertador 2048', 4, '2025-05-18 04:56:22', '2025-05-18 04:56:22'),
(2, 'Ana', 'Martínez', 27890123, '1988-11-25 00:00:00', 35, 58.7, 'Femenino', 1178901234, 1198765435, 'Calle 13 456', NULL, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id_Especialidad` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id_Especialidad`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Cardiología', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Pediatría', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Traumatología', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Neurología', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Dermatología', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios_turnos`
--

CREATE TABLE `horarios_turnos` (
  `id_horario_turno` int(11) NOT NULL,
  `hora` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios_turnos`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospital_alas`
--

CREATE TABLE `hospital_alas` (
  `id_Ala` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `cantidad_Habitaciones` int(11) NOT NULL,
  `unidad` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hospital_alas`
--

INSERT INTO `hospital_alas` (`id_Ala`, `nombre`, `cantidad_Habitaciones`, `unidad`, `createdAt`, `updatedAt`) VALUES
(1, 'Ala Norte', 10, 'Cardiología', '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(2, 'Ala Sur', 8, 'Pediatría', '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(3, 'Ala Este', 12, 'Cirugía', '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(4, 'Ala Oeste', 6, 'Terapia Intensiva', '2025-05-18 04:56:34', '2025-05-18 04:56:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospital_camas`
--

CREATE TABLE `hospital_camas` (
  `id_Cama` int(11) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `id_habitacion` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hospital_camas`
--

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
(21, 1, 13, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospital_habitaciones`
--

CREATE TABLE `hospital_habitaciones` (
  `id_Habitacion` int(11) NOT NULL,
  `nro_Habitacion` int(11) NOT NULL,
  `cantidad_Camas` int(11) NOT NULL DEFAULT 0,
  `id_ala` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hospital_habitaciones`
--

INSERT INTO `hospital_habitaciones` (`id_Habitacion`, `nro_Habitacion`, `cantidad_Camas`, `id_ala`, `createdAt`, `updatedAt`) VALUES
(1, 101, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(2, 102, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(3, 201, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(4, 202, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(5, 301, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(6, 401, 2, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(7, 103, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(8, 104, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(9, 105, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(10, 106, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(11, 107, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(12, 108, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(13, 109, 1, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(14, 110, 2, 1, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(15, 203, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(16, 204, 1, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(17, 205, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(18, 206, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(19, 207, 1, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(20, 208, 2, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(21, 302, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(22, 303, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(23, 304, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(24, 305, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(25, 306, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(26, 307, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(27, 308, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(28, 309, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(29, 310, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(30, 311, 2, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(31, 312, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(32, 403, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(33, 404, 2, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(34, 405, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(35, 406, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lazo_familiar`
--

CREATE TABLE `lazo_familiar` (
  `id_Lazo_Familiar` int(11) NOT NULL,
  `lazo` varchar(255) DEFAULT NULL,
  `id_paciente_antecedente_familiar` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lazo_familiar`
--

INSERT INTO `lazo_familiar` (`id_Lazo_Familiar`, `lazo`, `id_paciente_antecedente_familiar`, `createdAt`, `updatedAt`) VALUES
(1, 'Padre', 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Madre', 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Abuelo', 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Hermano', 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Padre', 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id_Medicamento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_tipo_de_medicamento` int(11) DEFAULT NULL,
  `dosis_Recomendada` double NOT NULL,
  `cantidad_Contenida` double NOT NULL,
  `codigo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`id_Medicamento`, `nombre`, `id_tipo_de_medicamento`, `dosis_Recomendada`, `cantidad_Contenida`, `codigo`, `createdAt`, `updatedAt`) VALUES
(1, 'Ibuprofeno', 1, 400, 20, 1001, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 'Amoxicilina', 2, 500, 10, 1002, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(3, 'Paracetamol', 5, 500, 30, 1003, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(4, 'Diclofenac', 3, 50, 20, 1004, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 'Loratadina', 4, 10, 15, 1005, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_Medico` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `fecha_nac` datetime NOT NULL,
  `edad` int(11) NOT NULL,
  `peso` double DEFAULT NULL,
  `genero` varchar(255) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `telefono_De_Emergencia` int(11) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_Especialidad` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id_Medico`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `peso`, `genero`, `telefono`, `telefono_De_Emergencia`, `direccion`, `id_Especialidad`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan', 'Pérez', 30123456, '1975-05-15 00:00:00', 48, 75.5, 'Masculino', 1145678901, 1198765432, 'Av. Siempreviva 742', 1, 2, '2025-05-18 04:56:22', '2025-05-18 04:56:22'),
(2, 'María', 'Gómez', 28987654, '1980-08-22 00:00:00', 43, 62.3, 'Femenino', 1156789012, 1198765433, 'Calle Falsa 123', 2, 3, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivo_de_internacion`
--

CREATE TABLE `motivo_de_internacion` (
  `id_motivo_de_Internacion` int(11) NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `motivo_de_internacion`
--

INSERT INTO `motivo_de_internacion` (`id_motivo_de_Internacion`, `motivo`, `createdAt`, `updatedAt`) VALUES
(1, 'Cirugía programada', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Emergencia médica', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Observación', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Parto', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Tratamiento intensivo', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mutuales`
--

CREATE TABLE `mutuales` (
  `id_mutual` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mutuales`
--

INSERT INTO `mutuales` (`id_mutual`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'OSDE', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Swiss Medical', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Galeno', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Medifé', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Omint', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre_alergia`
--

CREATE TABLE `nombre_alergia` (
  `id_nombre_alergia` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nombre_alergia`
--

INSERT INTO `nombre_alergia` (`id_nombre_alergia`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Penicilina', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Ácaros', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Polen', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Mariscos', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Látex', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre_cirugia`
--

CREATE TABLE `nombre_cirugia` (
  `id_nombre_cirugia` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nombre_cirugia`
--

INSERT INTO `nombre_cirugia` (`id_nombre_cirugia`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Apéndice', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Vesícula', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Rodilla', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Cesárea', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Bypass gástrico', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre_prueba_diagnostica`
--

CREATE TABLE `nombre_prueba_diagnostica` (
  `id_nombre_prueba_diagnostica` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nombre_prueba_diagnostica`
--

INSERT INTO `nombre_prueba_diagnostica` (`id_nombre_prueba_diagnostica`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Análisis de sangre', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Radiografía', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Resonancia magnética', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Electrocardiograma', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Endoscopía', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_Paciente` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `fecha_nac` datetime NOT NULL,
  `edad` int(11) NOT NULL,
  `peso` double DEFAULT NULL,
  `genero` varchar(255) NOT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `telefono_De_Emergencia` bigint(20) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_tipo_sanguineo` int(11) DEFAULT NULL,
  `id_seguro_medico` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_Paciente`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `peso`, `genero`, `telefono`, `telefono_De_Emergencia`, `direccion`, `id_tipo_sanguineo`, `id_seguro_medico`, `createdAt`, `updatedAt`) VALUES
(1, 'Roberto', 'García', 20123456, '1980-02-15 00:00:00', 43, 78.5, 'Masculino', 1156789012, 1198765432, 'Calle 123 456', 1, 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Lucía', 'Fernández', 28987654, '1995-07-22 00:00:00', 28, 62, 'Femenino', 1167890123, 1198765433, 'Av. Rivadavia 2048', 3, 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Pedro', 'Sánchez', 18765432, '1972-11-30 00:00:00', 51, 85.3, 'Masculino', 1178901234, 1198765434, 'Calle Florida 100', 5, 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Sofía', 'López', 32123456, '2005-05-10 00:00:00', 18, 55.7, 'Femenino', 1189012345, 1198765435, 'Av. Santa Fe 1234', 7, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Miguel', 'Díaz', 23456789, '1990-09-18 00:00:00', 33, 70.2, 'Masculino', 1190123456, 1198765436, 'Calle Corrientes 567', 2, 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_alergias`
--

CREATE TABLE `paciente_alergias` (
  `id_Alergia` int(11) NOT NULL,
  `id_nombre_alergia` int(11) DEFAULT NULL,
  `descripcion` varchar(255) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_tratamiento` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_alergias`
--

INSERT INTO `paciente_alergias` (`id_Alergia`, `id_nombre_alergia`, `descripcion`, `id_paciente`, `id_tratamiento`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Reacción alérgica severa a penicilina', 1, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 4, 'Alergia moderada a mariscos', 3, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 5, 'Alergia al látex con urticaria', 5, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_antecedentes_familiares`
--

CREATE TABLE `paciente_antecedentes_familiares` (
  `id_Antecedente_Familiar` int(11) NOT NULL,
  `nombre_Enfermedad` varchar(255) NOT NULL,
  `detalles` varchar(255) NOT NULL,
  `id_Paciente` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_antecedentes_familiares`
--

INSERT INTO `paciente_antecedentes_familiares` (`id_Antecedente_Familiar`, `nombre_Enfermedad`, `detalles`, `id_Paciente`, `createdAt`, `updatedAt`) VALUES
(1, 'Diabetes', 'Padre con diabetes tipo 2', 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Hipertensión', 'Madre con hipertensión arterial', 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Cáncer de pulmón', 'Abuelo materno fallecido por cáncer de pulmón', 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Asma', 'Hermano con asma bronquial', 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Enfermedad cardíaca', 'Padre con infarto a los 50 años', 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_cirugias`
--

CREATE TABLE `paciente_cirugias` (
  `id_cirugia` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `id_nombre_cirugia` int(11) DEFAULT NULL,
  `descripcion` varchar(255) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_cirugias`
--

INSERT INTO `paciente_cirugias` (`id_cirugia`, `fecha`, `id_nombre_cirugia`, `descripcion`, `id_medico`, `id_paciente`, `createdAt`, `updatedAt`) VALUES
(1, '2020-05-15 10:30:00', 1, 'Apendicectomía por apendicitis aguda', 1, 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, '2021-03-22 08:45:00', 3, 'Artroscopía de rodilla derecha', 2, 3, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, '2022-11-10 14:15:00', 2, 'Colecistectomía laparoscópica', 1, 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_diagnosticos`
--

CREATE TABLE `paciente_diagnosticos` (
  `id_Paciente_Diagnosticos` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `id_tipo_de_diagnostico` int(11) DEFAULT NULL,
  `detalles` varchar(255) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_tratamiento` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_diagnosticos`
--

INSERT INTO `paciente_diagnosticos` (`id_Paciente_Diagnosticos`, `fecha`, `id_tipo_de_diagnostico`, `detalles`, `id_medico`, `id_paciente`, `id_tratamiento`, `updatedAt`) VALUES
(1, '2023-05-18 10:00:00', 2, 'Apendicitis aguda resuelta con cirugía', 1, 1, 1, '2025-05-18 04:57:09'),
(2, '2023-05-18 10:30:00', 1, 'Gastroenteritis aguda', 2, 2, 2, '2025-05-18 04:57:09'),
(3, '2023-05-18 11:00:00', 2, 'Artrosis de rodilla derecha', 1, 3, 3, '2025-05-18 04:57:09'),
(4, '2023-05-18 11:30:00', 1, 'Asma bronquial', 2, 4, 4, '2025-05-18 04:57:09'),
(5, '2023-05-18 12:00:00', 2, 'Colecistitis crónica', 1, 5, 5, '2025-05-18 04:57:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_evaluacion_fisica`
--

CREATE TABLE `paciente_evaluacion_fisica` (
  `id_Evaluacion_fisica` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `presion_arterial` int(11) NOT NULL,
  `frecuencia_cardiaca` int(11) NOT NULL,
  `color_de_piel` varchar(255) DEFAULT NULL,
  `respuesta_a_estimulos` varchar(255) DEFAULT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `enfermero_id` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_evaluacion_fisica`
--

INSERT INTO `paciente_evaluacion_fisica` (`id_Evaluacion_fisica`, `fecha`, `presion_arterial`, `frecuencia_cardiaca`, `color_de_piel`, `respuesta_a_estimulos`, `paciente_id`, `enfermero_id`, `updatedAt`) VALUES
(1, '2023-05-18 09:30:00', 120, 75, 'Normal', 'Alert', 1, 1, '2025-05-18 04:57:09'),
(2, '2023-05-18 10:00:00', 130, 80, 'Pálido', 'Alert', 2, 1, '2025-05-18 04:57:09'),
(3, '2023-05-18 10:45:00', 110, 70, 'Normal', 'Alert', 3, 2, '2025-05-18 04:57:09'),
(4, '2023-05-18 11:15:00', 115, 78, 'Normal', 'Alert', 4, 2, '2025-05-18 04:57:09'),
(5, '2023-05-18 11:45:00', 125, 82, 'Normal', 'Alert', 5, 1, '2025-05-18 04:57:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_pruebas_diagnosticas`
--

CREATE TABLE `paciente_pruebas_diagnosticas` (
  `id_Prueba_Diagnostica` int(11) NOT NULL,
  `id_nombre_prueba_diagnostica` int(11) DEFAULT NULL,
  `resultado` varchar(255) NOT NULL,
  `id_diagnostico` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_pruebas_diagnosticas`
--

INSERT INTO `paciente_pruebas_diagnosticas` (`id_Prueba_Diagnostica`, `id_nombre_prueba_diagnostica`, `resultado`, `id_diagnostico`, `id_paciente`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Leucocitosis con neutrofilia', 1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(2, 2, 'Distensión de asas intestinales', 2, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(3, 3, 'Desgaste articular grado II', 3, 3, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(4, 4, 'Espirometría con patrón obstructivo', 4, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(5, 5, 'Cálculos en vesícula biliar', 5, 5, '2025-05-18 04:57:09', '2025-05-18 04:57:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_recetas`
--

CREATE TABLE `paciente_recetas` (
  `id_Receta` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_medicamento` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_recetas`
--

INSERT INTO `paciente_recetas` (`id_Receta`, `fecha`, `id_paciente`, `id_medico`, `id_medicamento`, `updatedAt`) VALUES
(1, '2023-05-18 10:15:00', 1, 1, 1, '2025-05-18 05:00:59'),
(2, '2023-05-18 10:45:00', 2, 2, 2, '2025-05-18 05:00:59'),
(3, '2023-05-18 11:15:00', 3, 1, 3, '2025-05-18 05:00:59'),
(4, '2023-05-18 11:45:00', 4, 2, 5, '2025-05-18 05:00:59'),
(5, '2023-05-18 12:15:00', 5, 1, 4, '2025-05-18 05:00:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_seguro_medico`
--

CREATE TABLE `paciente_seguro_medico` (
  `id_seguro_medico` int(11) NOT NULL,
  `id_mutual` int(11) DEFAULT NULL,
  `numero` int(11) NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `id_categoria_seguro` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_seguro_medico`
--

INSERT INTO `paciente_seguro_medico` (`id_seguro_medico`, `id_mutual`, `numero`, `estado`, `id_categoria_seguro`, `createdAt`, `updatedAt`) VALUES
(1, 1, 123456, 1, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 2, 654321, 1, 2, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(3, 3, 987654, 1, 3, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(4, 4, 456789, 1, 4, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 5, 789123, 1, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_tratamientos`
--

CREATE TABLE `paciente_tratamientos` (
  `id_tratamiento` int(11) NOT NULL,
  `id_tipo_de_tratamiento` int(11) DEFAULT NULL,
  `detalle` varchar(255) NOT NULL,
  `cantidad_suministrada` double NOT NULL,
  `fecha_de_inicio` datetime DEFAULT NULL,
  `fecha_de_fin` datetime DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medicamento` int(11) DEFAULT NULL,
  `id_enfermero` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_tratamientos`
--

INSERT INTO `paciente_tratamientos` (`id_tratamiento`, `id_tipo_de_tratamiento`, `detalle`, `cantidad_suministrada`, `fecha_de_inicio`, `fecha_de_fin`, `id_paciente`, `id_medicamento`, `id_enfermero`, `updatedAt`) VALUES
(1, 1, 'Ibuprofeno cada 8 horas por 5 días', 10, '2023-05-18 10:15:00', '2023-05-23 00:00:00', 1, 1, 1, '2025-05-18 04:57:30'),
(2, 2, 'Amoxicilina inyectable cada 12 horas por 7 días', 7, '2023-05-18 10:45:00', '2023-05-25 00:00:00', 2, 2, 1, '2025-05-18 04:57:30'),
(3, 1, 'Paracetamol cada 6 horas por dolor', 15, '2023-05-18 11:15:00', '2023-05-21 00:00:00', 3, 3, 2, '2025-05-18 04:57:30'),
(4, 1, 'Loratadina diaria por alergia', 7, '2023-05-18 11:45:00', '2023-05-25 00:00:00', 4, 5, 2, '2025-05-18 04:57:30'),
(5, 1, 'Diclofenac cada 12 horas por 3 días', 6, '2023-05-18 12:15:00', '2023-05-21 00:00:00', 5, 4, 1, '2025-05-18 04:57:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_de_admision`
--

CREATE TABLE `personal_de_admision` (
  `id_personal_de_admision` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `fecha_nac` datetime NOT NULL,
  `edad` int(11) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `telefono_De_Emergencia` int(11) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personal_de_admision`
--

INSERT INTO `personal_de_admision` (`id_personal_de_admision`, `nombre`, `apellido`, `dni`, `fecha_nac`, `edad`, `genero`, `telefono`, `telefono_De_Emergencia`, `direccion`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Laura', 'Rodríguez', 29012345, '1990-07-18 00:00:00', 33, 'Femenino', 1189012345, 1198765436, 'Av. Corrientes 1234', 5, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prioridad_de_atencion`
--

CREATE TABLE `prioridad_de_atencion` (
  `id_prioridad_de_atencion` int(11) NOT NULL,
  `prioridad` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prioridad_de_atencion`
--

INSERT INTO `prioridad_de_atencion` (`id_prioridad_de_atencion`, `prioridad`, `createdAt`, `updatedAt`) VALUES
(1, 'Crítica', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Urgente', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Estable', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Rutinaria', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_Rol` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_Rol`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Médico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Enfermero', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Admisión', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sintomas`
--

CREATE TABLE `sintomas` (
  `id_Sintoma` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_Admision` int(11) DEFAULT NULL,
  `id_Paciente_Diagnosticos` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sintomas`
--

INSERT INTO `sintomas` (`id_Sintoma`, `nombre`, `id_Admision`, `id_Paciente_Diagnosticos`, `createdAt`, `updatedAt`) VALUES
(1, 'Dolor abdominal', 1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(2, 'Náuseas', 1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(3, 'Vómitos', 2, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(4, 'Diarrea', 2, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(5, 'Dolor en rodilla', 3, 3, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(6, 'Dificultad respiratoria', 4, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(7, 'Silbidos en el pecho', 4, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(8, 'Dolor en hipocondrio derecho', 5, 5, '2025-05-18 04:57:09', '2025-05-18 04:57:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_admision`
--

CREATE TABLE `tipo_de_admision` (
  `id_tipo_de_admision` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_de_admision`
--

INSERT INTO `tipo_de_admision` (`id_tipo_de_admision`, `tipo`, `createdAt`, `updatedAt`) VALUES
(1, 'Programada', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Derivacion Medica', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Emergencia', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Traslado', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_diagnostico`
--

CREATE TABLE `tipo_de_diagnostico` (
  `id_tipo_de_diagnostico` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_de_diagnostico`
--

INSERT INTO `tipo_de_diagnostico` (`id_tipo_de_diagnostico`, `nombre`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 'Presuntivo', 'Diagnóstico basado en síntomas iniciales', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Definitivo', 'Diagnóstico confirmado con pruebas', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Diferencial', 'Lista de posibles diagnósticos', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Anatomopatológico', 'Basado en estudios de tejidos', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_medicamento`
--

CREATE TABLE `tipo_de_medicamento` (
  `id_tipo_de_medicamento` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_de_medicamento`
--

INSERT INTO `tipo_de_medicamento` (`id_tipo_de_medicamento`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Analgésico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Antibiótico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Antiinflamatorio', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Antihistamínico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Antipirético', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_tratamiento`
--

CREATE TABLE `tipo_de_tratamiento` (
  `id_Tipo_De_Tratamiento` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_de_tratamiento`
--

INSERT INTO `tipo_de_tratamiento` (`id_Tipo_De_Tratamiento`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Medicación oral', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(2, 'Inyección', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Terapia física', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Cirugía', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'Terapia psicológica', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_sanguineo`
--

CREATE TABLE `tipo_sanguineo` (
  `id_tipo_sanguineo` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_sanguineo`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id_turno` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `id_horario_turno` int(11) DEFAULT NULL,
  `motivo` varchar(255) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_medico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id_turno`, `fecha`, `id_horario_turno`, `motivo`, `id_paciente`, `createdAt`, `updatedAt`, `id_medico`) VALUES
(1, '2023-05-19 00:00:00', 5, 'Control postoperatorio', 1, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1),
(2, '2023-05-20 00:00:00', 10, 'Dolor abdominal', 2, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 2),
(3, '2023-05-21 00:00:00', 15, 'Seguimiento tratamiento', 3, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1),
(4, '2023-05-22 00:00:00', 20, 'Consulta pediátrica', 4, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 2),
(5, '2023-05-23 00:00:00', 3, 'Revisión anual', 5, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_Usuario` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `intentos_fallidos` int(11) DEFAULT 0,
  `id_Rol` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_Usuario`, `email`, `password_hash`, `activo`, `intentos_fallidos`, `id_Rol`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 'medico1@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 2, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(3, 'medico2@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 2, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(4, 'enfermero1@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 3, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 'admision1@hospital.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 4, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD PRIMARY KEY (`id_Admision`),
  ADD KEY `id_motivo_de_Internacion` (`id_motivo_de_Internacion`),
  ADD KEY `id_prioridad_de_atencion` (`id_prioridad_de_atencion`),
  ADD KEY `id_tipo_de_admision` (`id_tipo_de_admision`),
  ADD KEY `id_Paciente` (`id_Paciente`),
  ADD KEY `id_Cama` (`id_Cama`);

--
-- Indices de la tabla `categoriasseguros`
--
ALTER TABLE `categoriasseguros`
  ADD PRIMARY KEY (`id_Categoria_Seguro`);

--
-- Indices de la tabla `enfermeros`
--
ALTER TABLE `enfermeros`
  ADD PRIMARY KEY (`id_Enfermero`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id_Especialidad`);

--
-- Indices de la tabla `horarios_turnos`
--
ALTER TABLE `horarios_turnos`
  ADD PRIMARY KEY (`id_horario_turno`);

--
-- Indices de la tabla `hospital_alas`
--
ALTER TABLE `hospital_alas`
  ADD PRIMARY KEY (`id_Ala`);

--
-- Indices de la tabla `hospital_camas`
--
ALTER TABLE `hospital_camas`
  ADD PRIMARY KEY (`id_Cama`),
  ADD KEY `id_habitacion` (`id_habitacion`);

--
-- Indices de la tabla `hospital_habitaciones`
--
ALTER TABLE `hospital_habitaciones`
  ADD PRIMARY KEY (`id_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion` (`nro_Habitacion`),
  ADD KEY `id_ala` (`id_ala`);

--
-- Indices de la tabla `lazo_familiar`
--
ALTER TABLE `lazo_familiar`
  ADD PRIMARY KEY (`id_Lazo_Familiar`),
  ADD KEY `id_paciente_antecedente_familiar` (`id_paciente_antecedente_familiar`);

--
-- Indices de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id_Medicamento`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `id_tipo_de_medicamento` (`id_tipo_de_medicamento`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_Medico`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `id_Especialidad` (`id_Especialidad`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `motivo_de_internacion`
--
ALTER TABLE `motivo_de_internacion`
  ADD PRIMARY KEY (`id_motivo_de_Internacion`),
  ADD UNIQUE KEY `motivo` (`motivo`);

--
-- Indices de la tabla `mutuales`
--
ALTER TABLE `mutuales`
  ADD PRIMARY KEY (`id_mutual`);

--
-- Indices de la tabla `nombre_alergia`
--
ALTER TABLE `nombre_alergia`
  ADD PRIMARY KEY (`id_nombre_alergia`);

--
-- Indices de la tabla `nombre_cirugia`
--
ALTER TABLE `nombre_cirugia`
  ADD PRIMARY KEY (`id_nombre_cirugia`);

--
-- Indices de la tabla `nombre_prueba_diagnostica`
--
ALTER TABLE `nombre_prueba_diagnostica`
  ADD PRIMARY KEY (`id_nombre_prueba_diagnostica`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_Paciente`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `id_tipo_sanguineo` (`id_tipo_sanguineo`),
  ADD KEY `id_seguro_medico` (`id_seguro_medico`);

--
-- Indices de la tabla `paciente_alergias`
--
ALTER TABLE `paciente_alergias`
  ADD PRIMARY KEY (`id_Alergia`),
  ADD KEY `id_nombre_alergia` (`id_nombre_alergia`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_tratamiento` (`id_tratamiento`);

--
-- Indices de la tabla `paciente_antecedentes_familiares`
--
ALTER TABLE `paciente_antecedentes_familiares`
  ADD PRIMARY KEY (`id_Antecedente_Familiar`),
  ADD KEY `id_Paciente` (`id_Paciente`);

--
-- Indices de la tabla `paciente_cirugias`
--
ALTER TABLE `paciente_cirugias`
  ADD PRIMARY KEY (`id_cirugia`),
  ADD KEY `id_nombre_cirugia` (`id_nombre_cirugia`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `paciente_diagnosticos`
--
ALTER TABLE `paciente_diagnosticos`
  ADD PRIMARY KEY (`id_Paciente_Diagnosticos`),
  ADD KEY `id_tipo_de_diagnostico` (`id_tipo_de_diagnostico`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_tratamiento` (`id_tratamiento`);

--
-- Indices de la tabla `paciente_evaluacion_fisica`
--
ALTER TABLE `paciente_evaluacion_fisica`
  ADD PRIMARY KEY (`id_Evaluacion_fisica`),
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `enfermero_id` (`enfermero_id`);

--
-- Indices de la tabla `paciente_pruebas_diagnosticas`
--
ALTER TABLE `paciente_pruebas_diagnosticas`
  ADD PRIMARY KEY (`id_Prueba_Diagnostica`),
  ADD KEY `id_nombre_prueba_diagnostica` (`id_nombre_prueba_diagnostica`),
  ADD KEY `id_diagnostico` (`id_diagnostico`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `paciente_recetas`
--
ALTER TABLE `paciente_recetas`
  ADD PRIMARY KEY (`id_Receta`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_medicamento` (`id_medicamento`);

--
-- Indices de la tabla `paciente_seguro_medico`
--
ALTER TABLE `paciente_seguro_medico`
  ADD PRIMARY KEY (`id_seguro_medico`),
  ADD UNIQUE KEY `numero` (`numero`),
  ADD KEY `id_mutual` (`id_mutual`),
  ADD KEY `id_categoria_seguro` (`id_categoria_seguro`);

--
-- Indices de la tabla `paciente_tratamientos`
--
ALTER TABLE `paciente_tratamientos`
  ADD PRIMARY KEY (`id_tratamiento`),
  ADD KEY `id_tipo_de_tratamiento` (`id_tipo_de_tratamiento`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medicamento` (`id_medicamento`),
  ADD KEY `id_enfermero` (`id_enfermero`);

--
-- Indices de la tabla `personal_de_admision`
--
ALTER TABLE `personal_de_admision`
  ADD PRIMARY KEY (`id_personal_de_admision`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `prioridad_de_atencion`
--
ALTER TABLE `prioridad_de_atencion`
  ADD PRIMARY KEY (`id_prioridad_de_atencion`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_Rol`);

--
-- Indices de la tabla `sintomas`
--
ALTER TABLE `sintomas`
  ADD PRIMARY KEY (`id_Sintoma`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_Admision` (`id_Admision`),
  ADD KEY `id_Paciente_Diagnosticos` (`id_Paciente_Diagnosticos`);

--
-- Indices de la tabla `tipo_de_admision`
--
ALTER TABLE `tipo_de_admision`
  ADD PRIMARY KEY (`id_tipo_de_admision`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `tipo_de_diagnostico`
--
ALTER TABLE `tipo_de_diagnostico`
  ADD PRIMARY KEY (`id_tipo_de_diagnostico`);

--
-- Indices de la tabla `tipo_de_medicamento`
--
ALTER TABLE `tipo_de_medicamento`
  ADD PRIMARY KEY (`id_tipo_de_medicamento`);

--
-- Indices de la tabla `tipo_de_tratamiento`
--
ALTER TABLE `tipo_de_tratamiento`
  ADD PRIMARY KEY (`id_Tipo_De_Tratamiento`);

--
-- Indices de la tabla `tipo_sanguineo`
--
ALTER TABLE `tipo_sanguineo`
  ADD PRIMARY KEY (`id_tipo_sanguineo`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id_turno`),
  ADD KEY `id_horario_turno` (`id_horario_turno`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_Usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_Rol` (`id_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  MODIFY `id_Admision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoriasseguros`
--
ALTER TABLE `categoriasseguros`
  MODIFY `id_Categoria_Seguro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `enfermeros`
--
ALTER TABLE `enfermeros`
  MODIFY `id_Enfermero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id_Especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `horarios_turnos`
--
ALTER TABLE `horarios_turnos`
  MODIFY `id_horario_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `hospital_alas`
--
ALTER TABLE `hospital_alas`
  MODIFY `id_Ala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `hospital_camas`
--
ALTER TABLE `hospital_camas`
  MODIFY `id_Cama` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `hospital_habitaciones`
--
ALTER TABLE `hospital_habitaciones`
  MODIFY `id_Habitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `lazo_familiar`
--
ALTER TABLE `lazo_familiar`
  MODIFY `id_Lazo_Familiar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id_Medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id_Medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `motivo_de_internacion`
--
ALTER TABLE `motivo_de_internacion`
  MODIFY `id_motivo_de_Internacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mutuales`
--
ALTER TABLE `mutuales`
  MODIFY `id_mutual` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `nombre_alergia`
--
ALTER TABLE `nombre_alergia`
  MODIFY `id_nombre_alergia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `nombre_cirugia`
--
ALTER TABLE `nombre_cirugia`
  MODIFY `id_nombre_cirugia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `nombre_prueba_diagnostica`
--
ALTER TABLE `nombre_prueba_diagnostica`
  MODIFY `id_nombre_prueba_diagnostica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_Paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_alergias`
--
ALTER TABLE `paciente_alergias`
  MODIFY `id_Alergia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paciente_antecedentes_familiares`
--
ALTER TABLE `paciente_antecedentes_familiares`
  MODIFY `id_Antecedente_Familiar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_cirugias`
--
ALTER TABLE `paciente_cirugias`
  MODIFY `id_cirugia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paciente_diagnosticos`
--
ALTER TABLE `paciente_diagnosticos`
  MODIFY `id_Paciente_Diagnosticos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_evaluacion_fisica`
--
ALTER TABLE `paciente_evaluacion_fisica`
  MODIFY `id_Evaluacion_fisica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_pruebas_diagnosticas`
--
ALTER TABLE `paciente_pruebas_diagnosticas`
  MODIFY `id_Prueba_Diagnostica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_recetas`
--
ALTER TABLE `paciente_recetas`
  MODIFY `id_Receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_seguro_medico`
--
ALTER TABLE `paciente_seguro_medico`
  MODIFY `id_seguro_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_tratamientos`
--
ALTER TABLE `paciente_tratamientos`
  MODIFY `id_tratamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal_de_admision`
--
ALTER TABLE `personal_de_admision`
  MODIFY `id_personal_de_admision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `prioridad_de_atencion`
--
ALTER TABLE `prioridad_de_atencion`
  MODIFY `id_prioridad_de_atencion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sintomas`
--
ALTER TABLE `sintomas`
  MODIFY `id_Sintoma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tipo_de_admision`
--
ALTER TABLE `tipo_de_admision`
  MODIFY `id_tipo_de_admision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_de_diagnostico`
--
ALTER TABLE `tipo_de_diagnostico`
  MODIFY `id_tipo_de_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_de_medicamento`
--
ALTER TABLE `tipo_de_medicamento`
  MODIFY `id_tipo_de_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_de_tratamiento`
--
ALTER TABLE `tipo_de_tratamiento`
  MODIFY `id_Tipo_De_Tratamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_sanguineo`
--
ALTER TABLE `tipo_sanguineo`
  MODIFY `id_tipo_sanguineo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD CONSTRAINT `admisiones_ibfk_1` FOREIGN KEY (`id_motivo_de_Internacion`) REFERENCES `motivo_de_internacion` (`id_motivo_de_Internacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_2` FOREIGN KEY (`id_prioridad_de_atencion`) REFERENCES `prioridad_de_atencion` (`id_prioridad_de_atencion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_3` FOREIGN KEY (`id_tipo_de_admision`) REFERENCES `tipo_de_admision` (`id_tipo_de_admision`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_4` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_5` FOREIGN KEY (`id_Cama`) REFERENCES `hospital_camas` (`id_Cama`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `enfermeros`
--
ALTER TABLE `enfermeros`
  ADD CONSTRAINT `enfermeros_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_Usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `hospital_camas`
--
ALTER TABLE `hospital_camas`
  ADD CONSTRAINT `hospital_camas_ibfk_1` FOREIGN KEY (`id_habitacion`) REFERENCES `hospital_habitaciones` (`id_Habitacion`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `hospital_habitaciones`
--
ALTER TABLE `hospital_habitaciones`
  ADD CONSTRAINT `hospital_habitaciones_ibfk_1` FOREIGN KEY (`id_ala`) REFERENCES `hospital_alas` (`id_Ala`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lazo_familiar`
--
ALTER TABLE `lazo_familiar`
  ADD CONSTRAINT `lazo_familiar_ibfk_1` FOREIGN KEY (`id_paciente_antecedente_familiar`) REFERENCES `paciente_antecedentes_familiares` (`id_Antecedente_Familiar`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`id_tipo_de_medicamento`) REFERENCES `tipo_de_medicamento` (`id_tipo_de_medicamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_Especialidad`) REFERENCES `especialidades` (`id_Especialidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_Usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_tipo_sanguineo`) REFERENCES `tipo_sanguineo` (`id_tipo_sanguineo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`id_seguro_medico`) REFERENCES `paciente_seguro_medico` (`id_seguro_medico`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_alergias`
--
ALTER TABLE `paciente_alergias`
  ADD CONSTRAINT `paciente_alergias_ibfk_1` FOREIGN KEY (`id_nombre_alergia`) REFERENCES `nombre_alergia` (`id_nombre_alergia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_alergias_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_alergias_ibfk_3` FOREIGN KEY (`id_tratamiento`) REFERENCES `paciente_tratamientos` (`id_tratamiento`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_antecedentes_familiares`
--
ALTER TABLE `paciente_antecedentes_familiares`
  ADD CONSTRAINT `paciente_antecedentes_familiares_ibfk_1` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_cirugias`
--
ALTER TABLE `paciente_cirugias`
  ADD CONSTRAINT `paciente_cirugias_ibfk_1` FOREIGN KEY (`id_nombre_cirugia`) REFERENCES `nombre_cirugia` (`id_nombre_cirugia`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_cirugias_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_cirugias_ibfk_3` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_diagnosticos`
--
ALTER TABLE `paciente_diagnosticos`
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_1` FOREIGN KEY (`id_tipo_de_diagnostico`) REFERENCES `tipo_de_diagnostico` (`id_tipo_de_diagnostico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_3` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_4` FOREIGN KEY (`id_tratamiento`) REFERENCES `paciente_tratamientos` (`id_tratamiento`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_evaluacion_fisica`
--
ALTER TABLE `paciente_evaluacion_fisica`
  ADD CONSTRAINT `paciente_evaluacion_fisica_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_evaluacion_fisica_ibfk_2` FOREIGN KEY (`enfermero_id`) REFERENCES `enfermeros` (`id_Enfermero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_pruebas_diagnosticas`
--
ALTER TABLE `paciente_pruebas_diagnosticas`
  ADD CONSTRAINT `paciente_pruebas_diagnosticas_ibfk_1` FOREIGN KEY (`id_nombre_prueba_diagnostica`) REFERENCES `nombre_prueba_diagnostica` (`id_nombre_prueba_diagnostica`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_pruebas_diagnosticas_ibfk_2` FOREIGN KEY (`id_diagnostico`) REFERENCES `paciente_diagnosticos` (`id_Paciente_Diagnosticos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_pruebas_diagnosticas_ibfk_3` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_recetas`
--
ALTER TABLE `paciente_recetas`
  ADD CONSTRAINT `paciente_recetas_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_recetas_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_recetas_ibfk_3` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_Medicamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_seguro_medico`
--
ALTER TABLE `paciente_seguro_medico`
  ADD CONSTRAINT `paciente_seguro_medico_ibfk_1` FOREIGN KEY (`id_mutual`) REFERENCES `mutuales` (`id_mutual`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_seguro_medico_ibfk_2` FOREIGN KEY (`id_categoria_seguro`) REFERENCES `categoriasseguros` (`id_Categoria_Seguro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_tratamientos`
--
ALTER TABLE `paciente_tratamientos`
  ADD CONSTRAINT `paciente_tratamientos_ibfk_1` FOREIGN KEY (`id_tipo_de_tratamiento`) REFERENCES `tipo_de_tratamiento` (`id_Tipo_De_Tratamiento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_3` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_Medicamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_4` FOREIGN KEY (`id_enfermero`) REFERENCES `enfermeros` (`id_Enfermero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personal_de_admision`
--
ALTER TABLE `personal_de_admision`
  ADD CONSTRAINT `personal_de_admision_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_Usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `sintomas`
--
ALTER TABLE `sintomas`
  ADD CONSTRAINT `sintomas_ibfk_1` FOREIGN KEY (`id_Admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `sintomas_ibfk_2` FOREIGN KEY (`id_Paciente_Diagnosticos`) REFERENCES `paciente_diagnosticos` (`id_Paciente_Diagnosticos`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`id_horario_turno`) REFERENCES `horarios_turnos` (`id_horario_turno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_Rol`) REFERENCES `roles` (`id_Rol`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
