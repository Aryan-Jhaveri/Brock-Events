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
    const weeks = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');

    items.forEach(item => {
      const startString = item.querySelector('start').textContent;
      const endString = item.querySelector('end').textContent;

      // Parse the start and end dates
      const startDate = new Date(startString);
      const endDate = new Date(endString);

      // Format dates as YYYY-MM-DD for comparison
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      // Check if this week is already in the list
      const existingWeek = weeks.find(week =>
        week.startDate === formattedStartDate && week.endDate === formattedEndDate
      );

      if (!existingWeek) {
        // New week found, add to the list
        weeks.push({
          value: `week${weeks.length + 1}`,
          label: `Week ${weeks.length + 1}`,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    });

    console.log('All Weeks:', weeks); // Log all extracted weeks

    return weeks;
  }

  function formatDate(date) {
    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
