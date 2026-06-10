-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2026 a las 18:50:12
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
-- Base de datos: `fotaza2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colecciones`
--

CREATE TABLE `colecciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `publicacion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `texto`, `user_id`, `publicacion_id`) VALUES
(5, 'Formateos haces? pasame precio', 2, 2),
(6, 'tengo varias maquinas para llevarte respondeme', 2, 2),
(7, 'Que sale  ?', 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncias`
--

CREATE TABLE `denuncias` (
  `id` int(11) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `imagen_id` int(11) DEFAULT NULL,
  `comentario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `denuncias`
--

INSERT INTO `denuncias` (`id`, `motivo`, `descripcion`, `user_id`, `imagen_id`, `comentario_id`) VALUES
(11, 'Contenido inapropiado', 'Denuncia desde detalle', 1, 7, NULL),
(12, 'Contenido inapropiado', 'Denuncia desde detalle', 5, 7, NULL),
(13, 'Contenido inapropiado', 'Denuncia desde detalle', 4, 7, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `coleccion_id` int(11) DEFAULT NULL,
  `publicacion_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `imagen_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `coleccion_id`, `publicacion_id`, `user_id`, `imagen_id`) VALUES
(15, NULL, NULL, 1, NULL),
(17, NULL, NULL, 2, 2),
(19, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `seguido_id` int(11) DEFAULT NULL,
  `seguidor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `followers`
--

INSERT INTO `followers` (`id`, `seguido_id`, `seguidor_id`) VALUES
(6, 1, 2),
(4, 2, 1),
(8, 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `licencia` enum('copyright','libre') NOT NULL,
  `marca_agua` varchar(255) DEFAULT NULL,
  `publicacion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `url`, `licencia`, `marca_agua`, `publicacion_id`) VALUES
(2, '/uploads/1780437871127-ChatGPT Image 15 abr 2026, 11_47_19.png', 'libre', NULL, 2),
(4, '/uploads/1781042767348-1232906.jpg', 'libre', NULL, 4),
(5, '/uploads/1781042796116-fc11680f8879f4ac721d260b5f8ae63c.jpg', 'libre', NULL, 5),
(7, '/uploads/1781046063229-479996.jpg', 'libre', NULL, 7),
(8, '/uploads/1781108343486-349 (35).jpg', 'libre', NULL, 8),
(9, '/uploads/1781108579427-349 (10).jpg', 'libre', NULL, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intereses`
--

CREATE TABLE `intereses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `imagen_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `tipo` enum('comentario','valoracion','follow','interes','bloqueo') NOT NULL,
  `leida` tinyint(1) DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `publicacion_id` int(11) DEFAULT NULL,
  `imagen_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `tipo`, `leida`, `user_id`, `actor_id`, `publicacion_id`, `imagen_id`, `created_at`, `updated_at`) VALUES
(1, 'follow', 1, 1, 2, NULL, NULL, '2026-06-02 21:40:03', '2026-06-09 20:35:04'),
(2, 'comentario', 1, 2, 1, NULL, NULL, '2026-06-03 21:19:58', '2026-06-08 23:03:51'),
(3, 'comentario', 1, 2, 1, NULL, NULL, '2026-06-03 22:08:38', '2026-06-08 23:03:51'),
(4, 'comentario', 1, 2, 1, NULL, NULL, '2026-06-08 22:05:40', '2026-06-08 23:03:51'),
(5, 'comentario', 1, 2, 1, NULL, NULL, '2026-06-08 22:06:47', '2026-06-08 23:03:51'),
(6, 'comentario', 1, 1, 2, 2, NULL, '2026-06-09 20:41:56', '2026-06-09 20:43:29'),
(7, 'comentario', 1, 1, 2, 2, NULL, '2026-06-09 20:50:05', '2026-06-09 20:50:13'),
(8, '', 1, 2, 1, NULL, NULL, '2026-06-09 21:48:50', '2026-06-09 21:49:32'),
(9, '', 1, 2, 4, NULL, NULL, '2026-06-09 22:07:23', '2026-06-09 22:08:19'),
(10, '', 1, 2, 5, NULL, NULL, '2026-06-09 22:39:27', '2026-06-09 22:39:43'),
(11, 'bloqueo', 1, 2, 4, NULL, NULL, '2026-06-09 23:01:47', '2026-06-09 23:02:04'),
(12, 'follow', 0, 4, 5, NULL, NULL, '2026-06-10 16:24:03', '2026-06-10 16:24:03'),
(13, 'follow', 0, 4, 5, NULL, NULL, '2026-06-10 16:24:09', '2026-06-10 16:24:09'),
(14, 'comentario', 0, 2, 5, 5, NULL, '2026-06-10 16:24:32', '2026-06-10 16:24:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `comentarios_habilitados` tinyint(1) DEFAULT 1,
  `bloqueada` tinyint(1) DEFAULT 0,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `titulo`, `descripcion`, `comentarios_habilitados`, `bloqueada`, `user_id`) VALUES
(2, 'Venta de Pc', 'Venta y Armado de pc', 1, 0, 1),
(4, 'Recien saliditaaa', 'saque esta a la venta, yayaya ', 1, 0, 2),
(5, 'vendiendo', 'dasdasd', 1, 0, 2),
(7, 'Vendooo', 'van saliendo, precio al dm', 1, 1, 2),
(8, 'Paisaje', 'paisaje modo de prueba ', 1, 0, 5),
(9, 'Paisaje 2', 'creando publicacion de prueba ', 1, 0, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion_etiquetas`
--

CREATE TABLE `publicacion_etiquetas` (
  `id` int(11) NOT NULL,
  `publicacion_id` int(11) DEFAULT NULL,
  `etiqueta_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `publicaciones_bajadas` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `activo`, `publicaciones_bajadas`) VALUES
(1, 'Luis Segura', 'Luis@test.com', '$2b$10$Ry8o8wUigXv4DLY/GwcNVOgU9CHOxrs.Rc.GArPd332s6eJ3sfMxG', 1, 0),
(2, 'Tester Man', 'man@tester.com', '$2b$10$VEaUzn9C0H8lJKBmZDKEHe4bAySX1qF56c9J1o3q.8sFbIW0c37um', 1, 0),
(4, 'Test2', 'man2@tester.com', '$2b$10$q/3U5uHPJQHPRBoUqZXK.e668pwnftN3ngRRbRicXnGsH4y9NaWLm', 1, 0),
(5, 'brenlolo', 'bren@lopez.com', '$2b$10$fJYzutIxHfIJNYY6Hy/EPemMtHVvw7JnjcZkbDt22vfB/tqFGOEBW', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

CREATE TABLE `valoraciones` (
  `id` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `imagen_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoraciones`
--

INSERT INTO `valoraciones` (`id`, `puntuacion`, `user_id`, `imagen_id`) VALUES
(4, 1, 2, 2),
(10, 1, 5, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `colecciones`
--
ALTER TABLE `colecciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `publicacion_id` (`publicacion_id`);

--
-- Indices de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `imagen_id` (`imagen_id`),
  ADD KEY `comentario_id` (`comentario_id`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `nombre_2` (`nombre`),
  ADD UNIQUE KEY `nombre_3` (`nombre`),
  ADD UNIQUE KEY `nombre_4` (`nombre`),
  ADD UNIQUE KEY `nombre_5` (`nombre`),
  ADD UNIQUE KEY `nombre_6` (`nombre`),
  ADD UNIQUE KEY `nombre_7` (`nombre`),
  ADD UNIQUE KEY `nombre_8` (`nombre`),
  ADD UNIQUE KEY `nombre_9` (`nombre`),
  ADD UNIQUE KEY `nombre_10` (`nombre`),
  ADD UNIQUE KEY `nombre_11` (`nombre`),
  ADD UNIQUE KEY `nombre_12` (`nombre`),
  ADD UNIQUE KEY `nombre_13` (`nombre`),
  ADD UNIQUE KEY `nombre_14` (`nombre`),
  ADD UNIQUE KEY `nombre_15` (`nombre`),
  ADD UNIQUE KEY `nombre_16` (`nombre`),
  ADD UNIQUE KEY `nombre_17` (`nombre`),
  ADD UNIQUE KEY `nombre_18` (`nombre`),
  ADD UNIQUE KEY `nombre_19` (`nombre`),
  ADD UNIQUE KEY `nombre_20` (`nombre`),
  ADD UNIQUE KEY `nombre_21` (`nombre`),
  ADD UNIQUE KEY `nombre_22` (`nombre`),
  ADD UNIQUE KEY `nombre_23` (`nombre`),
  ADD UNIQUE KEY `nombre_24` (`nombre`),
  ADD UNIQUE KEY `nombre_25` (`nombre`),
  ADD UNIQUE KEY `nombre_26` (`nombre`),
  ADD UNIQUE KEY `nombre_27` (`nombre`),
  ADD UNIQUE KEY `nombre_28` (`nombre`),
  ADD UNIQUE KEY `nombre_29` (`nombre`),
  ADD UNIQUE KEY `nombre_30` (`nombre`),
  ADD UNIQUE KEY `nombre_31` (`nombre`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favoritos_publicacion_id_coleccion_id_unique` (`coleccion_id`,`publicacion_id`),
  ADD KEY `publicacion_id` (`publicacion_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `imagen_id` (`imagen_id`);

--
-- Indices de la tabla `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `followers_seguidor_id_seguido_id_unique` (`seguido_id`,`seguidor_id`),
  ADD KEY `seguidor_id` (`seguidor_id`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publicacion_id` (`publicacion_id`);

--
-- Indices de la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `imagen_id` (`imagen_id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `actor_id` (`actor_id`),
  ADD KEY `publicacion_id` (`publicacion_id`),
  ADD KEY `imagen_id` (`imagen_id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `publicacion_etiquetas`
--
ALTER TABLE `publicacion_etiquetas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publicacion_etiquetas_etiqueta_id_publicacion_id_unique` (`publicacion_id`,`etiqueta_id`),
  ADD KEY `etiqueta_id` (`etiqueta_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `username_9` (`username`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `username_10` (`username`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `username_11` (`username`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `username_12` (`username`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `username_13` (`username`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `username_14` (`username`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `username_15` (`username`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `username_16` (`username`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `username_17` (`username`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `username_18` (`username`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `username_19` (`username`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `username_20` (`username`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `username_21` (`username`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `username_22` (`username`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `username_23` (`username`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `username_24` (`username`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `username_25` (`username`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `username_26` (`username`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `username_27` (`username`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `username_28` (`username`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `username_29` (`username`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `username_30` (`username`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `username_31` (`username`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `username_32` (`username`);

--
-- Indices de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `imagen_id` (`imagen_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `colecciones`
--
ALTER TABLE `colecciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `intereses`
--
ALTER TABLE `intereses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `publicacion_etiquetas`
--
ALTER TABLE `publicacion_etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `colecciones`
--
ALTER TABLE `colecciones`
  ADD CONSTRAINT `colecciones_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_62` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD CONSTRAINT `denuncias_ibfk_87` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `denuncias_ibfk_88` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `denuncias_ibfk_89` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_73` FOREIGN KEY (`coleccion_id`) REFERENCES `colecciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_74` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_75` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_76` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`seguido_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`seguidor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD CONSTRAINT `intereses_ibfk_59` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `intereses_ibfk_60` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_121` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_122` FOREIGN KEY (`actor_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_123` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_124` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicacion_etiquetas`
--
ALTER TABLE `publicacion_etiquetas`
  ADD CONSTRAINT `publicacion_etiquetas_ibfk_61` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publicacion_etiquetas_ibfk_62` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD CONSTRAINT `valoraciones_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `valoraciones_ibfk_62` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
