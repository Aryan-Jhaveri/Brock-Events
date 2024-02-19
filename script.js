// script.js

document.addEventListener("DOMContentLoaded", function() {
  const processBtn = document.getElementById("processBtn");
  const tableBody = document.querySelector("#table tbody");

  processBtn.addEventListener("click", function() {
    fetch("https://experiencebu.brocku.ca/events.rss")
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        tableBody.innerHTML = ''; // Clear existing table rows

        items.forEach(item => {
          const row = tableBody.insertRow();
          row.insertCell().textContent = item.querySelector("title").textContent;
          row.insertCell().textContent = item.querySelector("link").textContent;
          row.insertCell().textContent = item.querySelector("start").textContent; // Adjust according to the XML structure
          
          const descriptionCell = row.insertCell();
          const description = item.querySelector("description").textContent;
          const processedDescription = processDescription(description); // Replace with your description processing logic
          descriptionCell.textContent = processedDescription;

          row.insertCell().textContent = item.querySelector("end").textContent; // Adjust according to the XML structure
        });
      });
  });

  function processDescription(description) {
    // Add your processing logic here
    // For example, you may want to remove HTML tags
    const htmlElement = document.createElement("div");
    htmlElement.innerHTML = description;
    return htmlElement.textContent || htmlElement.innerText;
  }
});
