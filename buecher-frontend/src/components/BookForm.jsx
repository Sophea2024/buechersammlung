import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/BookForm.css';

const BookForm = ({ onBookAdded, bookToEdit, onCancel }) => {

  const [formData, setFormData] = useState({
    Title: '',
    Autor: '',
    Genre: '',
    Erscheinungsjahr: '',
    ISBN: '',
  });

  // FIX: Daten setzen wenn bookToEdit kommt
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        Title: bookToEdit.Title || '',
        Autor: bookToEdit.Autor || '',
        Genre: bookToEdit.Genre || '',
        Erscheinungsjahr: bookToEdit.Erscheinungsjahr || '',
        ISBN: bookToEdit.ISBN || '',
      });
    }
  }, [bookToEdit]);

  const fields = [
    { name: 'Title', label: 'Title', type: 'text' },
    { name: 'Autor', label: 'Autor', type: 'text' },
    { name: 'Genre', label: 'Genre', type: 'text' },
    { name: 'Erscheinungsjahr', label: 'Erscheinungsjahr', type: 'number' },
    { name: 'ISBN', label: 'ISBN', type: 'text' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (bookToEdit) {
        // UPDATE FIX
        await axios.put(
          `http://localhost:5000/buch/${bookToEdit.id}`,
          formData
        );
        alert('Buch erfolgreich aktualisiert!');
      } else {
        // CREATE
        await axios.post('http://localhost:5000/buch', formData);
        alert('Buch erfolgreich hinzugefügt!');
      }

      onBookAdded();

    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Fehler beim Speichern');
    }
  };

  const handleClear = () => {
    setFormData({
      Title: '',
      Autor: '',
      Genre: '',
      Erscheinungsjahr: '',
      ISBN: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>{bookToEdit ? 'Buch aktualisieren' : 'Buch hinzufügen'}</h2>

      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={`Bitte ${field.label.toLowerCase()} eingeben`}
            required
          />
        </div>
      ))}

      <div className='button-group'>
        <button type='submit'>
          {bookToEdit ? 'Aktualisieren' : 'Hinzufügen'}
        </button>

        <button type='button' onClick={handleClear} className='cancel-btn'>
          Leeren
        </button>

        <button type='button' onClick={onCancel} className='back-btn'>
          Zurück
        </button>
      </div>
    </form>
  );
};

export default BookForm;