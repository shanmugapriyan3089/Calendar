import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import EventPopup from './EventPopup';

const localizer = momentLocalizer(moment);


const Calendarfromtoenddate = [
  {
    id: 1,
    summary: '1st Round',
    desc: '1st Round Interview',
    start: '2024-08-29T18:00:00+05:30',
    end: '2024-08-29T18:40:00+05:30',
    link: 'http://www.hhh.com',
    user_det: {
      candidate: {
        candidate_firstName: 'Mohan',
        candidate_lastName: 'Raj',
        candidate_email: 'mohanrajk@dataterrain.com',
      },
    },
  },
  {
    id: 2,
    summary: 'Test Event',
    desc: 'Testing the calendar event',
    start: '2024-08-29T20:00:00+05:30',
    end: '2024-08-29T21:00:00+05:30',
    link: 'http://www.test.com',
    user_det: {
      candidate: {
        candidate_firstName: 'John',
        candidate_lastName: 'Doe',
        candidate_email: 'john@example.com',
      },
    },
  },
];

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = () => {
    const formattedEvents = Calendarfromtoenddate.map((event) => ({
      id: event.id,
      title: `${event.summary} - ${event.user_det.candidate.candidate_firstName} ${event.user_det.candidate.candidate_lastName}`,
      start: new Date(event.start),
      end: new Date(event.end),
      description: event.desc,
      link: event.link,
    }));
    setEvents(formattedEvents);
  };

 
  const eventStyleGetter = (event) => {
    const backgroundColor = '#0056b3'; 
    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        color: 'white',
      },
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <h2>Calendar of Events</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['week', 'day']}
        defaultView="week"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <EventPopup event={selectedEvent} closePopup={closePopup} />
      )}
    </div>
  );
};

export default CalendarComponent;


// const Calendars = () => {
//   return (
//     <div>
//       hiii
//     </div>
//   )
// }

// export default Calendars

