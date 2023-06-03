import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Contact.css'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // if (!isCaptchaVerified) {
    //   // reCAPTCHA verification failed
    //   return;
    // }

    // Verify the reCAPTCHA response before submitting the form
    const recaptchaResponseToken = await window.grecaptcha.execute();
    // Update the recaptchaResponse state with the token
    setRecaptchaResponse(recaptchaResponseToken);
    
    
    // Make an API call to the backend
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        // Handle successful form submission
        console.log('Form submitted successfully!');
        alert('Form submitted successfully!');
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
        setRecaptchaResponse('');
      } else {
        // Handle form submission error
        const errorData = await response.json();
        console.error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      alert('An error occurred while submitting the form.');
    }
  };
  

  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validMessage, setValidMessage] = useState(true);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setValidName(value !== "");
  };
  
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setValidEmail(value !== "");
  };
  
  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    setValidMessage(message !== "");
  };

  // useEffect (() => {
  //   validateInput('name', name);
  //   validateInput('email', email);
  //   validateInput('message', message);
  // }, [])

  return (
    <form className="contact-form" onSubmit={handleFormSubmit}>
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
            onChange={(response) => setRecaptchaResponse(response)}
          />
        </div>
        <div className="modal-buttons">
          <button className="submit-button" type="submit" onClick={handleFormSubmit}>Υποβολή</button>
        </div>
    </form>
  );
};

export default Contact;