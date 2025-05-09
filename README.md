🔍 Repo Data Fetcher – Simple, Smart & Efficient
Fetch and explore data directly from any public GitHub repository.
This Chrome extension lets you interact with GitHub's API in a clean, user-friendly interface — no coding required.

🚀 Features
- Connects to any public GitHub repository
- Reads real-time data using GitHub's official API
- Displays all available attributes (e.g., name, description, stars, forks, dates, links)
- Select specific fields via an intuitive dropdown
- Converts date strings to human-readable format (e.g., 2025-05-09T14:00:00Z → 09.05.2025)
- Automatically detects and hyperlinks URLs
- Easily copy any displayed data to your clipboard
- Download the full dataset as a clean, structured JSON file

💡 Use Cases
- Developers exploring open-source projects
- Students analyzing repositories for learning or research
- Project managers monitoring specific metadata like contributors or updates
- Anyone who wants a quick way to peek into a GitHub repo without digging through pages

🛠️ How It Works
- Click the "Fetch Data" button.
- The extension uses the GitHub API to retrieve metadata.
- A dropdown appears, allowing you to select and inspect specific attributes.
- The value is cleaned, formatted, and shown clearly — links are clickable, dates are localized.
- You can copy the displayed value or download the full JSON with one click.

⚙️ Technical Details
- Built using vanilla JavaScript, HTML, and CSS
- Uses the official GitHub REST API
- Date formatting and clipboard functionality handled natively
- No external libraries or trackers
- Runs entirely client-side for maximum privacy

🔒 Privacy & Security
This extension does not collect, store or send any personal data.
All API requests are made directly from your browser to GitHub.
No authentication is required for public repositories.
