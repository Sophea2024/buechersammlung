const mysql = require('mysql2');

// Verbindung zur Railway-Datenbank herstellen
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Fehlerbehandlung
connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur MySQL-Datenbank:', err);
  } else {
    console.log('🚀 Erfolgreich mit MySQL verbunden!');
  }
});

module.exports = connection;