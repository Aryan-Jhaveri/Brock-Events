document.addEventListener('DOMContentLoaded', function () {
    // Fetch events when the page loads
    fetchEvents();
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
      events: events
    });
  }
  