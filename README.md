# Video and Product Summary Scraper

## Overview

The Video and Product Summary Scraper is a web application that allows users to scrape YouTube videos and product pages to obtain concise summaries. Users can search for products or videos, and the app will provide a summarized version of the relevant content, making it easier to gather key information quickly.

## Features

- **YouTube Video Scraping**: Search for YouTube videos based on keywords and get a summary of the video content.
- **Product Page Scraping**: Search for products from various e-commerce platforms and receive a summary of the product details, including key features, pricing, and reviews.
- **Sidebar Navigation**: An animated sidebar allows easy access to different sections of the app, enhancing user experience.
- **Recent Searches**: View your most recent searches displayed in a neatly formatted card.
- **Responsive Design**: The app is optimized for both desktop and mobile devices, ensuring a smooth experience across all screen sizes.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/product-video-summary-scraper.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd product-video-summary-scraper
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app in your browser:**

   ```
   http://localhost:3000
   ```

## Usage

1. **Search for Videos or Products:**

   - Use the search bar to enter keywords related to the product or video you are interested in.
   - The app will scrape the relevant YouTube videos or product pages and provide a summarized version of the content.

2. **Navigate with the Sidebar:**

   - Click the button to open the sidebar, which slides in from the right. Use the sidebar to navigate to different sections of the app.

3. **View Recent Searches:**

   - Recent searches are displayed in a card format, allowing you to quickly revisit previous queries.

4. **Viewing Summaries:**
   - Once the scraping process is complete, the summarized content will be displayed on the screen. You can read through the summaries to quickly grasp the key points.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Web Scraping**: Puppeteer, Cheerio
- **Routing**: React Router

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch for your feature or bug fix, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
