document.addEventListener('DOMContentLoaded', function () {
    // Populate the week options when the page loads
    populateWeekOptions();
  
    // Attach click event to fetch events button
    $('#fetch-events-button').on('click', function () {
      // Get the selected week from the dropdown
      const selectedWeek = $('#week-selector').val();
      // Fetch and display events for the selected week
      fetchAndDisplayEvents(selectedWeek);
    });
  });
  
  function populateWeekOptions() {
    // Your code to populate week options (if needed)
  }
  
  function fetchAndDisplayEvents(selectedWeek) {
    // Make an AJAX request to the RSS feed
    $.ajax({
      url: 'https://experiencebu.brocku.ca/events.rss',
      method: 'GET',
      dataType: 'xml',
      success: function (data) {
        // Parse the RSS feed and extract events for the selected week
        const events = parseRSS(data, selectedWeek);
        // Display events in the table
        displayEventsInTable(events);
      },
      error: function (error) {
        console.error('Error fetching RSS feed:', error);
      }
    });
  }
  
  function parseRSS(xml, selectedWeek) {
    // Your code to parse RSS feed and filter events for the selected week
    // Return an array of events
  }
  
  function displayEventsInTable(events) {
    const eventsBody = $('#events-body');
    eventsBody.empty(); // Clear previous events
  
    // Populate the table with events
    events.forEach(event => {
      const row = $('<tr>');
      row.html(`
        <td>${event.title}</td>
        <td>${event.description}</td>
        <td>${event.start}</td>
        <td>${event.end}</td>
        <td><a href="${event.link}" target="_blank">Link</a></td>
      `);
      eventsBody.append(row);
    });
  }
  