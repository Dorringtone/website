"use strict";

// Match the weekly opening hours shown on Home and Contact.
const openingHour = 8;
const closingHour = 20;
const kenyaClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  weekday: "short",
  hour: "numeric",
  hourCycle: "h23"
});

function getStallStatus(day, hour) {
  if (day === "Sun") {
    return "Closed on Sundays. We reopen Monday at 8:00 a.m. Kenya time.";
  } else if (hour < openingHour) {
    return "Closed now. We open today at 8:00 a.m. Kenya time.";
  } else if (hour < closingHour) {
    return "Open now. We close at 8:00 p.m. Kenya time.";
  } else if (day === "Sat") {
    return "Closed for today. We reopen Monday at 8:00 a.m. Kenya time.";
  } else {
    return "Closed for today. We reopen tomorrow at 8:00 a.m. Kenya time.";
  }
}

function showStallStatus() {
  const status = document.querySelector("#stall-status");
  if (!status) return;

  const parts = kenyaClock.formatToParts(new Date());
  const day = parts.find(part => part.type === "weekday").value;
  const hour = Number(parts.find(part => part.type === "hour").value);
  status.textContent = getStallStatus(day, hour);
}

showStallStatus();
