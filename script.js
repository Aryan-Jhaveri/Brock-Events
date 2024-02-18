document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetch-button');
  const weekSelector = document.getElementById('week-selector');

  if (fetchButton && weekSelector) {
    fetchButton.addEventListener('click', fetchAndDisplayEvents);
    // Populate the week selector with dynamically generated options
    populateWeekSelector(weekSelector);
  } else {
    console.error('Fetch button or week selector not found.');
  }

  function fetchAndDisplayEvents() {
    const selectedWeek = weekSelector.value;
    // Make an AJAX request to the RSS feed for the selected week
    $.ajax({
      url: `https://experiencebu.brocku.ca/events.rss?week=${selectedWeek}`,
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
      }
    });
  }

  function populateWeekSelector(selector) {
    // Make an AJAX request to the RSS feed to get all weeks
    $.ajax({
      url: 'https://experiencebu.brocku.ca/events.rss',
      method: 'GET',
      dataType: 'xml',
      success: function (data) {
        // Parse the RSS feed and extract start and end dates of each week
        const weeks = extractWeeks(data);
        // Populate the week selector with dynamically generated options
        weeks.forEach(week => {
          const option = document.createElement('option');
          option.value = week.value;
          option.text = `${week.label} (${week.startDate} to ${week.endDate})`;
          selector.appendChild(option);
        });
      },
      error: function (error) {
        console.error('Error fetching RSS feed:', error);
      }
    });
  }

  function extractWeeks(xml) {
    // Function to extract weeks from the RSS feed XML
    // This logic might need to be adjusted based on the actual structure of your RSS feed
    const weeks = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');

    // Iterate through items and extract start and end dates
    items.forEach(item => {
      const start = item.querySelector('start').textContent;
      const end = item.querySelector('end').textContent;

      // Check if this week is already in the list
      const existingWeek = weeks.find(week => week.startDate === start && week.endDate === end);

      if (!existingWeek) {
        // New week found, add to the list
        weeks.push({ value: `week${weeks.length + 1}`, label: `Week ${weeks.length + 1}`, startDate: start, endDate: end });
      }
    });

    return weeks;
  }

      function fetchAndDisplayEvents() {
  // Retrieve the selected week from the dropdown
  const selectedWeek = weekSelector.value;
  // Make an AJAX request to the RSS feed for the selected week
  $.ajax({
    // Append the selected week to the query string
    url: `https://experiencebu.brocku.ca/events.rss?week=${selectedWeek}`,
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
    }
  });
}


      function populateWeekSelector(selector) {
        // Make an AJAX request to the RSS feed to get all weeks
        $.ajax({
          url: 'https://experiencebu.brocku.ca/events.rss',
          method: 'GET',
          dataType: 'xml',
          success: function (data) {
            // Parse the RSS feed and extract start and end dates of each week
            const weeks = extractWeeks(data);
            // Populate the week selector with dynamically generated options
            weeks.forEach(week => {
              const option = document.createElement('option');
              option.value = week.value;
              option.text = `${week.label} (${week.startDate} to ${week.endDate})`;
              selector.appendChild(option);
            });
          },
          error: function (error) {
            console.error('Error fetching RSS feed:', error);
          }
        });
      }

      function extractWeeks(xml) {
        const weeks = [];
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        let currentWeek = null;

        items.forEach(item => {
          const start = item.querySelector('start').textContent;
          const end = item.querySelector('end').textContent;

          const itemWeek = { startDate: start, endDate: end };

          if (!currentWeek || itemWeek.startDate !== currentWeek.startDate || itemWeek.endDate !== currentWeek.endDate) {
            // New week found
            currentWeek = itemWeek;
            weeks.push({ value: `week${weeks.length + 1}`, label: `Week ${weeks.length + 1}`, ...currentWeek });
          }
        });

        return weeks;
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
    if (eventsBody) {
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
    } else {
        console.error('Events body not found.');
    }
    }
    });