document.addEventListener('DOMContentLoaded', function () {
    // Initialize FullCalendar for the calendar selector
    $('#week-calendar').fullCalendar({
      defaultView: 'month',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek'
      },
      events: [], // You can leave this empty for now
      selectable: true,
      select: function (start, end) {
        // Update the selected week
        const selectedWeek = {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD')
        };
        // Log the selected week (you can customize this part)
        console.log('Selected Week:', selectedWeek);
      }
    });
  
    // Fetch events when the "Fetch Events" button is clicked
    document.getElementById('fetch-events-button').addEventListener('click', fetchEvents);
  });
  
  function fetchEvents() {
    // Example RSS feed URL (replace with your actual RSS feed URL)
    const rssFeedUrl = 'https://cors-anywhere.herokuapp.com/https://example.com/events.rss';
  
    // Display a loading indicator or perform any other necessary actions
  
    // Fetch events and update the FullCalendar events
    fetch(rssFeedUrl)
      .then(response => response.text())
      .then(data => {
        // Parse XML data from the fetched text
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
  
        // Extract relevant information from the feed's items
        const events = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
          const startTime = item.querySelector('start').textContent;
          const endTime = item.querySelector('end').textContent;
  
          return {
            title: item.querySelector('title').textContent,
            description: item.querySelector('description').textContent,
            startTime: new Date(startTime).toLocaleString('en-US', { timeZone: 'America/New_York' }),
            endTime: new Date(endTime).toLocaleString('en-US', { timeZone: 'America/New_York' }),
            link: item.querySelector('link').textContent,
          };
        });
  
        // Display events in the table
        displayEventsInTable(events);
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
        // Display an error message to the user
        document.getElementById('events-body').innerHTML = '<tr><td colspan="5">Error fetching events. Please try again later.</td></tr>';
      });
  }
  
  function displayEventsInTable(events) {
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = ''; // Clear previous events
  
    // Populate the table with events from the selected week
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.description}</td>
        <td>${event.startTime}</td>
        <td>${event.endTime}</td>
        <td><a href="${event.link}" target="_blank">Link</a></td>
      `;
      eventsBody.appendChild(row);
    });
  }
  