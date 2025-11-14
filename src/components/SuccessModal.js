import React from 'react';

function SuccessModal({ isVisible, phoneNumber }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Attendance Marked Successfully</h2>
        <p className="success-message">Your attendance has been recorded.</p>
        {phoneNumber && (
          <p className="success-phone">Phone: {phoneNumber}</p>
        )}
        <p className="success-redirect">Redirecting in 3 seconds...</p>
      </div>
    </div>
  );
}

export default SuccessModal;
