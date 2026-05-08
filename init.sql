USE buechersammlung;

CREATE TABLE IF NOT EXISTS buecher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Autor VARCHAR(255),
    Genre VARCHAR(100),
    Erscheinungsjahr INT,
    ISBN VARCHAR(50),
    Hinzugefügt_am TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT 'INIT OK';