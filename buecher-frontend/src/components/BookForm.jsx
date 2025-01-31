import React, { useState } from 'react';
import axios from 'axios';
import './css/BookForm.css';

const BookForm = ({ onBookAdded, bookToEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    Title: bookToEdit?.Title || '',
    Autor: bookToEdit?.Autor || '',
    Genre: bookToEdit?.Genre || '',
    Erscheinungsjahr: bookToEdit?.Erscheinungsjahr || '',
    ISBN: bookToEdit?.ISBN || '',
  });

  const fields = [
    {name: 'Title', label: 'Title', type: 'text'},
    {name: 'Autor', label: 'Autor', type: 'text'},
    {name: 'Genre', label: 'Genre', type: 'text'},
    {name: 'Erscheinungsjahr', label: 'Erscheinungsjahr', type: 'number'},
    {name: 'ISBN', label: 'ISBN', type: 'text'}
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookToEdit) {
        // Update Buch
        await axios.put(`http://localhost:5000/buch/${bookToEdit.ID}`, formData);
        alert('Buch erfolgreich aktualisiert!');
      } else {
        // Neues Buch hinzufügen
        await axios.post('http://localhost:5000/buch', formData);
        alert('Buch erfolgreich hinzugefügt!');
      }
      onBookAdded(); // Informiere über Änderungen
    } catch (error) {
      if (error.response) {
        alert(`Fehler: ${error.response.data}`);
      } else {
        alert('Netzwerkfehler');
      }
    }
  };

  //Eingaben löschen
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
      {fields.map((fields) => (
        <div key={fields.name}>
          <label htmlFor={fields.name}>{fields.label}</label>
          <input
            type={fields.type}
            name={fields.name}
            value={formData[fields.name]}
            onChange={handleChange}
            placeholder={`Bitte ${fields.label.toLowerCase()} eingeben`}
            required
          />
        </div>
      ))}
      <div className='button-group'>        
        <button type='submit'>{bookToEdit ? 'Aktualisieren' : 'Hinzufügen'}</button> 
        <button type='button' onClick={handleClear} className='cancel-btn'>Abbrechen</button>
        <button type="button" onClick={onCancel} className="back-btn">Zurück</button>
      </div>
    </form>
  );

};

export default BookForm;