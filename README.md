# ScamSlayer Chrome Extension

![ScamSlayer Logo](https://github.com/Sebastian-Alexis/ScamSlayer/blob/main/ScamSlayerTumbnail.png?raw=true)

ScamSlayer is a Chrome extension designed to enhance user security by detecting and alerting users of suspicious popups that might be phishing attempts or other malicious activities.

## Table of Contents

- [Why ScamSlayer?](#why-scamslayer)
- [Features](#features)
- [Installation](#installation)
- [Challenges Faced](#challenges-faced)
- [Technologies Used](#technologies-used)
- [Contribution](#contribution)

## Why ScamSlayer?

With the increasing sophistication of phishing attempts and malicious websites, non-tenon-tech-savvy often find it challenging to differentiate between legitimate and suspicious content. ScamSlayer aims to provide an additional layer of security by proactively and contincontinuouslyages for potentially harmful popups and alerting users in real-time.

## Features

- **Real-time Detection**: ScamSlayer uses the MutationObserver API to monitor web pages for changes, allowing it to detect suspicious content as it's added.
- **Isolated Alerts**: Leveraging the Shadow DOM, ScamSlayer ensures that its alerts are displayed consistently across websites without interfering with the site's styles.
- **Persistent Counter**: Keep track of the number of suspicious popups detected with a counter that persists across browser sessions.
- **User-friendly Design**: Built with Tailwind CSS and DaisyUI, ScamSlayer provides a modern and intuitive user experience.

## Installation

1. **Clone the Repository**:

   ```
   git clone https://github.com/your-github-username/ScamSlayer.git
   ```

2. **Load the Extension into Chrome**:

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch at the top right.
   - Click "Load unpacked" and select the `main` folder within the ScamSlayer repository.
   - The ScamSlayer extension should now be active in Chrome!

3. **Usage**:
   - Navigate to any website, and ScamSlayer will automatically start monitoring for suspicious content.
   - Click on the ScamSlayer icon in the Chrome toolbar to view the number of detected popups.

## Challenges Faced

- **Dynamic Content Detection**: Monitoring web pages that load content dynamically was a significant challenge.
- **Styling Conflicts**: Ensuring that ScamSlayer's alerts did not conflict with website styles required innovative solutions like the Shadow DOM.
- **Data Persistence**: Implementing a counter that maintained its value across sessions involved careful handling of asynchronous operations.

## Technologies Used

- Chrome Extensions API
- MutationObserver
- Tailwind CSS
- DaisyUI
- Chrome Storage API

## Contribution

Feel free to fork this repository and contribute. Any feedback, bug reports, and feature requests are welcome!
