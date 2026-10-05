// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

//Track attendance
function getStoredCount(key) {
  const storedCount = parseInt(localStorage.getItem(key), 10);

  if (Number.isNaN(storedCount) || storedCount < 0) {
    return 0;
  }

  return storedCount;
}

let count = getStoredCount("attendeeCount");
const maxCount = 50;

attendeeCount.textContent = count;
progressBar.style.width = `${Math.min((count / maxCount) * 100, 100)}%`;
progressBar.setAttribute("aria-valuenow", Math.min(count, maxCount));
document.getElementById("waterCount").textContent =
  getStoredCount("waterCount");
document.getElementById("zeroCount").textContent = getStoredCount("zeroCount");
document.getElementById("powerCount").textContent =
  getStoredCount("powerCount");

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  if (name === "" || team === "") {
    return;
  }

  // Increment count
  count++;
  attendeeCount.textContent = count;

  // Update progress bar
  const percentage = Math.min((count / maxCount) * 100, 100);
  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", Math.min(count, maxCount));

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent, 10) + 1;

  // Save attendance counts
  localStorage.setItem("attendeeCount", count);
  localStorage.setItem(team + "Count", teamCounter.textContent);

  // Show welcome message
  greeting.textContent = `Welcome, ${name} from ${teamName}!`;
  greeting.style.display = "block";

  form.reset();
});
