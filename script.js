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
        <td>${formatDateTime(event.start)}</td>
        <td>${formatDateTime(event.end)}</td>
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
