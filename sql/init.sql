CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS messages(
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(50),
    message VARCHAR,
    created_at TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO messages (email, message, created_at) VALUES ('teste@teste', 'mensagem de teste', 'CURRENT_TIMESTAMP(2)')
