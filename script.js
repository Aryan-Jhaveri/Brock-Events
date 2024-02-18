document.addEventListener('DOMContentLoaded', function () {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2024-01-01', // Set to your default date
      navLinks: true,
      editable: false,
      eventLimit: true,
      events: fetchEvents
    });
  });
  
  function fetchEvents(start, end, timezone, callback) {
    // Make an AJAX request to the RSS feed
    $.ajax({
      url: 'https://experiencebu.brocku.ca/events.rss',
      method: 'GET',
      dataType: 'xml',
      success: function (data) {
        // Parse the RSS feed and extract events
        const events = parseRSS(data);
        // Callback with the events
        callback(events);
      },
      error: function (error) {
        console.error('Error fetching RSS feed:', error);
      }
    });
  }  
  
  function parseRSS(xml) {
    const events = [];
  
    // Use jQuery to parse XML
    $(xml).find('item').each(function () {
      const title = $(this).find('title').text();
      const description = $(this).find('description').text();
      const link = $(this).find('link').text();
      const pubDate = $(this).find('pubDate').text();
  
      // Convert pubDate to a valid start date (modify as needed)
      const startDate = moment(pubDate).format('YYYY-MM-DD');
  
      // For simplicity, set the end date to be the same as the start date
      const endDate = startDate;
  
      events.push({
        title: title,
        description: description,
        start: startDate,
        end: endDate,
        link: link
      });
    });
  
    return events;
  }
  eturn events;
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
  