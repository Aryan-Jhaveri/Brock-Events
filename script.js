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

function displayEventsInTable(events) {
  const eventsBody = document.getElementById('events-body');
  if (eventsBody) {
    // Clear previous events
    eventsBody.innerHTML = '';

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

// Add a function to format date and time
function formatDateTime(dateTime) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(dateTime);
}

// ... (rest of your code)


// ... (previous code)

document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetch-button');
  const datePicker = flatpickr('#datepicker', {
    mode: 'range', // Allow selecting a date range
    dateFormat: 'Y-m-d',
    onClose: function (selectedDates) {
      const startDate = selectedDates[0];
      const endDate = selectedDates[1];
      if (startDate && endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const selectedWeek = `${formattedStartDate}-${formattedEndDate}`;
        console.log('Selected Week:', selectedWeek);
        fetchAndDisplayEvents(selectedWeek);
      } else {
        console.warn('No week selected. Please choose a week.');
      }
    }
  });

  if (fetchButton && datePicker) {
    fetchButton.addEventListener('click', function () {
      const selectedDates = datePicker.selectedDates;
      if (selectedDates.length === 2) {
        const formattedStartDate = formatDate(selectedDates[0]);
        const formattedEndDate = formatDate(selectedDates[1]);
        const selectedWeek = `${formattedStartDate}-${formattedEndDate}`;
        console.log('Selected Week:', selectedWeek);
        fetchAndDisplayEvents(selectedWeek);
      } else {
        console.warn('No week selected. Please choose a week.');
      }
    });
  } else {
    console.error('Fetch button or datepicker not found.');
  }
});
