-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-07-2025 a las 15:15:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `id_Cama` int(11) DEFAULT NULL,
  `recomendacion_seguimiento_medico` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admisiones`
--

INSERT INTO `admisiones` (`id_Admision`, `estado`, `id_motivo_de_Internacion`, `id_prioridad_de_atencion`, `id_tipo_de_admision`, `fecha_De_Admision`, `fecha_De_Actualizacion`, `id_Paciente`, `id_Cama`, `recomendacion_seguimiento_medico`) VALUES
(1, 'Alta', 1, 1, 1, '2023-05-18 09:00:00', '2025-06-26 02:31:38', 1, 2, 'asdasdasdasdasdasdasdas'),
(2, 'Baja', 1, 4, 1, '2023-05-17 15:30:00', '2025-07-11 19:57:37', 2, 8, NULL),
(3, 'Alta', 1, 1, 1, '2023-05-18 10:15:00', '2025-07-09 06:12:56', 3, 22, 'hasdadadas'),
(4, 'Alta', 5, 1, 3, '2023-05-18 08:45:00', '2025-07-11 20:04:22', 4, 7, 'ghhasdsdsdadsdsd'),
(5, 'Alta', 4, 3, 1, '2023-05-16 14:00:00', '2023-05-18 09:30:00', 5, 9, NULL),
(6, 'Activo', 1, 1, 3, '2025-06-24 22:41:47', '2025-07-07 19:23:11', 6, 23, NULL),
(7, 'Baja', 1, 1, 1, '2025-06-26 01:39:43', '2025-06-26 02:31:38', 1, 2, NULL),
(8, 'Baja', 1, 1, 1, '2025-06-26 02:01:34', '2025-06-26 02:31:38', 1, 2, NULL),
(9, 'Baja', 1, 4, 1, '2025-06-26 02:21:34', '2025-07-11 19:57:37', 2, 8, NULL),
(10, 'Alta', 1, 4, 1, '2025-06-26 02:32:50', '2025-07-11 20:07:30', 1, 2, NULL),
(14, 'Baja', 1, 4, 1, '2025-06-26 23:17:39', '2025-07-11 19:57:37', 2, 8, NULL),
(15, 'Alta', 1, 1, 1, '2025-07-09 04:54:57', '2025-07-09 06:12:56', 3, 22, 'hhhhhhhhhhhhhhhhhh'),
(16, 'Alta', 1, 1, 1, '2025-07-09 05:36:01', '2025-07-09 06:12:56', 3, 22, 'hhggggggggggaaaa'),
(17, 'Activo', 1, 1, 1, '2025-07-09 06:13:05', '2025-07-09 06:13:05', 3, 36, NULL),
(18, 'Activo', 1, 1, 2, '2025-07-11 19:57:58', '2025-07-11 19:57:58', 2, 16, NULL),
(19, 'Activo', 2, 1, 1, '2025-07-11 20:15:20', '2025-07-11 20:15:20', 1, 20, NULL);

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
(2, 'Ana', 'Martínez', 27890123, '1988-11-25 00:00:00', 35, 58.7, 'Femenino', 1178901234, 1198765435, 'Calle 13 456', 6, '2025-05-18 04:56:22', '2025-05-18 04:56:22');

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
(1, 1, 1, '2025-05-18 04:56:34', '2025-06-26 02:01:29'),
(2, 0, 1, '2025-05-18 04:56:34', '2025-07-11 20:07:30'),
(3, 1, 2, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(4, 1, 3, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(5, 1, 3, '2025-05-18 04:56:34', '2025-07-09 04:54:27'),
(6, 1, 4, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(7, 0, 4, '2025-05-18 04:56:34', '2025-07-11 20:04:22'),
(8, 1, 5, '2025-05-18 04:56:34', '2025-07-11 19:57:37'),
(9, 1, 6, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(10, 1, 6, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(11, 1, 7, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(12, 1, 7, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(13, 1, 8, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(14, 1, 9, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(15, 1, 9, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(16, 0, 10, '2025-05-18 04:56:34', '2025-07-11 19:57:58'),
(17, 1, 10, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(18, 1, 11, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(19, 1, 12, '2025-05-18 04:56:34', '2025-06-26 02:36:06'),
(20, 0, 12, '2025-05-18 04:56:34', '2025-07-11 20:15:20'),
(21, 1, 13, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(22, 1, 14, '2025-05-18 04:56:34', '2025-07-09 06:12:56'),
(23, 0, 14, '2025-05-18 04:56:34', '2025-06-24 22:41:47'),
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
(36, 0, 22, '2025-05-18 04:56:34', '2025-07-09 06:13:05'),
(37, 1, 23, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(38, 1, 24, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(39, 1, 24, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(40, 1, 25, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(41, 1, 26, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(42, 1, 26, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(43, 1, 27, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(44, 1, 28, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(45, 1, 28, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(46, 1, 29, '2025-05-18 04:56:34', '2025-06-26 23:09:06'),
(47, 1, 30, '2025-05-18 04:56:34', '2025-06-26 19:12:32'),
(48, 1, 30, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(49, 1, 31, '2025-05-18 04:56:34', '2025-05-18 04:56:34'),
(50, 1, 32, '2025-05-18 04:56:34', '2025-07-09 05:35:43'),
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lazo_familiar`
--

