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
    $.ajax({
      url: 'https://experiencebu.brocku.ca/events.rss',
      method: 'GET',
      dataType: 'xml',
      success: function (data) {
        console.log('Received data from RSS feed:', data);
        const events = parseRSS(data, selectedWeek);
        displayEventsInTable(events);
      },
      error: function (error) {
        console.error('Error fetching RSS feed:', error);
      }
    });
  }
  
  
  // Update your parseRSS function
function parseRSS(xml, selectedWeek) {
    const events = [];
  
    // Use jQuery to parse XML
    $(xml).find('item').each(function () {
      const title = $(this).find('title').text();
      const description = $(this).find('description').text();
      const link = $(this).find('link').text();
      const startDate = $(this).find('start').text();
      const endDate = $(this).find('end').text();
      const location = $(this).find('location').text();
  
      // Check if the event falls within the selected week
      if (isEventInSelectedWeek(startDate, endDate, selectedWeek)) {
        events.push({
          title: title,
          description: description,
          start: startDate,
          end: endDate,
          link: link,
          location: location
        });
      }
    });
  
    return events;
  }
  
  // Function to check if the event falls within the selected week
  function isEventInSelectedWeek(eventStartDate, eventEndDate, selectedWeek) {
    const eventStart = moment(eventStartDate);
    const eventEnd = moment(eventEndDate);
  
    // Check if the event overlaps with the selected week
    return (
      (eventStart.isSameOrAfter(selectedWeek.start) && eventStart.isBefore(selectedWeek.end)) ||
      (eventEnd.isSameOrAfter(selectedWeek.start) && eventEnd.isBefore(selectedWeek.end)) ||
      (eventStart.isBefore(selectedWeek.start) && eventEnd.isAfter(selectedWeek.end))
    );
  }
  
  // Function to display events in the table
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
        <td>${event.location}</td>
        <td><a href="${event.link}" target="_blank">Link</a></td>
      `;
      eventsBody.appendChild(row);
    });
  }
  
  
  // Function to check if an event falls within the selected week
  function isEventInSelectedWeek(eventDate, selectedWeek) {
    // Implement the logic to check if the event date is within the selected week
    // You may use a library like moment.js to handle date comparisons
  
    // For example, you can compare eventDate with the start and end dates of the selected week
    // and return true if it falls within the week, otherwise return false
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
  