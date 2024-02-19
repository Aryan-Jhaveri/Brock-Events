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
    // Clear existing table
    var tableContainer = document.getElementById('tableContainer');
    if (tableContainer.firstChild) {
      tableContainer.removeChild(tableContainer.firstChild);
    }

    // Create table element
    var table = document.createElement('table');
    table.classList.add('event-table');

    // Create table header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    for (var key in data[0]) {
      var th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement('tbody');
    data.forEach(function (rowData) {
      var row = document.createElement('tr');
      for (var key in rowData) {
        var cell = document.createElement('td');
        cell.textContent = rowData[key];
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append table to container
    tableContainer.appendChild(table);
  }

  // Event listener for the button click
  document.getElementById('processBtn').addEventListener('click', function () {
    processEvents();
  });
});
