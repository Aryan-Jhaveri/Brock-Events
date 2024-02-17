function fetchEvents() {
    const selectedWeek = document.getElementById('week-selector').value;
    
    // Convert selectedWeek to a format suitable for your RSS feed query
    // You might need to parse the input or use a date library
    
    // Example Google Feed API URL (replace with your RSS feed URL)
    const rssFeedUrl = `https://experiencebu.brocku.ca/events.rss`;
  
    fetch(rssFeedUrl)
      .then(response => response.json())
      .then(data => {
        // Extract relevant information from the feed's items
        const events = data.responseData.feed.entries.map(entry => {
          return {
            title: entry.title,
            description: entry.content,
            startTime: entry.publishedDate,
            endTime: entry.publishedDate, // You might need to extract end time from the feed
            link: entry.link,
          };
        });
  
        // Display events in the table
        displayEvents(events);
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
      });
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
  