# E-commerce Dashboard

This is a Streamlit-based dashboard for visualizing E-commerce data.

## Prerequisites

- Docker installed on your system.

## Data

The dashboard uses data from the E-commerce Public Dataset. Ensure the `E-commerce-dataset` folder is in the same directory as the dashboard script.

## Running the Dashboard

1. Clone the repository or download the files.

2. Build the Docker image:
   ```
   docker build -t ecommerce-dashboard .
   ```

3. Run the Docker container:
   ```
   docker run -p 8501:8501 ecommerce-dashboard
   ```

4. Open your web browser and go to `http://localhost:8501` to view the dashboard.

## Features

- Sales Trend
- Top Product Categories
- Order Status Distribution
- Customer Locations
- Revenue Trend
- Average Review Score Trend
- Delivery Time Trend
