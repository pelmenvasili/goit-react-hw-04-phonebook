import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import css from './App.module.css';

const App = () => {
const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts ?? [];
  });
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = ({ name, number }) => {
    const nameExists = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (nameExists) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const id = nanoid();
    const newContact = { id, name, number };
    setContacts(prevState => [...prevState, newContact]);
  };

 const handleFilterChange = event => {
     setFilter(event.target.value)
  };

  const handleContactDelete = id => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== id));
  };

const  filteredContacts = () => {
  return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }

    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleFormSubmit} />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts()}
          onDeleteContact={handleContactDelete}
        />
      </div>
    );
}

 export default App;