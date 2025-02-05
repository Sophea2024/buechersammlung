const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ||5000;

//Middleware
app.use(cors({
    origin: 'https://sophea2024.github.io',  // Erlaubt Anfragen von deinem Frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Hier den MySQL-Service-Namen verwenden
  user: process.env.DB_USER,  // Benutzername
  password: process.env.DB_PASSWORD,  // Passwort
  database: process.env.DB_NAME,  // Datenbankname
  port: process.env.DB_PORT  // Standardport 3306
});

db.connect(err => {
    if (err) {
        console.error('MySQL-Verbindung fehlgeschlagen:', err);
        return;
    }
    console.log('Mit MySQL verbindung');
});

// Beispiel-Route
app.get('/', (req, res) => {
    res.send('Willkommen im Bücher-Backend!');
});

//API-Rout: Bücher aus der Datenbank abrufen
app.get('/buecher', (req, res) =>{
    const query = 'SELECT * FROM buecher'; // Tabelle "buecher" vorausgesetzt
    db.query(query, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Daten:', err);
            res.status(500).send('Daten konnte nicht abgerufen werden');
            return;
        }
        res.json(results);
    });
});

// Buch einzufügen
app.post('/buch', (req, res) => {
    const { Title, Autor, Genre, Erscheinungsjahr, ISBN, Hinzugefügt_am } = req.body;
    const query = 'INSERT INTO buecher (Title, Autor, Genre, Erscheinungsjahr, ISBN, Hinzugefügt_am) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [Title, Autor, Genre, Erscheinungsjahr, ISBN, Hinzugefügt_am], (err, results) => {
        if (err) {
            console.error('Fehler beim Hinzufügen eines Buches:', err);
            res.status(500).send('Buch konnte nicht hinzugefügt werden');
            return;
        }
        res.status(201).send('Buch erfolgreich hinzugefügt');
    });
});

//Buch aktualisieren
app.put('/buch/:id', (req, res) =>{
    const {id} = req.params;
    const {Title, Autor, Genre, Erscheinungsjahr, ISBN} = req.body;
    const query = 'UPDATE buecher SET Title = ?, Autor = ?, Genre = ?, Erscheinungsjahr = ?, ISBN = ? WHERE id = ?';
    db.query(query, [Title, Autor, Genre, Erscheinungsjahr, ISBN, id], (err, results) => {
        if (err) {
            console.error('Fehler beim Aktualisieren des Buches:', err);
            res.status(500).send('Buch konnte nicht aktualisiert werden');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Kein Buch mit dieser ID gefunden');
        } else {
            res.status(200).send('Buch erfolgreich aktualisiert');
        }
    });
});

// Buch löschen
app.delete('/buch/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM buecher WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Fehler beim Löschen des Buches:', err);
        res.status(500).send('Buch konnte nicht gelöscht werden');
        return;
      }
      if (results.affectedRows === 0) {
        console.log('Kein Buch mit dieser ID gefunden:', id);
        res.status(404).send('Kein Buch mit dieser ID gefunden');
        } else {
            console.log('Buch erfolgreich gelöscht:', id);
            res.send('Buch erfolgreich gelöscht');
        }
    });
  });

// Server starten
app.listen(PORT, () =>{
    console.log(`Server läuft auf http://localhost:${PORT} und 'Strg + C' ende den Prozess`);
});