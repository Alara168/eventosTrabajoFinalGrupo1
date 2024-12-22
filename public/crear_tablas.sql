CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('estudiante', 'profesor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    horaInicio TIME NOT NULL,
    horaFin TIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    organizador VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    registro VARCHAR(255) NOT NULL
);


INSERT INTO eventos (titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro) VALUES
('Taller de Programación', '2024-12-23', '10:00:00', '12:00:00', 'Aula 101', 'Escuela STEAM', 'Un taller introductorio a la programación para estudiantes.', 'http://example.com/registro-taller-programacion'),
('Charla sobre Robótica', '2024-12-24', '14:00:00', '16:00:00', 'Aula 102', 'Escuela STEAM', 'Charla sobre las últimas tendencias en robótica.', 'http://example.com/registro-charla-robotica'),
('Día de Juegos Científicos', '2024-12-25', '09:00:00', '17:00:00', 'Gimnasio', 'Escuela STEAM', 'Un día lleno de juegos y experimentos científicos.', 'http://example.com/registro-juegos-cientificos'),
('Exposición de Proyectos', '2024-12-26', '11:00:00', '15:00:00', 'Sala Principal', 'Escuela STEAM', 'Exposición de proyectos realizados por los estudiantes.', 'http://example.com/registro-exposicion-proyectos'),
('Concurso de Matemáticas', '2024-12-27', '10:30:00', '13:30:00', 'Aula 103', 'Escuela STEAM', 'Competencia para estudiantes con pasión por las matemáticas.', 'http://example.com/registro-concurso-matematicas'),
('Clase Abierta de Arte', '2024-12-28', '16:00:00', '18:00:00', 'Aula de Arte', 'Escuela STEAM', 'Clase abierta para explorar técnicas artísticas.', 'http://example.com/registro-clase-abierta-arte'),
('Taller de Ciencias Naturales', '2024-12-29', '09:30:00', '11:30:00', 'Laboratorio de Ciencias', 'Escuela STEAM', 'Un taller práctico sobre ciencias naturales.', 'http://example.com/registro-taller-ciencias-naturales'),
('Fiesta de Fin de Año Escolar', '2024-12-30', '18:00:00', '21:00:00', 'Gimnasio Principal', 'Escuela STEAM', 'Celebración del fin del año escolar con actividades y sorpresas.', 'http://example.com/registro-fiesta-fin-de-año');
