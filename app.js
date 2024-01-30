let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document.querySelector(".calendar-current-date");

const prenexIcons = document.querySelectorAll(".calendar-navigation span");

// Array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const events = [
  { datetime: "2024-01-15T14:00:00", title: "Event 1" },
  { datetime: "2024-01-15T16:00:00", title: "Event 2" },
  { datetime: "2024-01-18T09:00:00", title: "Event 3" },
  { datetime: "2024-01-20T20:00:00", title: "Event 5" },
  { datetime: "2024-01-20T20:00:00", title: "Event 4" },
  { datetime: "2024-01-30T20:00:00", title: "Event 4" },
  { datetime: "2024-02-01T20:00:00", title: "Event 4" },
  { datetime: "2024-02-01T20:00:00", title: "Event 4" },
  
];

//Count events per day using countEventPerDay function
const eventCounts = countEventsPerDay(events);

// Function to generate the calendar
const manipulate = () => {
  // Get the first day of the month
  let dayone = new Date(year, month, 1).getDay();
  dayone = dayone === 0 ? 6 : dayone - 1;

  // Get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();

  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();

  dayend = dayend === 0 ? 6 : dayend - 1;

  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();

  // Variable to store the generated calendar HTML
  let lit = "";

  // Loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    //prevMonthDay give specific day
    let prevMonthDay = monthlastdate - i + 1;
    let prevMonth = month - 1;
    let prevYear = year;
    
    // Handle year transition
    if (prevMonth < 0) {
        prevMonth = 11; // December
        prevYear = year - 1;
    }


    const fullDate = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevMonthDay).padStart(2, '0')}`;
    const eventCount = eventCounts[fullDate] || 0;
    const eventDiv = eventCount > 0 ? `<div class="day-has-event">${eventCount}</div>` : '';

    lit += `<li class="inactive specific-day-li-el" data-day="${prevMonthDay}" data-month="${
      month - 1
    }" data-year="${year}">
    <span class="center-inside">${prevMonthDay}</span>
    ${eventDiv}
    </li>`;
  }

  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    // Check if the current date is today
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";


        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const eventCount = eventCounts[fullDate] || 0;
        const eventDiv = eventCount > 0 ? `<div class="day-has-event">${eventCount}</div>` : '';

    lit += `<li class="specific-day-li-el ${isToday}" data-day="${i}" data-month="${month}" data-year="${year}">
        <span class="center-inside">${i}</span>
        ${eventDiv}
        </li>`;
  }

  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {

    let nextMonthDay = i - dayend + 1;
    let nextMonth = month + 1;
    let nextYear = year;
    
    // Handle year transition
    if (nextMonth > 11) {
        nextMonth = 0; // January
        nextYear = year + 1;
    }

    const fullDate = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextMonthDay).padStart(2, '0')}`;
    const eventCount = eventCounts[fullDate] || 0;
    const eventDiv = eventCount > 0 ? `<div class="day-has-event">${eventCount}</div>` : '';

    lit += `<li class="inactive specific-day-li-el" data-day="${nextMonthDay}" data-month="${
      month + 1
    }" data-year="${year}">
    <span class="center-inside">${nextMonthDay}</span>
    ${eventDiv}
    </li>`;
  }

  // Update the text of the current date element
  // with the formatted current month and year
  currdate.innerText = `${months[month]} ${year}`;

  // update the HTML of the dates element
  // with the generated calendar
  day.innerHTML = lit;

  // attaches day to each day
  document.querySelectorAll(".specific-day-li-el").forEach((li) => {
    li.addEventListener("click", (e) => {
      let selectedDay = e.currentTarget.getAttribute("data-day");
      let selectedMonth = e.currentTarget.getAttribute("data-month");
      let selectedYear = e.currentTarget.getAttribute("data-year");
      handleDayClick(
        parseInt(selectedYear),
        parseInt(selectedMonth),
        parseInt(selectedDay)
      );
    });
  });
};

manipulate();

// Attach a click event listener to each icon of nonth navigation
prenexIcons.forEach((icon) => {
  // When an icon is clicked
  icon.addEventListener("click", () => {
    // Check if the icon is "calendar-prev"
    // or "calendar-next"
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
      // Set the date to the first day of the
      // month with the new year
      date = new Date(year, month, new Date().getDate());

      // Set the year to the new year
      year = date.getFullYear();

      // Set the month to the new month
      month = date.getMonth();
    } else {
      // Set the date to the current date
      date = new Date();
    }

    // Call the manipulate function to
    // update the calendar display
    manipulate();
  });
});

const handleDayClick = (year, month, day) => {
  alert(`You have selected: ${year}-${month + 1}-${day}`);
};

function countEventsPerDay(events) {
  const eventCounts = {};
  events.forEach((event) => {
    const date = event.datetime.split("T")[0]; // Extract just the date part
    eventCounts[date] = (eventCounts[date] || 0) + 1;
  });
  return eventCounts;
}
