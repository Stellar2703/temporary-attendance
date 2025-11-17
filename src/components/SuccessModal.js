import React from 'react';

function SuccessModal({ isVisible, phoneNumber, registrationId }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Registration Successful!</h2>
        <p className="success-message">You have been successfully registered for AICTE AI Summit 2025.</p>
        {registrationId && (
          <div className="registration-id-box">
            <p className="registration-label">Your Registration ID:</p>
            <p className="registration-id">{registrationId}</p>
          </div>
        )}
        {phoneNumber && (
          <p className="success-phone">Phone: {phoneNumber}</p>
        )}
      </div>
    </div>
  );
}

export default SuccessModal;
