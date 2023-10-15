console.log("popup loaded");
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the counter value from Chrome storage
  chrome.storage.local.get(["counter"], function (result) {
    if (chrome.runtime.lastError) {
      console.error("Error fetching counter:", chrome.runtime.lastError);
      return;
    }
    if (result && result.counter !== undefined) {
      let count = result.counter;
      console.log("Fetched counter value:", count); // Log the fetched value
      // Update the display in popup.html
      document.getElementById("counterDisplay").textContent = count;
    } else {
      console.log("Counter value not found in storage.");
    }
  });
});
