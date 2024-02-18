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
  
    // Populate week options when the page loads
    populateWeekOptions();
  
    // Add event listener for the fetch events button
    document.getElementById('fetch-events-button').addEventListener('click', function () {
      // Get the selected week from the calendar
      const selectedWeek = $('#calendar').fullCalendar('getView').title;
  
      // Fetch events for the selected week
      fetchEventsForWeek(selectedWeek);
    });
  });
  
  function populateWeekOptions() {
    const weekSelector = document.getElementById('week-selector');
  
    // Replace these with your actual start and end dates
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
  
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const formattedDate = getFormattedWeek(currentDate);
      const option = document.createElement('option');
      option.value = formattedDate;
      option.textContent = formattedDate;
      weekSelector.appendChild(option);
  
      // Move to the next week
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }
  
  function getFormattedWeek(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `Week ${getISOWeek(date)}, ${year}`;
  }
  
  function getISOWeek(date) {
    const jan4 = new Date(date.getFullYear(), 0, 4);
    const timeDiff = date - jan4;
    const dayDiff = (timeDiff / (24 * 60 * 60 * 1000) + 1);
    const weekNum = Math.ceil(dayDiff / 7);
    return weekNum;
  }
  
  function fetchEventsForWeek(selectedWeek) {
    // Implement logic to fetch events for the selected week
    // You might want to parse the selectedWeek and make a specific API request
    // Replace the example data with the actual data for the selected week
  
    const eventsForWeek = [
      {
        title: 'Event A',
        start: '2024-01-01',
        end: '2024-01-03'
      },
      {
        title: 'Event B',
        start: '2024-01-05',
        end: '2024-01-07'
      },
      // Add more events as needed
    ];
  
    // Display events in the table
    displayEventsInTable(eventsForWeek);
  }
  
  function displayEventsInTable(events) {
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = ''; // Clear previous events
  
    // Populate the table with events from the selected week
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.description || ''}</td>
        <td>${event.start}</td>
        <td>${event.end}</td>
        <td><a href="${event.link || '#'}" target="_blank">Link</a></td>
      `;
      eventsBody.appendChild(row);
    });
  }
  