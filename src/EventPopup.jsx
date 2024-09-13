import React from 'react';
// import './EventPopup.css';

const EventPopup = ({ event, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <h3>{event.title}</h3>
        <p><strong>Start:</strong> {event.start.toLocaleString()}</p>
        <p><strong>End:</strong> {event.end.toLocaleString()}</p>
        <p><strong>Description:</strong> {event.desc || 'No description provided'}</p>
        {event.link && (
          <p>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Event Link
            </a>
          </p>
        )}
        <button className="close-btn" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EventPopup;