INSERT INTO `lazo_familiar` (`id_Lazo_Familiar`, `lazo`, `createdAt`, `updatedAt`) VALUES
(1, 'Padre', '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(2, 'Madre', '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(3, 'Abuelo', '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(4, 'Hermano', '2025-05-18 04:56:45', '2025-05-18 04:56:45');

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
-- Estructura de tabla para la tabla `nombre_sintoma`
--

CREATE TABLE `nombre_sintoma` (
  `id_Nombre_Sintoma` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nombre_sintoma`
--

INSERT INTO `nombre_sintoma` (`id_Nombre_Sintoma`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Dolor Abdominal', '2025-07-05 16:34:42', '2025-07-05 16:34:42'),
(2, 'Nauseas', '2025-07-05 16:34:50', '2025-07-05 16:34:50'),
(3, 'Vomitos', '2025-07-05 16:34:54', '2025-07-05 16:34:54'),
(4, 'Diarrea', '2025-07-05 16:34:59', '2025-07-05 16:34:59'),
(5, 'Dolor en Rodilla', '2025-07-05 16:35:07', '2025-07-05 16:35:07'),
(6, 'Dificultad respiratoria', '2025-07-05 16:35:18', '2025-07-05 16:35:18'),
(7, 'Silbidos en el pecho', '2025-07-05 16:35:26', '2025-07-05 16:35:26'),
(8, 'dolor en hipocondrio derecho', '2025-07-05 16:35:36', '2025-07-05 16:35:36');

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
(3, 'Pedro ', 'Sánchez', 18765432, '1972-12-01 00:00:00', 52, 85.3, 'Masculino', 2664953311, 123123123, 'av siempreviva 741', 5, 3, '2025-05-18 04:56:45', '2025-07-01 00:06:05'),
(4, 'Sofía', 'López', 32123456, '2005-05-10 00:00:00', 18, 55.7, 'Femenino', 1189012345, 1198765435, 'Av. Santa Fe 1234', 7, 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(5, 'Miguel', 'Díaz', 23456789, '1990-09-18 00:00:00', 33, 70.2, 'Masculino', 1190123456, 1198765436, 'Calle Corrientes 567', 2, 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45'),
(6, 'John', 'doe', NULL, '2025-06-24 22:41:47', 30, NULL, 'Masculino', NULL, NULL, 'av SiempreViva', NULL, NULL, '2025-06-24 22:41:47', '2025-06-24 22:41:47');

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
(16, 2, 'ddddddddddddddddddddd', 4, 31, '2025-07-11 02:28:06', '2025-07-11 02:28:15');

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
  `updatedAt` datetime NOT NULL,
  `id_Lazo_Familiar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_antecedentes_familiares`
--

INSERT INTO `paciente_antecedentes_familiares` (`id_Antecedente_Familiar`, `nombre_Enfermedad`, `detalles`, `id_Paciente`, `createdAt`, `updatedAt`, `id_Lazo_Familiar`) VALUES
(1, 'Diabetes', 'Padre con diabetes tipo 2', 1, '2025-05-18 04:56:45', '2025-05-18 04:56:45', 1),
(2, 'Hipertensión', 'Madre con hipertensión arterial', 2, '2025-05-18 04:56:45', '2025-05-18 04:56:45', 2),
(4, 'Asma', 'Hermano con asma bronquial', 4, '2025-05-18 04:56:45', '2025-05-18 04:56:45', 4),
(5, 'Enfermedad cardíaca', 'Padre con infarto a los 50 años', 5, '2025-05-18 04:56:45', '2025-05-18 04:56:45', 1),
(10, 'Cancer de pulmon', 'dasdasdasda', 3, '2025-07-06 00:46:11', '2025-07-06 00:46:33', 1),
(11, 'Cancer de pulmon', 'asdasdasdasdasdasd', 3, '2025-07-06 01:04:55', '2025-07-06 01:04:55', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_cirugias`
--

CREATE TABLE `paciente_cirugias` (
  `id_cirugia` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_nombre_cirugia` int(11) DEFAULT NULL,
  `descripcion` varchar(255) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_Admision` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_cirugias`
--

INSERT INTO `paciente_cirugias` (`id_cirugia`, `fecha`, `id_nombre_cirugia`, `descripcion`, `id_medico`, `id_paciente`, `createdAt`, `updatedAt`, `id_Admision`) VALUES
(9, '2025-07-05', 1, 'Mofun casi pierde el apendice', 1, 3, '2025-07-05 18:34:26', '2025-07-05 18:34:26', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_diagnosticos`
--

CREATE TABLE `paciente_diagnosticos` (
  `id_Paciente_Diagnosticos` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `id_tipo_de_diagnostico` int(11) DEFAULT NULL,
  `detalles` varchar(255) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `id_Admision` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_diagnosticos`
--

INSERT INTO `paciente_diagnosticos` (`id_Paciente_Diagnosticos`, `fecha`, `id_tipo_de_diagnostico`, `detalles`, `id_medico`, `id_paciente`, `updatedAt`, `id_Admision`) VALUES
(1, '2023-05-18', 2, 'Apendicitis aguda resuelta con cirugía', 1, 1, '2025-05-18 04:57:09', 1),
(2, '2023-05-18', 1, 'Gastroenteritis aguda', 2, 2, '2025-05-18 04:57:09', 2),
(3, '2023-05-18', 2, 'Artrosis de rodilla derecha', 1, 3, '2025-05-18 04:57:09', 3),
(4, '2023-05-18', 1, 'Asma bronquial', 2, 4, '2025-05-18 04:57:09', 4),
(5, '2023-05-18', 2, 'Colecistitis crónica', 1, 5, '2025-05-18 04:57:09', 5),
(11, '2025-07-11', 4, 'asdddddddddddddddddddddd', 1, 3, '2025-07-11 20:31:15', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_evaluacion_fisica`
--

CREATE TABLE `paciente_evaluacion_fisica` (
  `id_Evaluacion_fisica` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `frecuencia_cardiaca` int(11) NOT NULL,
  `color_de_piel` varchar(255) DEFAULT NULL,
  `respuesta_a_estimulos` varchar(255) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `id_Admision` int(11) DEFAULT NULL,
  `id_Paciente` int(11) DEFAULT NULL,
  `id_Enfermero` int(11) DEFAULT NULL,
  `presion_arterial_sistolica` int(11) NOT NULL,
  `presion_arterial_diastolica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_evaluacion_fisica`
--

INSERT INTO `paciente_evaluacion_fisica` (`id_Evaluacion_fisica`, `fecha`, `frecuencia_cardiaca`, `color_de_piel`, `respuesta_a_estimulos`, `updatedAt`, `id_Admision`, `id_Paciente`, `id_Enfermero`, `presion_arterial_sistolica`, `presion_arterial_diastolica`) VALUES
(9, '2025-07-04', 160, 'marron', 'Excelente', '2025-07-04 21:50:13', 4, 4, 1, 120, 55),
(10, '2025-07-05', 200, 'marron', 'Excelente excepto cuando juega al TFT', '2025-07-05 18:35:06', 3, 3, 1, 180, 110);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_medicacion_actual`
--

CREATE TABLE `paciente_medicacion_actual` (
  `id_Paciente_Medicacion_Actual` int(11) NOT NULL,
  `id_Medicamento` int(11) DEFAULT NULL,
  `id_Admision` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_Paciente` int(11) DEFAULT NULL,
  `motivo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_medicacion_actual`
--

INSERT INTO `paciente_medicacion_actual` (`id_Paciente_Medicacion_Actual`, `id_Medicamento`, `id_Admision`, `createdAt`, `updatedAt`, `id_Paciente`, `motivo`) VALUES
(3, 2, 3, '2025-07-03 00:57:49', '2025-07-06 00:45:42', 3, 'dolor de cabeza'),
(5, 3, 3, '2025-07-03 23:22:53', '2025-07-03 23:22:53', 3, 'dolor de cabeza');

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
(5, 5, 'Cálculos en vesícula biliar', 5, 5, '2025-05-18 04:57:09', '2025-05-18 04:57:09'),
(9, 2, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 11, 3, '2025-07-11 20:33:56', '2025-07-11 20:34:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_recetas`
--

CREATE TABLE `paciente_recetas` (
  `id_Receta` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `id_admision` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_recetas`
--

INSERT INTO `paciente_recetas` (`id_Receta`, `fecha`, `id_paciente`, `id_medico`, `updatedAt`, `id_admision`) VALUES
(1, '2023-05-18 10:15:00', 1, 1, '2025-05-18 05:00:59', 1),
(2, '2023-05-18 10:45:00', 2, 2, '2025-05-18 05:00:59', 2),
(3, '2023-05-18 11:15:00', 3, 1, '2025-05-18 05:00:59', 3),
(4, '2023-05-18 11:45:00', 4, 2, '2025-05-18 05:00:59', 4),
(5, '2023-05-18 12:15:00', 5, 1, '2025-05-18 05:00:59', 5),
(12, '2025-07-11 00:00:00', 4, 1, '2025-07-11 09:14:24', 4);

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
  `cantidad_suministrada` double DEFAULT NULL,
  `fecha_de_inicio` datetime DEFAULT NULL,
  `fecha_de_fin` datetime DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medicamento` int(11) DEFAULT NULL,
  `id_enfermero` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_Paciente_Diagnosticos` int(11) DEFAULT NULL,
  `id_admision` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_tratamientos`
--

INSERT INTO `paciente_tratamientos` (`id_tratamiento`, `id_tipo_de_tratamiento`, `detalle`, `cantidad_suministrada`, `fecha_de_inicio`, `fecha_de_fin`, `id_paciente`, `id_medicamento`, `id_enfermero`, `updatedAt`, `id_medico`, `id_Paciente_Diagnosticos`, `id_admision`) VALUES
(22, 1, 'tttttttttttttttttttttttttttttwwwwwwwwwwwwwwwwww', 100, '2025-07-09 06:12:35', NULL, 3, 5, 1, '2025-07-09 06:12:35', NULL, NULL, 16),
(31, 1, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 50, NULL, NULL, 4, 1, 1, '2025-07-11 02:45:28', NULL, NULL, 4);

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
-- Estructura de tabla para la tabla `recetas_medicamentos`
--

CREATE TABLE `recetas_medicamentos` (
  `id_Recetas_Medicamentos` int(11) NOT NULL,
  `id_Receta` int(11) DEFAULT NULL,
  `id_Medicamento` int(11) DEFAULT NULL,
  `indicacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas_medicamentos`
--

INSERT INTO `recetas_medicamentos` (`id_Recetas_Medicamentos`, `id_Receta`, `id_Medicamento`, `indicacion`, `createdAt`, `updatedAt`) VALUES
(6, 4, 1, 'sdsdadsadsdasdasdsad', '2025-07-11 08:38:57', '2025-07-11 08:38:57'),
(7, 12, 3, 'dasdasdasdasdasasdasdasd', '2025-07-11 09:14:34', '2025-07-11 09:16:22');

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
(2, 'Medico', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(3, 'Enfermero', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(4, 'Admision', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sintomas`
--

CREATE TABLE `sintomas` (
  `id_Sintoma` int(11) NOT NULL,
  `id_Admision` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_Nombre_Sintoma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sintomas`
--

INSERT INTO `sintomas` (`id_Sintoma`, `id_Admision`, `createdAt`, `updatedAt`, `id_Nombre_Sintoma`) VALUES
(1, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 1),
(2, 1, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 2),
(3, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 3),
(4, 2, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 4),
(6, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 6),
(7, 4, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 7),
(8, 5, '2025-05-18 04:57:09', '2025-05-18 04:57:09', 8),
(12, 3, '2025-07-05 23:18:27', '2025-07-05 23:18:27', 1),
(14, 3, '2025-07-05 23:35:47', '2025-07-05 23:35:47', 4),
(15, 3, '2025-07-06 00:47:49', '2025-07-06 00:47:49', 2),
(16, 3, '2025-07-06 00:48:51', '2025-07-06 00:48:51', 5);

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
(4, 'Anatomopatológico', 'Basado en estudios de tejidos', '2025-05-18 04:55:43', '2025-05-18 04:55:43'),
(5, 'En curso', 'Diagnostico en curso', '2025-05-18 04:55:43', '2025-05-18 04:55:43');

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
  `estado` tinyint(1) DEFAULT 1,
  `fecha` date NOT NULL,
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

INSERT INTO `turnos` (`id_turno`, `estado`, `fecha`, `id_horario_turno`, `motivo`, `id_paciente`, `createdAt`, `updatedAt`, `id_medico`) VALUES
(3, 1, '2025-06-25', 2, 'Seguimiento tratamiento', 3, '2025-05-18 04:56:53', '2025-06-25 21:54:24', 1),
(4, 1, '2023-05-22', 20, 'Consulta pediátrica', 4, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 2),
(5, 1, '2023-05-23', 3, 'Revisión anual', 5, '2025-05-18 04:56:53', '2025-05-18 04:56:53', 1),
(15, 0, '2025-06-25', 3, 'ddddddddddddddddddddddddddddddddddddddddddddddd', 1, '2025-06-25 21:51:12', '2025-06-26 02:01:34', 2),
(18, 0, '2025-06-25', 2, 'saaaaaaaaaaaaaaaaaaaaaaaaaad', 1, '2025-06-25 23:35:34', '2025-06-26 01:39:43', 2),
(19, 0, '2025-06-26', 1, 'asddddddddddddddddddddddddddddddddddddd', 1, '2025-06-26 02:01:51', '2025-06-26 02:32:50', 1),
(20, 0, '2025-06-26', 9, 'habia un caracol rojo \r\n', 2, '2025-06-26 02:21:13', '2025-06-26 02:21:34', 2),
(22, 0, '2025-06-26', 12, 'dddddddddddddddddddddddddddddddddddd', 2, '2025-06-26 02:30:52', '2025-06-26 02:36:22', 1),
(24, 0, '2025-06-27', 1, 'ddddddddddddddddddddddddddddddddddd', 2, '2025-06-26 19:11:57', '2025-06-26 19:12:32', 1),
(33, 0, '2025-06-29', 7, 'dddddddddddddddddddddddddddddddddddddddddddddd', 2, '2025-06-26 22:39:12', '2025-06-26 23:09:06', 1),
(34, 0, '2025-07-06', 2, 'ddddddddddddddddddddddddddddddddd', 2, '2025-06-26 23:17:32', '2025-06-26 23:17:39', 1),
(35, 1, '2025-06-26', 15, 'dddddddddddddddddddddddddddddddddddddddddddd', 2, '2025-06-26 23:17:55', '2025-06-26 23:17:55', 2);

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
(1, 'admin@gmail.com', '$2a$10$xD7J2XW3q5U5e5v5e5v5eO5v5e5v5e5v5e5v5e5v5e5v5e5v5e5v5e', 1, 0, 1, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(2, 'medico1@gmail.com', '$2b$10$4srogIWeC3mUPd.LJ5T.M.0.4CoxTbwGw9U27qC/pYAznvZKyod9u', 1, 0, 2, '2025-05-18 04:56:06', '2025-07-11 20:44:35'),
(3, 'medico2@gmail.com', '$2b$10$4srogIWeC3mUPd.LJ5T.M.0.4CoxTbwGw9U27qC/pYAznvZKyod9u', 1, 0, 2, '2025-05-18 04:56:06', '2025-07-11 20:47:47'),
(4, 'enfermero1@gmail.com', '$2b$10$jitA2mxNenbtyxWwlcQEE.4kIulcmasYZb6oj7L9V4gIw3rBBLf1u', 1, 0, 3, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(5, 'admision1@gmail.com', '$2b$10$49WLpIC4uaEiiDOkSgXlweBFIejGKkdAQTewBFbqs1sjg0vHg22f6', 1, 0, 4, '2025-05-18 04:56:06', '2025-05-18 04:56:06'),
(6, 'enfermero2@gmail.com', '$2b$10$jitA2mxNenbtyxWwlcQEE.4kIulcmasYZb6oj7L9V4gIw3rBBLf1u', 1, 0, 3, '2025-05-18 04:56:06', '2025-05-18 04:56:06');

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
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `dni_22` (`dni`),
  ADD UNIQUE KEY `dni_23` (`dni`),
  ADD UNIQUE KEY `dni_24` (`dni`),
  ADD UNIQUE KEY `dni_25` (`dni`),
  ADD UNIQUE KEY `dni_26` (`dni`),
  ADD UNIQUE KEY `dni_27` (`dni`),
  ADD UNIQUE KEY `dni_28` (`dni`),
  ADD UNIQUE KEY `dni_29` (`dni`),
  ADD UNIQUE KEY `dni_30` (`dni`),
  ADD UNIQUE KEY `dni_31` (`dni`),
  ADD UNIQUE KEY `dni_32` (`dni`),
  ADD UNIQUE KEY `dni_33` (`dni`),
  ADD UNIQUE KEY `dni_34` (`dni`),
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
  ADD UNIQUE KEY `nro_Habitacion_2` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_3` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_4` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_5` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_6` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_7` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_8` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_9` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_10` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_11` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_12` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_13` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_14` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_15` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_16` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_17` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_18` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_19` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_20` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_21` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_22` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_23` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_24` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_25` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_26` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_27` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_28` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_29` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_30` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_31` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_32` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_33` (`nro_Habitacion`),
  ADD UNIQUE KEY `nro_Habitacion_34` (`nro_Habitacion`),
  ADD KEY `id_ala` (`id_ala`);

--
-- Indices de la tabla `lazo_familiar`
--
ALTER TABLE `lazo_familiar`
  ADD PRIMARY KEY (`id_Lazo_Familiar`);

--
-- Indices de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id_Medicamento`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `codigo_2` (`codigo`),
  ADD UNIQUE KEY `codigo_3` (`codigo`),
  ADD UNIQUE KEY `codigo_4` (`codigo`),
  ADD UNIQUE KEY `codigo_5` (`codigo`),
  ADD UNIQUE KEY `codigo_6` (`codigo`),
  ADD UNIQUE KEY `codigo_7` (`codigo`),
  ADD UNIQUE KEY `codigo_8` (`codigo`),
  ADD UNIQUE KEY `codigo_9` (`codigo`),
  ADD UNIQUE KEY `codigo_10` (`codigo`),
  ADD UNIQUE KEY `codigo_11` (`codigo`),
  ADD UNIQUE KEY `codigo_12` (`codigo`),
  ADD UNIQUE KEY `codigo_13` (`codigo`),
  ADD UNIQUE KEY `codigo_14` (`codigo`),
  ADD UNIQUE KEY `codigo_15` (`codigo`),
  ADD UNIQUE KEY `codigo_16` (`codigo`),
  ADD UNIQUE KEY `codigo_17` (`codigo`),
  ADD UNIQUE KEY `codigo_18` (`codigo`),
  ADD UNIQUE KEY `codigo_19` (`codigo`),
  ADD UNIQUE KEY `codigo_20` (`codigo`),
  ADD UNIQUE KEY `codigo_21` (`codigo`),
  ADD UNIQUE KEY `codigo_22` (`codigo`),
  ADD UNIQUE KEY `codigo_23` (`codigo`),
  ADD UNIQUE KEY `codigo_24` (`codigo`),
  ADD UNIQUE KEY `codigo_25` (`codigo`),
  ADD UNIQUE KEY `codigo_26` (`codigo`),
  ADD UNIQUE KEY `codigo_27` (`codigo`),
  ADD UNIQUE KEY `codigo_28` (`codigo`),
  ADD UNIQUE KEY `codigo_29` (`codigo`),
  ADD UNIQUE KEY `codigo_30` (`codigo`),
  ADD UNIQUE KEY `codigo_31` (`codigo`),
  ADD UNIQUE KEY `codigo_32` (`codigo`),
  ADD UNIQUE KEY `codigo_33` (`codigo`),
  ADD UNIQUE KEY `codigo_34` (`codigo`),
  ADD KEY `id_tipo_de_medicamento` (`id_tipo_de_medicamento`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_Medico`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `dni_22` (`dni`),
  ADD UNIQUE KEY `dni_23` (`dni`),
  ADD UNIQUE KEY `dni_24` (`dni`),
  ADD UNIQUE KEY `dni_25` (`dni`),
  ADD UNIQUE KEY `dni_26` (`dni`),
  ADD UNIQUE KEY `dni_27` (`dni`),
  ADD UNIQUE KEY `dni_28` (`dni`),
  ADD UNIQUE KEY `dni_29` (`dni`),
  ADD UNIQUE KEY `dni_30` (`dni`),
  ADD UNIQUE KEY `dni_31` (`dni`),
  ADD UNIQUE KEY `dni_32` (`dni`),
  ADD UNIQUE KEY `dni_33` (`dni`),
  ADD UNIQUE KEY `dni_34` (`dni`),
  ADD KEY `id_Especialidad` (`id_Especialidad`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `motivo_de_internacion`
--
ALTER TABLE `motivo_de_internacion`
  ADD PRIMARY KEY (`id_motivo_de_Internacion`),
  ADD UNIQUE KEY `motivo` (`motivo`),
  ADD UNIQUE KEY `motivo_2` (`motivo`),
  ADD UNIQUE KEY `motivo_3` (`motivo`),
  ADD UNIQUE KEY `motivo_4` (`motivo`),
  ADD UNIQUE KEY `motivo_5` (`motivo`),
  ADD UNIQUE KEY `motivo_6` (`motivo`),
  ADD UNIQUE KEY `motivo_7` (`motivo`),
  ADD UNIQUE KEY `motivo_8` (`motivo`),
  ADD UNIQUE KEY `motivo_9` (`motivo`),
  ADD UNIQUE KEY `motivo_10` (`motivo`),
  ADD UNIQUE KEY `motivo_11` (`motivo`),
  ADD UNIQUE KEY `motivo_12` (`motivo`),
  ADD UNIQUE KEY `motivo_13` (`motivo`),
  ADD UNIQUE KEY `motivo_14` (`motivo`),
  ADD UNIQUE KEY `motivo_15` (`motivo`),
  ADD UNIQUE KEY `motivo_16` (`motivo`),
  ADD UNIQUE KEY `motivo_17` (`motivo`),
  ADD UNIQUE KEY `motivo_18` (`motivo`),
  ADD UNIQUE KEY `motivo_19` (`motivo`),
  ADD UNIQUE KEY `motivo_20` (`motivo`),
  ADD UNIQUE KEY `motivo_21` (`motivo`),
  ADD UNIQUE KEY `motivo_22` (`motivo`),
  ADD UNIQUE KEY `motivo_23` (`motivo`),
  ADD UNIQUE KEY `motivo_24` (`motivo`),
  ADD UNIQUE KEY `motivo_25` (`motivo`),
  ADD UNIQUE KEY `motivo_26` (`motivo`),
  ADD UNIQUE KEY `motivo_27` (`motivo`),
  ADD UNIQUE KEY `motivo_28` (`motivo`),
  ADD UNIQUE KEY `motivo_29` (`motivo`),
  ADD UNIQUE KEY `motivo_30` (`motivo`),
  ADD UNIQUE KEY `motivo_31` (`motivo`),
  ADD UNIQUE KEY `motivo_32` (`motivo`),
  ADD UNIQUE KEY `motivo_33` (`motivo`),
  ADD UNIQUE KEY `motivo_34` (`motivo`);

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
-- Indices de la tabla `nombre_sintoma`
--
ALTER TABLE `nombre_sintoma`
  ADD PRIMARY KEY (`id_Nombre_Sintoma`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_Paciente`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `dni_22` (`dni`),
  ADD UNIQUE KEY `dni_23` (`dni`),
  ADD UNIQUE KEY `dni_24` (`dni`),
  ADD UNIQUE KEY `dni_25` (`dni`),
  ADD UNIQUE KEY `dni_26` (`dni`),
  ADD UNIQUE KEY `dni_27` (`dni`),
  ADD UNIQUE KEY `dni_28` (`dni`),
  ADD UNIQUE KEY `dni_29` (`dni`),
  ADD UNIQUE KEY `dni_30` (`dni`),
  ADD UNIQUE KEY `dni_31` (`dni`),
  ADD UNIQUE KEY `dni_32` (`dni`),
  ADD UNIQUE KEY `dni_33` (`dni`),
  ADD UNIQUE KEY `dni_34` (`dni`),
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
  ADD KEY `id_Paciente` (`id_Paciente`),
  ADD KEY `id_Lazo_Familiar` (`id_Lazo_Familiar`);

--
-- Indices de la tabla `paciente_cirugias`
--
ALTER TABLE `paciente_cirugias`
  ADD PRIMARY KEY (`id_cirugia`),
  ADD KEY `id_nombre_cirugia` (`id_nombre_cirugia`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_Admision` (`id_Admision`);

--
-- Indices de la tabla `paciente_diagnosticos`
--
ALTER TABLE `paciente_diagnosticos`
  ADD PRIMARY KEY (`id_Paciente_Diagnosticos`),
  ADD KEY `id_tipo_de_diagnostico` (`id_tipo_de_diagnostico`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_Admision` (`id_Admision`);

--
-- Indices de la tabla `paciente_evaluacion_fisica`
--
ALTER TABLE `paciente_evaluacion_fisica`
  ADD PRIMARY KEY (`id_Evaluacion_fisica`),
  ADD KEY `id_Admision` (`id_Admision`),
  ADD KEY `id_Paciente` (`id_Paciente`),
  ADD KEY `id_Enfermero` (`id_Enfermero`);

--
-- Indices de la tabla `paciente_medicacion_actual`
--
ALTER TABLE `paciente_medicacion_actual`
  ADD PRIMARY KEY (`id_Paciente_Medicacion_Actual`),
  ADD KEY `id_Medicamento` (`id_Medicamento`),
  ADD KEY `id_Admision` (`id_Admision`),
  ADD KEY `id_Paciente` (`id_Paciente`);

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
  ADD KEY `id_admision` (`id_admision`);

--
-- Indices de la tabla `paciente_seguro_medico`
--
ALTER TABLE `paciente_seguro_medico`
  ADD PRIMARY KEY (`id_seguro_medico`),
  ADD UNIQUE KEY `numero` (`numero`),
  ADD UNIQUE KEY `numero_2` (`numero`),
  ADD UNIQUE KEY `numero_3` (`numero`),
  ADD UNIQUE KEY `numero_4` (`numero`),
  ADD UNIQUE KEY `numero_5` (`numero`),
  ADD UNIQUE KEY `numero_6` (`numero`),
  ADD UNIQUE KEY `numero_7` (`numero`),
  ADD UNIQUE KEY `numero_8` (`numero`),
  ADD UNIQUE KEY `numero_9` (`numero`),
  ADD UNIQUE KEY `numero_10` (`numero`),
  ADD UNIQUE KEY `numero_11` (`numero`),
  ADD UNIQUE KEY `numero_12` (`numero`),
  ADD UNIQUE KEY `numero_13` (`numero`),
  ADD UNIQUE KEY `numero_14` (`numero`),
  ADD UNIQUE KEY `numero_15` (`numero`),
  ADD UNIQUE KEY `numero_16` (`numero`),
  ADD UNIQUE KEY `numero_17` (`numero`),
  ADD UNIQUE KEY `numero_18` (`numero`),
  ADD UNIQUE KEY `numero_19` (`numero`),
  ADD UNIQUE KEY `numero_20` (`numero`),
  ADD UNIQUE KEY `numero_21` (`numero`),
  ADD UNIQUE KEY `numero_22` (`numero`),
  ADD UNIQUE KEY `numero_23` (`numero`),
  ADD UNIQUE KEY `numero_24` (`numero`),
  ADD UNIQUE KEY `numero_25` (`numero`),
  ADD UNIQUE KEY `numero_26` (`numero`),
  ADD UNIQUE KEY `numero_27` (`numero`),
  ADD UNIQUE KEY `numero_28` (`numero`),
  ADD UNIQUE KEY `numero_29` (`numero`),
  ADD UNIQUE KEY `numero_30` (`numero`),
  ADD UNIQUE KEY `numero_31` (`numero`),
  ADD UNIQUE KEY `numero_32` (`numero`),
  ADD UNIQUE KEY `numero_33` (`numero`),
  ADD UNIQUE KEY `numero_34` (`numero`),
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
  ADD KEY `id_enfermero` (`id_enfermero`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_Paciente_Diagnosticos` (`id_Paciente_Diagnosticos`),
  ADD KEY `id_admision` (`id_admision`);

--
-- Indices de la tabla `personal_de_admision`
--
ALTER TABLE `personal_de_admision`
  ADD PRIMARY KEY (`id_personal_de_admision`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `dni_22` (`dni`),
  ADD UNIQUE KEY `dni_23` (`dni`),
  ADD UNIQUE KEY `dni_24` (`dni`),
  ADD UNIQUE KEY `dni_25` (`dni`),
  ADD UNIQUE KEY `dni_26` (`dni`),
  ADD UNIQUE KEY `dni_27` (`dni`),
  ADD UNIQUE KEY `dni_28` (`dni`),
  ADD UNIQUE KEY `dni_29` (`dni`),
  ADD UNIQUE KEY `dni_30` (`dni`),
  ADD UNIQUE KEY `dni_31` (`dni`),
  ADD UNIQUE KEY `dni_32` (`dni`),
  ADD UNIQUE KEY `dni_33` (`dni`),
  ADD UNIQUE KEY `dni_34` (`dni`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `prioridad_de_atencion`
--
ALTER TABLE `prioridad_de_atencion`
  ADD PRIMARY KEY (`id_prioridad_de_atencion`);

--
-- Indices de la tabla `recetas_medicamentos`
--
ALTER TABLE `recetas_medicamentos`
  ADD PRIMARY KEY (`id_Recetas_Medicamentos`),
  ADD UNIQUE KEY `recetas_medicamentos_id_Receta_id_Medicamento_unique` (`id_Receta`,`id_Medicamento`),
  ADD KEY `id_Medicamento` (`id_Medicamento`);

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
  ADD KEY `id_Admision` (`id_Admision`),
  ADD KEY `id_Nombre_Sintoma` (`id_Nombre_Sintoma`);

--
-- Indices de la tabla `tipo_de_admision`
--
ALTER TABLE `tipo_de_admision`
  ADD PRIMARY KEY (`id_tipo_de_admision`),
  ADD UNIQUE KEY `tipo` (`tipo`),
  ADD UNIQUE KEY `tipo_2` (`tipo`),
  ADD UNIQUE KEY `tipo_3` (`tipo`),
  ADD UNIQUE KEY `tipo_4` (`tipo`),
  ADD UNIQUE KEY `tipo_5` (`tipo`),
  ADD UNIQUE KEY `tipo_6` (`tipo`),
  ADD UNIQUE KEY `tipo_7` (`tipo`),
  ADD UNIQUE KEY `tipo_8` (`tipo`),
  ADD UNIQUE KEY `tipo_9` (`tipo`),
  ADD UNIQUE KEY `tipo_10` (`tipo`),
  ADD UNIQUE KEY `tipo_11` (`tipo`),
  ADD UNIQUE KEY `tipo_12` (`tipo`),
  ADD UNIQUE KEY `tipo_13` (`tipo`),
  ADD UNIQUE KEY `tipo_14` (`tipo`),
  ADD UNIQUE KEY `tipo_15` (`tipo`),
  ADD UNIQUE KEY `tipo_16` (`tipo`),
  ADD UNIQUE KEY `tipo_17` (`tipo`),
  ADD UNIQUE KEY `tipo_18` (`tipo`),
  ADD UNIQUE KEY `tipo_19` (`tipo`),
  ADD UNIQUE KEY `tipo_20` (`tipo`),
  ADD UNIQUE KEY `tipo_21` (`tipo`),
  ADD UNIQUE KEY `tipo_22` (`tipo`),
  ADD UNIQUE KEY `tipo_23` (`tipo`),
  ADD UNIQUE KEY `tipo_24` (`tipo`),
  ADD UNIQUE KEY `tipo_25` (`tipo`),
  ADD UNIQUE KEY `tipo_26` (`tipo`),
  ADD UNIQUE KEY `tipo_27` (`tipo`),
  ADD UNIQUE KEY `tipo_28` (`tipo`),
  ADD UNIQUE KEY `tipo_29` (`tipo`),
  ADD UNIQUE KEY `tipo_30` (`tipo`),
  ADD UNIQUE KEY `tipo_31` (`tipo`),
  ADD UNIQUE KEY `tipo_32` (`tipo`),
  ADD UNIQUE KEY `tipo_33` (`tipo`),
  ADD UNIQUE KEY `tipo_34` (`tipo`);

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
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD KEY `id_Rol` (`id_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  MODIFY `id_Admision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
-- AUTO_INCREMENT de la tabla `nombre_sintoma`
--
ALTER TABLE `nombre_sintoma`
  MODIFY `id_Nombre_Sintoma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_Paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `paciente_alergias`
--
ALTER TABLE `paciente_alergias`
  MODIFY `id_Alergia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `paciente_antecedentes_familiares`
--
ALTER TABLE `paciente_antecedentes_familiares`
  MODIFY `id_Antecedente_Familiar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `paciente_cirugias`
--
ALTER TABLE `paciente_cirugias`
  MODIFY `id_cirugia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `paciente_diagnosticos`
--
ALTER TABLE `paciente_diagnosticos`
  MODIFY `id_Paciente_Diagnosticos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `paciente_evaluacion_fisica`
--
ALTER TABLE `paciente_evaluacion_fisica`
  MODIFY `id_Evaluacion_fisica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `paciente_medicacion_actual`
--
ALTER TABLE `paciente_medicacion_actual`
  MODIFY `id_Paciente_Medicacion_Actual` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `paciente_pruebas_diagnosticas`
--
ALTER TABLE `paciente_pruebas_diagnosticas`
  MODIFY `id_Prueba_Diagnostica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `paciente_recetas`
--
ALTER TABLE `paciente_recetas`
  MODIFY `id_Receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `paciente_seguro_medico`
--
ALTER TABLE `paciente_seguro_medico`
  MODIFY `id_seguro_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente_tratamientos`
--
ALTER TABLE `paciente_tratamientos`
  MODIFY `id_tratamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
-- AUTO_INCREMENT de la tabla `recetas_medicamentos`
--
ALTER TABLE `recetas_medicamentos`
  MODIFY `id_Recetas_Medicamentos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sintomas`
--
ALTER TABLE `sintomas`
  MODIFY `id_Sintoma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tipo_de_admision`
--
ALTER TABLE `tipo_de_admision`
  MODIFY `id_tipo_de_admision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_de_diagnostico`
--
ALTER TABLE `tipo_de_diagnostico`
  MODIFY `id_tipo_de_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD CONSTRAINT `admisiones_ibfk_166` FOREIGN KEY (`id_motivo_de_Internacion`) REFERENCES `motivo_de_internacion` (`id_motivo_de_Internacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_167` FOREIGN KEY (`id_prioridad_de_atencion`) REFERENCES `prioridad_de_atencion` (`id_prioridad_de_atencion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_168` FOREIGN KEY (`id_tipo_de_admision`) REFERENCES `tipo_de_admision` (`id_tipo_de_admision`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_169` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_170` FOREIGN KEY (`id_Cama`) REFERENCES `hospital_camas` (`id_Cama`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
-- Filtros para la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`id_tipo_de_medicamento`) REFERENCES `tipo_de_medicamento` (`id_tipo_de_medicamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_67` FOREIGN KEY (`id_Especialidad`) REFERENCES `especialidades` (`id_Especialidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicos_ibfk_68` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_Usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_67` FOREIGN KEY (`id_tipo_sanguineo`) REFERENCES `tipo_sanguineo` (`id_tipo_sanguineo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pacientes_ibfk_68` FOREIGN KEY (`id_seguro_medico`) REFERENCES `paciente_seguro_medico` (`id_seguro_medico`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_alergias`
--
ALTER TABLE `paciente_alergias`
  ADD CONSTRAINT `paciente_alergias_ibfk_100` FOREIGN KEY (`id_nombre_alergia`) REFERENCES `nombre_alergia` (`id_nombre_alergia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_alergias_ibfk_101` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_alergias_ibfk_102` FOREIGN KEY (`id_tratamiento`) REFERENCES `paciente_tratamientos` (`id_tratamiento`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_antecedentes_familiares`
--
ALTER TABLE `paciente_antecedentes_familiares`
  ADD CONSTRAINT `paciente_antecedentes_familiares_ibfk_37` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_antecedentes_familiares_ibfk_38` FOREIGN KEY (`id_Lazo_Familiar`) REFERENCES `lazo_familiar` (`id_Lazo_Familiar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_cirugias`
--
ALTER TABLE `paciente_cirugias`
  ADD CONSTRAINT `paciente_cirugias_ibfk_122` FOREIGN KEY (`id_nombre_cirugia`) REFERENCES `nombre_cirugia` (`id_nombre_cirugia`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_cirugias_ibfk_123` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_cirugias_ibfk_124` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_cirugias_ibfk_125` FOREIGN KEY (`id_Admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_diagnosticos`
--
ALTER TABLE `paciente_diagnosticos`
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_149` FOREIGN KEY (`id_tipo_de_diagnostico`) REFERENCES `tipo_de_diagnostico` (`id_tipo_de_diagnostico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_150` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_151` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_diagnosticos_ibfk_152` FOREIGN KEY (`id_Admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_evaluacion_fisica`
--
ALTER TABLE `paciente_evaluacion_fisica`
  ADD CONSTRAINT `paciente_evaluacion_fisica_ibfk_58` FOREIGN KEY (`id_Admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_evaluacion_fisica_ibfk_59` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_evaluacion_fisica_ibfk_60` FOREIGN KEY (`id_Enfermero`) REFERENCES `enfermeros` (`id_Enfermero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_medicacion_actual`
--
ALTER TABLE `paciente_medicacion_actual`
  ADD CONSTRAINT `paciente_medicacion_actual_ibfk_73` FOREIGN KEY (`id_Medicamento`) REFERENCES `medicamentos` (`id_Medicamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_medicacion_actual_ibfk_74` FOREIGN KEY (`id_Admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_medicacion_actual_ibfk_75` FOREIGN KEY (`id_Paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_pruebas_diagnosticas`
--
ALTER TABLE `paciente_pruebas_diagnosticas`
  ADD CONSTRAINT `paciente_pruebas_diagnosticas_ibfk_100` FOREIGN KEY (`id_nombre_prueba_diagnostica`) REFERENCES `nombre_prueba_diagnostica` (`id_nombre_prueba_diagnostica`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_pruebas_diagnosticas_ibfk_101` FOREIGN KEY (`id_diagnostico`) REFERENCES `paciente_diagnosticos` (`id_Paciente_Diagnosticos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_pruebas_diagnosticas_ibfk_102` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_recetas`
--
ALTER TABLE `paciente_recetas`
  ADD CONSTRAINT `paciente_recetas_ibfk_101` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_recetas_ibfk_102` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_recetas_ibfk_103` FOREIGN KEY (`id_admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_seguro_medico`
--
ALTER TABLE `paciente_seguro_medico`
  ADD CONSTRAINT `paciente_seguro_medico_ibfk_67` FOREIGN KEY (`id_mutual`) REFERENCES `mutuales` (`id_mutual`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_seguro_medico_ibfk_68` FOREIGN KEY (`id_categoria_seguro`) REFERENCES `categoriasseguros` (`id_Categoria_Seguro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente_tratamientos`
--
ALTER TABLE `paciente_tratamientos`
  ADD CONSTRAINT `paciente_tratamientos_ibfk_160` FOREIGN KEY (`id_tipo_de_tratamiento`) REFERENCES `tipo_de_tratamiento` (`id_Tipo_De_Tratamiento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_161` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_162` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_Medicamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_163` FOREIGN KEY (`id_enfermero`) REFERENCES `enfermeros` (`id_Enfermero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_164` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_165` FOREIGN KEY (`id_Paciente_Diagnosticos`) REFERENCES `paciente_diagnosticos` (`id_Paciente_Diagnosticos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paciente_tratamientos_ibfk_166` FOREIGN KEY (`id_admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personal_de_admision`
--
ALTER TABLE `personal_de_admision`
  ADD CONSTRAINT `personal_de_admision_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_Usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetas_medicamentos`
--
ALTER TABLE `recetas_medicamentos`
  ADD CONSTRAINT `recetas_medicamentos_ibfk_15` FOREIGN KEY (`id_Receta`) REFERENCES `paciente_recetas` (`id_Receta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recetas_medicamentos_ibfk_16` FOREIGN KEY (`id_Medicamento`) REFERENCES `medicamentos` (`id_Medicamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sintomas`
--
ALTER TABLE `sintomas`
  ADD CONSTRAINT `sintomas_ibfk_72` FOREIGN KEY (`id_Admision`) REFERENCES `admisiones` (`id_Admision`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `sintomas_ibfk_73` FOREIGN KEY (`id_Nombre_Sintoma`) REFERENCES `nombre_sintoma` (`id_Nombre_Sintoma`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_91` FOREIGN KEY (`id_horario_turno`) REFERENCES `horarios_turnos` (`id_horario_turno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_92` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_Paciente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_93` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_Medico`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_Rol`) REFERENCES `roles` (`id_Rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
