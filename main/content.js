console.log("ScamSlayer extension loaded and active.");

const SCAM_KEYWORDS = ["malware", "virus", "infected"];

// Function to check if a string contains any of the scam keywords
function containsScamKeywords(text) {
  return SCAM_KEYWORDS.some((keyword) => text.toLowerCase().includes(keyword));
}

// Listen for the creation of new elements in the DOM
const observer = new MutationObserver((mutations) => {
  console.log("Mutation observed"); // Logging

  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      console.log("New nodes added"); // Logging

      for (let node of mutation.addedNodes) {
        console.log(`Node type: ${node.nodeType}`); // Logging node type

        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log(`Checking element: ${node.nodeName}`); // Logging

          // If it's a popup (like a modal) check its content
          if (
            node instanceof HTMLElement &&
            containsScamKeywords(node.innerText)
          ) {
            console.log("Suspicious content detected"); // Logging

            // Increment counter in storage
            chrome.storage.local.get(["counter"], function (result) {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error fetching counter:",
                  chrome.runtime.lastError
                );
                return;
              }
              let count = result.counter || 0;
              console.log("Current counter value (before increment):", count);

              chrome.storage.local.set({ counter: count + 1 }, function () {
                if (chrome.runtime.lastError) {
                  console.error(
                    "Error setting counter:",
                    chrome.runtime.lastError
                  );
                } else {
                  console.log(
                    "Successfully incremented counter to:",
                    count + 1
                  );
                }
              });
            });
          }
        }
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
