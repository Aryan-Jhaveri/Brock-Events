document.addEventListener('DOMContentLoaded', function () {
    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        // Add FullCalendar options here
        // ...

        // Add the 'events' option to dynamically load events
        events: fetchEvents,
    });

    // Populate week options when the page loads
    populateWeekOptions();

    // Fetch events when the "Fetch Events" button is clicked
    document.getElementById('fetch-events-button').addEventListener('click', function () {
        // Refetch events when the button is clicked
        calendar.refetchEvents();
    });

    // Render FullCalendar
    calendar.render();
});

function fetchEvents(info, successCallback, failureCallback) {
    const selectedWeek = document.getElementById('week-selector').value;

    // Convert selectedWeek to a format suitable for your RSS feed query
    // You might need to parse the input or use a date library

    // Example RSS feed URL (replace with your actual RSS feed URL)
    const rssFeedUrl = 'https://cors-anywhere.herokuapp.com/https://experiencebu.brocku.ca/events.rss';

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
                    start: new Date(startTime).toISOString(), // Adjust this based on your date format
                    end: new Date(endTime).toISOString(), // Adjust this based on your date format
                    link: item.querySelector('link').textContent,
                };
            });

            // Filter events for the selected week
            const filteredEvents = events.filter(event => isEventInSelectedWeek(event, selectedWeek));

            // Call the successCallback with the filtered events
            successCallback(filteredEvents);
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
            // Call the failureCallback with an error message
            failureCallback('Error fetching events. Please try again later.');
        });
}

function isEventInSelectedWeek(event, selectedWeek) {
    // Implement logic to check if the event is in the selected week
    // Compare the event's start date with the start date of the selected week
    // You may need to parse dates and compare them accordingly
    return true; // Replace with your logic
}
