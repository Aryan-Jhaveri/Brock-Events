function fetchEvents() {
    // Get the selected week
    const selectedWeek = document.getElementById('week-selector').value;
  
    // TODO: Fetch events from the RSS feed based on the selected week
    // You can use JavaScript Fetch API or other methods to fetch data from the RSS feed
  
    // Dummy data for testing
    const dummyEventData = [
      {
        title: 'Brock Westmarches Extralife Charity Stream!',
        description: 'Join us for 24 hours of Dungeons and Dragons as we raise money for McMasters Children\'s Hospital!',
        startTime: 'Friday, February 16, 2024 5:00 PM EST',
        endTime: 'Saturday, February 17, 2024 5:00 PM EST',
        link: 'https://experiencebu.brocku.ca/event/258201'
      },
      // Add more event objects as needed
    ];
  
    // Display events in the table
    displayEvents(dummyEventData);
  }
  
  function displayEvents(events) {
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = '';
  
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
  