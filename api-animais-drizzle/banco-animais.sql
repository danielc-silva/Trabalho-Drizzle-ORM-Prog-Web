-- Criação do Banco de Dados
CREATE DATABASE "banco-animais";

-- Criação da Tabela animais
CREATE TABLE IF NOT EXISTS animais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade INTEGER NOT NULL
);

-- Populando a tabela
INSERT INTO animais (nome, especie, idade) VALUES
('Rex', 'Cachorro', 4),
('Mimi', 'Gato', 2),
('Thor', 'Cachorro', 6),
('Luna', 'Gato', 1),
('Pipoca', 'Hamster', 1),
('Polly', 'Papagaio', 12);