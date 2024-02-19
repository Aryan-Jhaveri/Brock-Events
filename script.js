// script.js

document.addEventListener("DOMContentLoaded", function() {
  // Define UI elements
  const titlePanel = document.getElementById("titlePanel");
  const processBtn = document.getElementById("processBtn");
  const table = document.getElementById("table");

  // Event listener for the process button
  processBtn.addEventListener("click", function() {
    // Your server logic goes here
    // Replace the following lines with your logic
    fetch("https://experiencebu.brocku.ca/events.rss")
      .then(response => response.text())
      .then(data => {
        // Parse and process XML data
        // Replace the following lines with your XML parsing logic
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        // Process data and update the table
        // Replace the following lines with your data processing logic
        items.forEach(item => {
          const row = table.insertRow(-1);
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          cell1.textContent = item.querySelector("title").textContent;
          cell2.textContent = item.querySelector("link").textContent;
        });
      });
  });
});
