import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopContainer';
import Button from 'react-bootstrap/Button';
import './css/BookList.css';
import { FaPlus } from 'react-icons/fa'; // Importiere ein Icon

const BookList = ({ refresh, onEdit, onShowForm }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://mysql.railway.internal');
        setBooks(response.data); // Erwarte ein Array von Büchern
      } catch (error) {
        console.error('Fehler beim Laden der Bücher:', error);
      }
    };

    fetchBooks();
  }, [refresh]); // Aktualisiert die Tabelle, wenn `refresh` sich ändert

  

  return (
    <div>      
      <h2>Bücherliste</h2>
      <div className="button-addBook">
        <Button onClick={onShowForm}>
          <FaPlus /> Buch hinzufügen
        </Button>
      </div>
      <div className="table-container" >
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titel</th>
            <th>Autor</th>
            <th>Genre</th>
            <th>Erscheinungsjahr</th>
            <th>ISBN</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.ID}>
              <td>{book.ID}</td>
              <td>{book.Title}</td>
              <td>{book.Autor}</td>
              <td>{book.Genre}</td>
              <td>{book.Erscheinungsjahr}</td>
              <td>{book.ISBN}</td>
              <td>
                <button onClick={() => onEdit(book)}>Bearbeiten</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default BookList;

