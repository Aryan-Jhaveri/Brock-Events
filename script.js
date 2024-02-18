// Declare weekSelector in a scope accessible to both functions
let weekSelector;

function extractWeeks(xml) {
  const weeks = [];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');

  items.forEach(item => {
    const startString = item.querySelector('start').textContent;
    const endString = item.querySelector('end').textContent;

    // Parse the start and end dates using the provided date format
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
        value: `${formattedStartDate}-${formattedEndDate}`,
        label: `Week ${weeks.length + 1}`,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }
  });

  console.log('All Weeks:', weeks); // Log all extracted weeks

  return weeks;
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
      console.log('Populating Week Selector - All Weeks:', weeks);

      // Populate the week selector with dynamically generated options
      weeks.forEach(week => {
        const option = document.createElement('option');
        option.value = `${week.startDate}-${week.endDate}`;
        option.text = `${week.label} (${week.startDate} to ${week.endDate})`;
        selector.appendChild(option);
      });

      // Log the selected value after options are added
      console.log('Selected Week After Population:', selector.value);
    },
    error: function (error) {
      console.error('Error fetching RSS feed:', error);
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetch-button');
  const weekSelector = document.getElementById('week-selector');

  if (fetchButton && weekSelector) {
    fetchButton.addEventListener('click', function () {
      fetchAndDisplayEvents(weekSelector);
    });
    // Populate the week selector with dynamically generated options
    populateWeekSelector(weekSelector);
  } else {
    console.error('Fetch button or week selector not found.');
  }
});

function fetchAndDisplayEvents(weekSelector) {
  const selectedWeek = weekSelector.value;
  console.log('Selected Week:', selectedWeek);

  // Check if a week is selected
  if (!selectedWeek || selectedWeek === "") {
    console.warn('No week selected. Please choose a week.');
    return;
  }

  const [startDate, endDate] = selectedWeek.split('-');
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);

  // Make an AJAX request to the RSS feed for the selected week
  $.ajax({
    url: `https://experiencebu.brocku.ca/events.rss?week=${selectedWeek}`,
    method: 'GET',
    dataType: 'xml',
    success: function (data) {
      // Parse the RSS feed and extract events
      const events = parseRSS(data);
      console.log('Parsed Events:', events);

      // Display events in the table
      displayEventsInTable(events);
    },
    error: function (error) {
      console.error('Error fetching RSS feed:', error);
    }
  });
}
