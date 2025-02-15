-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-01-2025 a las 23:19:47
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
-- Base de datos: `eventos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFin` time NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `organizador` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `registro` varchar(255) NOT NULL,
  `aprobado` tinyint(1) DEFAULT 0,
  `finalizado` tinyint(1) GENERATED ALWAYS AS (case when `fecha` < current_timestamp() then 1 else 0 end) VIRTUAL,
  `denegado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `fecha`, `horaInicio`, `horaFin`, `lugar`, `organizador`, `descripcion`, `registro`, `aprobado`, `denegado`) VALUES
(9, 'Taller de Programación', '2025-01-09', '10:00:00', '12:00:00', 'Aula 101', 'Escuela STEAM', 'Un taller introductorio a la programación para estudiantes.', 'http://example.com/registro-taller-programacion', 0, 0),
(10, 'Charla sobre Robótica', '2025-01-23', '14:00:00', '16:00:00', 'Aula 102', 'Escuela STEAM', 'Charla sobre las últimas tendencias en robótica.', 'http://example.com/registro-charla-robotica', 1, 0),
(11, 'Día de Juegos Científicos', '2024-12-25', '09:00:00', '17:00:00', 'Gimnasio', 'Escuela STEAM', 'Un día lleno de juegos y experimentos científicos.', 'http://example.com/registro-juegos-cientificos', 0, 0),
(12, 'Exposición de Proyectos', '2024-12-26', '11:00:00', '15:00:00', 'Sala Principal', 'Escuela STEAM', 'Exposición de proyectos realizados por los estudiantes.', 'http://example.com/registro-exposicion-proyectos', 0, 0),
(13, 'Concurso de Matemáticas', '2024-12-27', '10:30:00', '13:30:00', 'Aula 103', 'Escuela STEAM', 'Competencia para estudiantes con pasión por las matemáticas.', 'http://example.com/registro-concurso-matematicas', 0, 0),
(14, 'Clase Abierta de Arte', '2024-12-28', '16:00:00', '18:00:00', 'Aula de Arte', 'Escuela STEAM', 'Clase abierta para explorar técnicas artísticas.', 'http://example.com/registro-clase-abierta-arte', 0, 0),
(15, 'Taller de Ciencias Naturales', '2024-12-29', '09:30:00', '11:30:00', 'Laboratorio de Ciencias', 'Escuela STEAM', 'Un taller práctico sobre ciencias naturales.', 'http://example.com/registro-taller-ciencias-naturales', 0, 0),
(16, 'Fiesta de Fin de Año Escolar', '2024-12-30', '18:00:00', '21:00:00', 'Gimnasio Principal', 'Escuela STEAM', 'Celebración del fin del año escolar con actividades y sorpresas.', 'http://example.com/registro-fiesta-fin-de-año', 0, 0),
(17, 'Clase Robótica', '2025-01-11', '10:30:00', '12:30:00', 'Aula C112', 'Bemposta', 'Clase para realizar la prueba del trabajo final', 'https://example.com/robots', 1, 0),
(20, 'Clase Robótica', '2025-01-12', '10:30:00', '12:30:00', 'Aula C112', 'Bemposta', 'Clase para realizar la prueba del trabajo final', 'https://example.com/robots', 1, 0),
(21, 'Trabajo webs', '2025-01-10', '08:30:00', '10:30:00', 'Aula C304', 'Ana', 'Presentación trabajo desarrollo webs', 'https://example.com/webs', 1, 0),
(22, 'Presentación SSII', '2025-01-14', '12:20:00', '14:20:00', 'Laboratorio Veterinaria', 'Escuela STEAM', 'Presentación trabajo Sistemas Inteligentes', 'https://www.example.com/SSII', 1, 0),
(23, 'a', '2025-01-15', '12:12:00', '12:45:00', 'a', 'a', 'a', 'https://example.com/aa', 1, 0),
(24, 'b', '2025-01-09', '12:12:00', '13:13:00', 'b', 'b', 'b', 'https://example.com/register-b', 0, 0),
(25, 'Presentación SSII', '2025-01-11', '16:30:00', '17:30:00', 'clase c304', 'miguel', 'presenracion', 'https://www.example.com/SSII-presentacion', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('estudiante','profesor') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `user_type`, `created_at`) VALUES
(1, 'fasc', 'sdf@gmail.com', '$2y$10$8XjggSptPLlBOLBzAgvqi.Aey6OGCXmia459KqBuLF6EkEw2w1Anu', 'estudiante', '2024-12-22 09:21:21'),
(2, 'alara', 'alara@gmail.com', '$2y$10$rF/2q0VcpM2OpCHkQNf.FeYLT7qRNxqx.VOZm.YyNHUZVShLVD3.i', 'estudiante', '2024-12-22 09:22:12'),
(3, 'borja', 'sabiondo@gmail.com', '$2y$10$e3ZiUm14d0virpxFopMbhuG3FD78oASTlsRva5ojldZdm1zbvwwee', 'estudiante', '2025-01-08 09:45:51'),
(4, 'ana', 'ana@ana.com', '$2y$10$r1gFKAUrNyXW252P2BXwsu/YpLWJLF6WFM4x9cNG6RlPcYAQb280C', 'profesor', '2025-01-08 12:04:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
