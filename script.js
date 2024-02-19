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
          
          const titleElement = item.querySelector("title");
          if (titleElement) {
            row.insertCell().textContent = titleElement.textContent;
          }
          
          const linkElement = item.querySelector("link");
          if (linkElement) {
            row.insertCell().textContent = linkElement.textContent;
          }

          // Debugging information for start and end
          const startElement = item.querySelector("start[xmlns='events']");
          const endElement = item.querySelector("end[xmlns='events']");
          
          console.log(startElement); // Log start element
          console.log(endElement); // Log end element
          
          const startTime = startElement && startElement.textContent ? startElement.textContent : 'Not available';
          const endTime = endElement && endElement.textContent ? endElement.textContent : 'Not available';
          
          console.log("Start Time:", startTime); // Log start time
          console.log("End Time:", endTime); // Log end time

          if (startTime !== 'Not available') {
            row.insertCell().textContent = formatDateTime(startTime);
          }
          
          const descriptionElement = item.querySelector("description");
          if (descriptionElement) {
            const descriptionCell = row.insertCell();
            const description = descriptionElement.textContent;
            const processedDescription = processDescription(description);
            descriptionCell.innerHTML = processedDescription;
          }

          if (endTime !== 'Not available') {
            row.insertCell().textContent = formatDateTime(endTime);
          }
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
