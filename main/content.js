console.log("ScamSlayer extension loaded and active.");

const SCAM_KEYWORDS = ["malware", "virus", "infected"];

// Function to check if a string contains any of the scam keywords
function containsScamKeywords(text) {
  return SCAM_KEYWORDS.some((keyword) => text.toLowerCase().includes(keyword));
}

// Function to convert an HTML string to a DOM node
function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

// Create Shadow DOM root and inject styles
const shadowRoot = document.createElement("div");
document.body.appendChild(shadowRoot);
const shadow = shadowRoot.attachShadow({ mode: "open" });

// Inject styles into Shadow DOM
const tailwindLink = document.createElement("link");
tailwindLink.href =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
tailwindLink.rel = "stylesheet";
shadow.appendChild(tailwindLink);

const daisyLink = document.createElement("link");
daisyLink.href = "https://cdn.jsdelivr.net/npm/daisyui/dist/full.css";
daisyLink.rel = "stylesheet";
shadow.appendChild(daisyLink);

// Listen for the creation of new elements in the DOM
const observer = new MutationObserver((mutations) => {
  console.log("Mutation observed");

  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      console.log("New nodes added");

      for (let node of mutation.addedNodes) {
        console.log(`Node type: ${node.nodeType}`);

        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log(`Checking element: ${node.nodeName}`);

          if (
            node instanceof HTMLElement &&
            containsScamKeywords(node.innerText) &&
            !node.classList.contains("scamslayer-alert")
          ) {
            console.log("Suspicious content detected");

            // Create the DaisyUI alert with a warning emoji
            const alertHTML = `
                            <div class="alert scamslayer-alert p-1">
                                <span class="mr-1">⚠️</span>
                                <span class="text-sm">Warning: This popup may be suspicious. Remember, you are in Chrome and it's likely from the website, not your computer.</span>
                                <div class="mt-1">
                                    <button class="btn btn-sm btn-primary">OK</button>
                                </div>
                            </div>
                        `;
            let alertNode = htmlToElement(alertHTML);
            alertNode.querySelector("button").onclick = function () {
              alertNode.remove();
            };
            shadow.appendChild(alertNode);

            console.log("Alert added to page");

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
