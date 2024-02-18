document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the "Fetch Events" button
    const fetchButton = document.querySelector('#fetch-button');
    fetchButton.addEventListener('click', fetchAndDisplayEvents);
  
    function fetchAndDisplayEvents() {
      // Make an AJAX request to the RSS feed
      $.ajax({
        url: 'https://experiencebu.brocku.ca/events.rss',
        method: 'GET',
        dataType: 'xml',
        success: function (data) {
          // Parse the RSS feed and extract events
          const events = parseRSS(data);
          // Display events in the table
          displayEventsInTable(events);
        },
        error: function (error) {
          console.error('Error fetching RSS feed:', error);
          // Add user feedback for error, e.g., display an error message
          alert('Error fetching events. Please try again later.');
        }
      });
    }
  
    function parseRSS(xml) {
      const events = [];
  
      // Use DOMParser to parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
  
      // Iterate through each item in the XML
      const items = xmlDoc.querySelectorAll('item');
      items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        const link = item.querySelector('link').textContent;
        const start = item.querySelector('start').textContent;
        const end = item.querySelector('end').textContent;
  
        // You may need to further process start and end dates based on your needs
  
        events.push({
          title: title,
          description: description,
          link: link,
          start: start,
          end: end,
        });
      });
  
      return events;
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
  });
  