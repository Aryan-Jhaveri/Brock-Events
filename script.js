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

          // Debugging information for start and end
          const startElement = item.querySelector("start[xmlns='events']");
          const endElement = item.querySelector("end[xmlns='events']");
          
          console.log(startElement); // Log start element
          console.log(endElement); // Log end element

          const startTime = startElement ? startElement.textContent : ''; // Check if start element exists
          const endTime = endElement ? endElement.textContent : ''; // Check if end element exists
          
          console.log("Start Time:", startTime); // Log start time
          console.log("End Time:", endTime); // Log end time

          row.insertCell().textContent = formatDateTime(startTime);
          
          const descriptionCell = row.insertCell();
          const description = item.querySelector("description").textContent;
          const processedDescription = processDescription(description);
          descriptionCell.innerHTML = processedDescription;

          row.insertCell().textContent = formatDateTime(endTime);
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });

  function formatDateTime(dateTimeString) {
    // Format the date and time using moment.js or any other library of your choice
    return moment(dateTimeString).format("MMMM D, YYYY h:mm A");
  }

  function processDescription(description) {
    // Add your processing logic here
    // For example, you may want to remove HTML tags
    const htmlElement = document.createElement("div");
    htmlElement.innerHTML = description;
    return htmlElement.textContent || htmlElement.innerText;
  }
});
