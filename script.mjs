
$(document).ready(function () {
    // Set initial values for the input fields
    const today = new Date();
    
    // Set start of week to today
    $("#startOfWeek").val(today.toISOString().split('T')[0]);

    // Set end of week to the next Sunday
    const sunday = new Date(today);
    sunday.setDate(today.getDate() + (0 - today.getDay() + 7) % 7);
    $("#endOfWeek").val(sunday.toISOString().split('T')[0]);

    // Initialize datepicker for start and end date selection
    $("#startOfWeek, #endOfWeek").datepicker({
        dateFormat: "yy-mm-dd",
        showOn: "focus",
        beforeShow: function (input, inst) {
            inst.dpDiv.css({
                top: $(input).offset().top + $(input).outerHeight(),
                left: $(input).offset().left
            });
        },
        onSelect: function () {
            // You can optionally hide the calendar after a date is selected
            $(this).datepicker("hide");
        }
    });

    // Add click event to Apply Filter button
    $("#applyFilter").on("click", applyFilter);

    // Clear date range filter
    $("#clearFilter").on("click", function () {
        // Reset the datepicker values
        $("#startOfWeek, #endOfWeek").datepicker("setDate", null);

        // Display all data
        displayData();
    });

    // Fetch and display data on page load
    displayData();


async function fetchData() {
    try {
        const url = "https://experiencebu.brocku.ca/events.rss";
        const response = await fetch(url);
        const xmlText = await response.text();

        // Parse XML content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // Select all 'item' elements from the XML
        const events = xmlDoc.querySelectorAll("item");

        // Process each 'item' element and extract relevant data
        const data = [];
        events.forEach((event) => {
            // Check if 'enclosure' element exists
            const enclosureElement = event.querySelector("enclosure");

            const eventData = {
                // Extract and store the text content of 'title' element
                Title: getValue(event, "title"),
                // Extract and store the text content of 'link' element
                Link: getValue(event, "link"),
                // Convert and store the 'start' and 'end' elements to EST
                Start: convertToEST(getValue(event, "start")),
                End: convertToEST(getValue(event, "end")),
                // Extract and store the text content of 'description' element
                Description: getValue(event, "description"),
                // Extract and store the 'url' attribute from 'enclosure' element (or null if 'enclosure' does not exist)
                Enclosure: enclosureElement ? `<img src="${enclosureElement.getAttribute("url")}" alt="Event Image">` : null,
            };
            data.push(eventData);
        });

        return data;
    } catch (error) {
        // Log any errors that occur during data fetching
        console.error("Error fetching data:", error);
        return [];
    }
}

// Helper function to get value from an XML element
function getValue(parentElement, tagName) {
    // Select the child element with the specified tagName
    const element = parentElement.querySelector(tagName);

    // Return the text content of the element, or null if the element does not exist
    return element ? element.textContent : null;
}

// Helper function to convert time to Eastern Standard Time (EST) and format it
function convertToEST(dateTimeString) {
    // Assuming dateTimeString is in ISO format
    const utcDateTime = new Date(dateTimeString);
    const estDateTime = new Date(utcDateTime.toLocaleString("en-US", { timeZone: "America/New_York" }));

    // Format the date in a more readable format
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDateTime = estDateTime.toLocaleString("en-US", options);

    return formattedDateTime;
}

// Custom function to parse date string from XML
function parseCustomDate(dateString) {
    // Extract date components from the XML date string
    const dateComponents = dateString.match(/(\d+ \w+ \d+)(?: at (\d+:\d+:\d+ [APMapm]+))?/);

    if (!dateComponents) {
        console.error("Invalid date string:", dateString);
        return null;
    }

    // Construct a string in a format compatible with Date.parse
    const formattedDateString = dateComponents[1] + (dateComponents[2] ? ` ${dateComponents[2]}` : '') + ' EDT';

    // Parse the formatted date string
    const parsedDate = new Date(formattedDateString);

    return parsedDate;
}


async function displayData(start, end) {
    // Call fetchData to retrieve data
    const data = await fetchData();

    // Convert start and end dates to EST
    const startEST = new Date(start + "T00:00:00-05:00");
    const endEST = new Date(end + "T23:59:59-05:00");

    // Log user-selected dates
    console.log("User-Selected Start Date (EST):", startEST);
    console.log("User-Selected End Date (EST):", endEST);

    // Filter data based on selected start and end dates
 const filteredData = data.filter(event => {
    // Parse event dates using the updated custom function
    const eventStartDate = parseCustomDate(event.Start);
    const eventEndDate = parseCustomDate(event.End);

    // Log event dates for debugging
    console.log("Event Start Date (Original):", event.Start);
    console.log("Event End Date (Original):", event.End);
    console.log("Event Start Date (Converted):", eventStartDate);
    console.log("Event End Date (Converted):", eventEndDate);

    return eventStartDate && eventEndDate && eventStartDate >= startEST && eventEndDate <= endEST;
});

    // Log filtered data for debugging
    console.log("Filtered Data:", filteredData);

    

    // Destroy the existing DataTable instance if it exists
    if ($.fn.DataTable.isDataTable("#eventsTable")) {
        $("#eventsTable").DataTable().destroy();
    }

    // Initialize DataTable with filtered data
    const table = $("#eventsTable").DataTable({
        data: filteredData,
        columns: [
            { data: "Title" },
            { data: "Start" },
            { data: "End" },
            { data: "Enclosure",
                render: function (data, type, row) {
                    return data ? `<a href="${row.Link}" target="_blank">${data}</a>` : "";
                }
            },
        ],
        columnDefs: [
            { type: 'date', targets: [1, 2] } // Assuming "Start" is at index 1, and "End" is at index 2
        ],
        // Other DataTable configurations
    });

    return table;
}


function applyFilter() {
    const startOfWeek = $("#startOfWeek").datepicker("getDate");
    const endOfWeek = $("#endOfWeek").datepicker("getDate");

    if (startOfWeek && endOfWeek) {
        const startISO = startOfWeek.toISOString();
        const endISO = endOfWeek.toISOString();

        console.log("Start ISO:", startISO);
        console.log("End ISO:", endISO);

        displayData(startISO, endISO);
    } else {
        console.warn("Please select both start and end dates.");
    }
}

});
