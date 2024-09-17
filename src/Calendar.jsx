import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import EventPopup from './EventPopup'; // Assuming you have this component for popups

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
    start: '2024-08-29T18:00:00+05:30',
    end: '2024-08-29T18:40:00+05:30',
    link: 'http://www.test.com',
    user_det: {
      candidate: {
        candidate_firstName: 'John',
        candidate_lastName: 'Doe',
        candidate_email: 'john@example.com',
      },
    },
  },
  {
    id: 3,
    summary: 'Final Round',
    desc: 'Final Round Interview',
    start: '2024-08-30T18:00:00+05:30', // Different date from the above events
    end: '2024-08-30T18:40:00+05:30',
    link: 'http://www.finalround.com',
    user_det: {
      candidate: {
        candidate_firstName: 'Vinodhini',
        candidate_lastName: 'Raj',
        candidate_email: 'vinodhini@dataterrain.com',
      },
    },
  },
];

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventGroup, setSelectedEventGroup] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // State for controlling the selected date (month/year)

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // Group events by the same start and end time
    const groupedEvents = Calendarfromtoenddate.reduce((acc, event) => {
      const key = `${new Date(event.start).getTime()}-${new Date(event.end).getTime()}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);
      return acc;
    }, {});

    // Format events, keeping only the event with the lowest id displayed by default
    const formattedEvents = Object.values(groupedEvents).map((eventGroup) => {
      const sortedEvents = eventGroup.sort((a, b) => a.id - b.id); // Sort by id
      return {
        id: sortedEvents[0].id,
        title: `${sortedEvents[0].summary} - ${sortedEvents[0].user_det.candidate.candidate_firstName} ${sortedEvents[0].user_det.candidate.candidate_lastName}`,
        start: new Date(sortedEvents[0].start),
        end: new Date(sortedEvents[0].end),
        description: sortedEvents[0].desc,
        link: sortedEvents[0].link,
        allEvents: sortedEvents, // Store all events with the same time
      };
    });

    setEvents(formattedEvents);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = '#0056b3';
    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        color: 'white',
        position: 'relative',
      },
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEventGroup(event.allEvents); // Pass all events with the same start/end time
  };

  const closePopup = () => {
    setSelectedEventGroup(null);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const updatedDate = new Date(currentDate.setMonth(newMonth));
    setCurrentDate(updatedDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const updatedDate = new Date(currentDate.setFullYear(newYear));
    setCurrentDate(updatedDate);
  };

  const renderEvent = ({ event }) => {
    return (
      <div className="event-box" onClick={() => handleSelectEvent(event)}>
        <div className="event-box-content">
          {event.title}
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            {event.link}
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <h2>Calendar of Events</h2>
      <div className="dropdown-container">
        <label htmlFor="month-select">Month:</label>
        <select id="month-select" value={currentDate.getMonth()} onChange={handleMonthChange}>
          {moment.months().map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="year-select">Year:</label>
        <select id="year-select" value={currentDate.getFullYear()} onChange={handleYearChange}>
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() + i - 2; // Display 2 years back and 2 years ahead
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['week', 'day']}
        defaultView="week"
        eventPropGetter={eventStyleGetter}
        components={{
          event: renderEvent, // Use renderEvent for custom rendering
        }}
        date={currentDate} // Date controlled by dropdowns
        onNavigate={setCurrentDate} // Allow navigation
        onSelectEvent={handleSelectEvent}
      />
      {selectedEventGroup && (
        <EventPopup
          events={selectedEventGroup} // Passing all events with same time to popup
          closePopup={closePopup}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
