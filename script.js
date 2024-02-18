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
      events: fetchEvents
    });
  });
  
  function fetchEvents(start, end, timezone, callback) {
    // Example events data (replace with your actual data)
    const events = [
      {
        title: 'Event 1',
        start: '2024-01-01',
        end: '2024-01-03',
        description: 'Description for Event 1',
        link: 'https://example.com/event1'
      },
      {
        title: 'Event 2',
        start: '2024-01-05',
        end: '2024-01-07',
        description: 'Description for Event 2',
        link: 'https://example.com/event2'
      },
      // Add more events as needed
    ];
  
    // Callback with the events
    callback(events);
  
    // Display events in the table
    displayEventsInTable(events);
  }
  
  function displayEventsInTable(events) {
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = ''; // Clear previous events
  
    // Populate the table with events
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.description}</td>
        <td>${event.start}</td>
        <td>${event.end}</td>
        <td><a href="${event.link}" target="_blank">Link</a></td>
      `;
      eventsBody.appendChild(row);
    });
  }
  