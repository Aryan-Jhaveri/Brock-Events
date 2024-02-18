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
  
  document.addEventListener('DOMContentLoaded', function () {
    // Populate the week options when the page loads
    populateWeekOptions();
  
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
      events: function (start, end, timezone, callback) {
        // Get the selected week from the dropdown
        const selectedWeek = $('#week-selector').val();
        // Fetch events for the selected week
        fetchEvents(selectedWeek, callback);
      }
    });
  
    // Attach click event to fetch events button
    $('#fetch-events-button').on('click', function () {
      // Trigger FullCalendar to refetch events
      $('#calendar').fullCalendar('refetchEvents');
    });
  });
  
  function populateWeekOptions() {
    // Your code to populate week options (if needed)
  }
  
  function fetchEvents(selectedWeek, callback) {
    // Your code to fetch events for the selected week
    // You can make an AJAX request or use any method to get events
    // Update the 'events' array with the fetched events
    const events = [
      // Fetched events go here
    ];
  
    // Callback with the events
    callback(events);
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
  