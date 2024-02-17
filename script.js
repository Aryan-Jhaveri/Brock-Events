function fetchEvents() {
    const selectedWeek = document.getElementById('week-selector').value;
  
    // Convert selectedWeek to a format suitable for your RSS feed query
    // You might need to parse the input or use a date library
  
    // Example RSS feed URL (replace with your actual RSS feed URL)
    const rssFeedUrl = 'https://experiencebu.brocku.ca/events.rss';
  
    // Use an alternative method to fetch RSS data due to CORS restrictions
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const fetchUrl = proxyUrl + encodeURIComponent(rssFeedUrl);
  
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        // Parse XML data from the fetched JSON
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
  
        // Extract relevant information from the feed's items
        const events = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
          return {
            title: item.querySelector('title').textContent,
            description: item.querySelector('description').textContent,
            startTime: item.querySelector('start').textContent,
            endTime: item.querySelector('end').textContent,
            link: item.querySelector('link').textContent,
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
  