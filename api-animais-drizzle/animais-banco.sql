-- Criação do Banco de Dados
CREATE DATABASE "banco-animais";

-- Conectar ao banco criado antes de executar a criação da tabela
-- Se estiver no pgAdmin: abra a Query Tool conectado especificamente dentro do banco "banco-animais"

-- 3. Criação da Tabela animais
CREATE TABLE IF NOT EXISTS animais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade INTEGER NOT NULL
);