import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => setName(event.target.value);

  const handleNumberChange = event => 
    setNumber(event.target.value);
  

    const handleFormSubmit = event => {
      event.preventDefault();
      onSubmit({ name, number });
      setNumber('');
      setName('');
    };
    
    return (
      <>
        <form onSubmit={handleFormSubmit}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label className={css.label}>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              value={number}
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleNumberChange}
            />
          </label>

          <button type="submit" className={css.addContactBtn}>
            Add contact
          </button>
        </form>
      </>
    );
}
  
ContactForm.propTypes = {
onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;