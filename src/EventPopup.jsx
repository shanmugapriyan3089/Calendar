import React from 'react';

const EventPopup = ({ events, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        {events.map((e) => (
          <div key={e.id} className="popup-event-details">
            <h3>{e.summary}</h3>
            <p>{e.desc}</p>
            <p>
              <strong>Candidate: </strong>
              {e.user_det.candidate.candidate_firstName} {e.user_det.candidate.candidate_lastName}
            </p>
            <p>
              <a href={e.link} target="_blank" rel="noopener noreferrer">
                {e.link}
              </a>
            </p>
          </div>
        ))}
        <button className="close-btn" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EventPopup;
