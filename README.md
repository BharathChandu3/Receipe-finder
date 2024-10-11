# Receipe-finder


## Description

The Recipe Finder is a web application that allows users to search for recipes based on a dish name or available ingredients. The application fetches recipes from the Spoonacular API and provides detailed information including ingredients, instructions, and related YouTube videos for each recipe.

## Features

- **Search by Dish Name**: Enter a dish name to find recipes and view detailed information including ingredients and instructions.
- **Search by Ingredients**: Enter a list of ingredients to find recipes that use those ingredients.
- **Recipe Details**: View detailed information about each recipe, including ingredients, cooking instructions, and a related YouTube video.
- **Pagination**: Navigate through multiple pages of search results.

## Technologies Used

- **HTML/CSS/JavaScript**: For frontend development.
- **Python (Flask)**: For backend development and API interactions.
- **Spoonacular API**: For fetching recipe data.
- **YouTube Data API**: For fetching related YouTube videos.

## Setup

### Prerequisites

- Python 3.x
- Pip (Python package installer)

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    - Create a `.env` file in the root directory and add your API keys:
        ```
        SPOONACULAR_API_KEY=<your-spoonacular-api-key>
        YOUTUBE_API_KEY=<your-youtube-api-key>
        ```

5. Run the application:
    ```bash
    python app.py
    ```

6. Open your web browser and navigate to `http://127.0.0.1:5000` to use the application.

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
