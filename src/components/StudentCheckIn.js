import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessModal from './SuccessModal';

const StudentCheckIn = ({ onAdminClick }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-redirect after success
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        window.location.href = 'https://www.bitsathy.ac.in';
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!phoneNumber.trim()) {
      setMessageType('error');
      setMessage('Please enter your phone number');
      return;
    }

    // Check if phone number contains only digits
    if (!/^\d+$/.test(phoneNumber)) {
      setMessageType('error');
      setMessage('Phone number must contain only digits');
      return;
    }

    // Check if phone number is exactly 10 digits
    if (phoneNumber.length !== 10) {
      setMessageType('error');
      setMessage('Phone number must be exactly 10 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://10.30.10.3:5000/api/checkin', {
        phone_number: phoneNumber,
        name: name || 'Student',
      });

      // Show success modal instead of just a message
      setShowSuccessModal(true);
      setMessageType('success');
      setMessage(response.data.message);
      setPhoneNumber('');
      setName('');
    } catch (error) {
      if (error.response?.status === 409) {
        setMessageType('info');
        setMessage(error.response.data.message);
      } else {
        setMessageType('error');
        setMessage(error.response?.data?.error || 'Error marking attendance. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-container">
      <SuccessModal isVisible={showSuccessModal} phoneNumber={phoneNumber} />

      <h2>� Event Registration</h2>

      {message && !showSuccessModal && (
        <div className={`${messageType}-message`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number * (10 digits)</label>
          <input
            id="phone"
            type="tel"
            placeholder="xxxxxxxxxx"
            value={phoneNumber}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/\D/g, '');
              // Limit to 10 digits
              setPhoneNumber(value.slice(0, 10));
            }}
            maxLength="10"
            disabled={loading}
            pattern="\d{10}"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name (Optional)</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="admin-link">
        <span onClick={onAdminClick} className="admin-link">
          <a>Admin Login →</a>
        </span>
      </div>
    </div>
  );
};

export default StudentCheckIn;
