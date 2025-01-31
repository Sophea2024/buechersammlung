import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleBookAdded = () => {
    setRefresh(!refresh); // Trigger eine Aktualisierung
    setBookToEdit(null); // Zurücksetzen des Edit-Modus
    setShowForm(false);
  };

  const handleEdit = (book) => {
    setBookToEdit(book); // Setzt das zu bearbeitende Buch
    setShowForm(true);
  }

  return (
    <div className='main-container'>
      <h1>Bücherverwaltung</h1>
      {!showForm ? (
        <BookList refresh={refresh} onEdit={handleEdit} onShowForm={() => setShowForm(true)}/>
      ):(
        <BookForm onBookAdded={handleBookAdded} bookToEdit={bookToEdit} onCancel={() => setShowForm(false)}/>
    )}
    </div>
  );
}

export default App;
