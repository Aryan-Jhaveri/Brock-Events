document.addEventListener('DOMContentLoaded', function () {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2024-01-01', // Set to your default date
      navLinks: true,
      editable: false,
      eventLimit: true,
      events: fetchEvents(), // Call fetchEvents to get events
      dayClick: function (date, jsEvent, view) {
        // Handle day click (selected week)
        const selectedWeek = getWeekNumber(date);
        console.log('Selected Week:', selectedWeek);
      },
    });
  });
  
  function fetchEvents() {
    // Example events data (replace with your actual data)
    const events = [
      {
        title: 'Event 1',
        start: '2024-01-01',
        end: '2024-01-03'
      },
      {
        title: 'Event 2',
        start: '2024-01-05',
        end: '2024-01-07'
      },
      // Add more events as needed
    ];
  
    return events;
  }
  
  function getWeekNumber(date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const firstDayOfYear = new Date(startDate.getFullYear(), 0, 1);
    const days = Math.round((startDate - firstDayOfYear) / 86400000);
    const weekNumber = Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
    return weekNumber;
  }
  