import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessModal from './SuccessModal';

const StudentCheckIn = ({ onAdminClick }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  const titleOptions = ['Dr.', 'Mr.', 'Ms.', 'Mrs.'];
  const categoryOptions = ['Student', 'Faculty', 'Industry'];

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

    // Validate name
    if (!name.trim()) {
      setMessageType('error');
      setMessage('Please enter your name');
      return;
    }

    // Validate college name
    if (!collegeName.trim()) {
      setMessageType('error');
      setMessage('Please enter your college name');
      return;
    }

    // Validate title
    if (!title) {
      setMessageType('error');
      setMessage('Please select your title');
      return;
    }

    // Validate category
    if (!category) {
      setMessageType('error');
      setMessage('Please select your category');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/checkin`, {
        phone_number: phoneNumber,
        name: name,
        college_name: collegeName,
        title: title,
        category: category,
      });

      // Show success modal
      setShowSuccessModal(true);
      setRegistrationId(response.data.registration_id);
      setMessageType('success');
      setMessage(response.data.message);
      setPhoneNumber('');
      setName('');
      setCollegeName('');
      setTitle('');
      setCategory('');
    } catch (error) {
      if (error.response?.status === 409) {
        setMessageType('info');
        const regId = error.response.data.data?.registration_id;
        const msg = regId 
          ? `${error.response.data.message} (ID: ${regId})`
          : error.response.data.message;
        setMessage(msg);
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
      <SuccessModal isVisible={showSuccessModal} phoneNumber={phoneNumber} registrationId={registrationId} />

      <h2> Event Registration</h2>

      {message && !showSuccessModal && (
        <div className={`${messageType}-message`}>
          {message}
        </div>
      )}

      <div className="certificate-note">
        ⚠️ Please fill the details properly. This information will be used for certificate printing.
      </div>

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
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="college">College Name *</label>
          <input
            id="college"
            type="text"
            placeholder="Enter your college name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <select
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Select Title</option>
            {titleOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
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
