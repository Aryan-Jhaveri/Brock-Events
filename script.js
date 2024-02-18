document.addEventListener('DOMContentLoaded', function () {
    // Populate week options when the page loads
    populateWeekOptions();
  
    // Fetch events when the "Fetch Events" button is clicked
    document.getElementById('fetch-events-button').addEventListener('click', fetchEvents);
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
  
  function fetchEvents() {
    const selectedWeek = document.getElementById('week-selector').value;
  
    // Convert selectedWeek to a format suitable for your RSS feed query
    // You might need to parse the input or use a date library
  
    // Example RSS feed URL (replace with your actual RSS feed URL)
    const rssFeedUrl = 'https://cors-anywhere.herokuapp.com/https://experiencebu.brocku.ca/events.rss';
  
    // Display a loading indicator
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
  
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
        displayEvents(events);
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
        // Display an error message to the user
        eventsBody.innerHTML = '<tr><td colspan="5">Error fetching events. Please try again later.</td></tr>';
      });
  }
  
  function displayEvents(events) {
    const eventsBody = document.getElementById('events-body');
    eventsBody.innerHTML = ''; // Clear existing content
  
    // Group events by week
    const eventsByWeek = {};
    events.forEach(event => {
      const startOfWeek = getStartOfWeek(event.startTime);
      if (!eventsByWeek[startOfWeek]) {
        eventsByWeek[startOfWeek] = [];
      }
      eventsByWeek[startOfWeek].push(event);
    });
  
    // Display events in the table
    for (const startOfWeek in eventsByWeek) {
      const eventsForWeek = eventsByWeek[startOfWeek];
      const endOfWeek = getEndOfWeek(startOfWeek);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td colspan="5"><strong>${startOfWeek} - ${endOfWeek}</strong></td>
      `;
      eventsBody.appendChild(row);
  
      eventsForWeek.forEach(event => {
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
  }
  
  function getStartOfWeek(dateString) {
    const date = new Date(dateString);
    const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    return firstDayOfWeek.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
  }
  
  function getEndOfWeek(startOfWeek) {
    const startDate = new Date(startOfWeek);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return endDate.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
  }   
  }
  