import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Contact.css'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateInput = (name, email, message) => {
  console.log (!(name === '') && (name.length > 2 && name.length < 31) && validateEmail(email) && !(message === ''))
  return (!(name === '') && validateEmail(email) && !(message === ''))
}

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [helptext, setHelptext] = useState('');

  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validMessage, setValidMessage] = useState(true);

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setValidName((name !== '') && (name.length > 2 && name.length < 31));
    setValidEmail(validateEmail(email));
    setValidMessage(!(message === ''));
    
    // Check if input is valid, using relevant vars and not validVar ones
    if (!validateInput(name, email, message)) {
      setHelptext('Δεν συμπληρώσατε σωστά όλα τα πεδία!');
      return;
    }

    // Check if captcha is completed
    if (!isCaptchaVerified) {
      setHelptext('Δεν ολοκληρώσατε το CAPTCHA!');
      return;
    }

    // Make an API call to the backend
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        // Handle successful form submission
        alert('Το μήνυμα καταχωρήθηκε επιτυχώς.');
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
        setIsCaptchaVerified(false);
        setHelptext('');
      } else {
        // Handle form submission error
        const errorData = await response.json();
        console.error('Failed to submit the form:', errorData);
      }
    }
    catch (error) {
      console.error('Error occurred during form submission:', error);
      alert('Είχαμε πρόβλημα με την καταχώρηση του μηνύματός σας.');
    }
  };
  

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    console.log(name.length, name)
    setValidName((prevName) => (value !== '') && (value.length > 2 && value.length < 31));
  };
  
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setValidEmail((prevEmail) => validateEmail(value));
  };
  
  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    setValidMessage((prevMessage) => message !== "");
  };

  return (
    <form className="contact-form">
      <div className="contact-form-group">
        <label htmlFor="name" className={validName ? "" : "invalid"}>Όνομα{validName ? "" : " *"} </label>
        <input
          type="text"
          id="name"
          placeholder="Όνομα"
          value={name}
          onChange={handleNameChange}
          required
          className={validName ? "" : "invalid"}
        />
      </div>
      <div className="contact-form-group">
        <label htmlFor="email" className={validEmail ? "" : "invalid"}>E-mail{validEmail ? "" : " *"} </label>
        <input
          type="email"
          id="ects"
          minLength="3"
          maxLength="30"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          required
          className={validEmail ? "" : "invalid"}
        />
      </div>
      <div className="contact-form-group">
        <label htmlFor="message" className={validMessage ? "" : "invalid"}>Μήνυμα{validMessage ? "" : " *"} </label>
        <textarea
          type="text"
          id="message"
          placeholder="Μήνυμα"
          value={message}
          onChange={handleMessageChange}
          required
          className={validMessage ? "" : "invalid"}
        />
      </div>
      <div className="contact-form-group">
        <ReCAPTCHA
          className='captcha'
          sitekey={process.env.REACT_APP_SITE_KEY}
          onChange={(response) => setIsCaptchaVerified(!!response)}
        />
      </div>
      <div className="contact-form-group help-text">
        {helptext}
      </div>
      <div className="modal-buttons">
        <button
          className="submit-button"
          type="submit"
          onClick={handleFormSubmit}
          disabled={!validName || !validEmail || !validMessage}>
          Υποβολή
        </button>
      </div>
    </form>
  );
};

export default Contact;