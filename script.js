
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

    // ... (rest of your JavaScript code) ...
