const SCAM_KEYWORDS = ["malware", "virus", "infected"];

// Function to check if a string contains any of the scam keywords
function containsScamKeywords(text) {
  return SCAM_KEYWORDS.some((keyword) => text.toLowerCase().includes(keyword));
}

// Listen for the creation of new elements in the DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // If it's a popup (like a modal) check its content
          if (
            node instanceof HTMLElement &&
            containsScamKeywords(node.innerText)
          ) {
            alert(
              "Warning: This popup may be suspicious. Remember, you are in Chrome and its likely from the website, not your computer."
            );
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
