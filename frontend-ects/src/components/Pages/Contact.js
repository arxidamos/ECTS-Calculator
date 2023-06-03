import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

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

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={(response) => setRecaptchaResponse(response)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Contact;