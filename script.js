// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Define event processing function
  function processEvents() {
    // Your AJAX or fetch request to retrieve XML data goes here
    // For simplicity, I'll use a placeholder URL
    var url = 'https://experiencebu.brocku.ca/events.rss';

    // Fetch XML data
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Parse XML data
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, 'text/xml');

        // Extract event details
        var events = xmlDoc.querySelectorAll('item');

        // Process events and update the table
        updateTable(processEventData(events));
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Define function to process event data
  function processEventData(events) {
    // Your processing logic goes here
    // For simplicity, I'll just log the titles of events
    var processedData = [];
    events.forEach(function (event) {
      var title = event.querySelector('title').textContent;
      processedData.push({ Title: title });
    });
    return processedData;
  }

  // Define function to update the table
  function updateTable(data) {
    // Your logic to update the table with processed data goes here
    // For simplicity, I'll log the data
    console.log(data);
  }

  // Event listener for the button click
  document.getElementById('processBtn').addEventListener('click', function () {
    processEvents();
  });
});
