const CustomToolbar = (toolbar) => {
  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const goToMonth = () => {
    toolbar.onView('month');
  };

  const goToYear = () => {
    toolbar.onView('year'); // Year view needs to be implemented if you want a custom "Year" view
  };

  const goToWeek = () => {
    toolbar.onView('week');
  };

  const goToDay = () => {
    toolbar.onView('day');
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>
          Today
        </button>
        <button type="button" onClick={() => toolbar.onNavigate('PREV')}>
          &lt;
        </button>
        <button type="button" onClick={() => toolbar.onNavigate('NEXT')}>
          &gt;
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={goToMonth}>
          Month
        </button>
        <button type="button" onClick={goToWeek}>
          Week
        </button>
        <button type="button" onClick={goToDay}>
          Day
        </button>
        <button type="button" onClick={goToYear}>
          Year
        </button>
      </span>
    </div>
  );
};

export default CustomToolbar