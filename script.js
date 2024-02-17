function fetchEvents() {
    const selectedWeek = document.getElementById('week-selector').value;
  
    // Convert selectedWeek to a format suitable for your RSS feed query
    // You might need to parse the input or use a date library
  
    // Example RSS feed URL (replace with your actual RSS feed URL)
    const rssFeedUrl = 'https://experiencebu.brocku.ca/events.rss';
  
    // Use an alternative method to fetch RSS data due to CORS restrictions
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const fetchUrl = proxyUrl + encodeURIComponent(rssFeedUrl);
  
    // Display a loading indicator
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
  
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        // Parse XML data from the fetched JSON
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
  
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
        displayEvents(events);
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
        // Display an error message to the user
        eventsBody.innerHTML = '<tr><td colspan="5">Error fetching events. Please try again later.</td></tr>';
      });
  }
  