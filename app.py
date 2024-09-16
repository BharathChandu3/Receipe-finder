from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Your API keys
SPOONACULAR_API_KEY = '6fabcaf2466649f0b18a1853641cd886'
YOUTUBE_API_KEY = 'AIzaSyDUbh1sCBM6sZCIY0IV7dnpvFP-xbLf1vo'

# Fetch dishes from Spoonacular
def fetch_dishes(dish, page):
    offset = (page - 1) * 10
    url = f'https://api.spoonacular.com/recipes/complexSearch?query={dish}&number=10&offset={offset}&apiKey={SPOONACULAR_API_KEY}'
    response = requests.get(url)
    return response.json()

# Fetch dish details from Spoonacular
def fetch_dish_ingredients(dish_id):
    url = f'https://api.spoonacular.com/recipes/{dish_id}/information?apiKey={SPOONACULAR_API_KEY}'
    response = requests.get(url)
    return response.json()

# Fetch YouTube video related to the dish
def fetch_youtube_video(dish_name):
    url = f'https://www.googleapis.com/youtube/v3/search?part=snippet&q={dish_name} recipe&key={YOUTUBE_API_KEY}'
    response = requests.get(url)
    data = response.json()
    if data['items']:
        return data['items'][0]['id']['videoId']
    return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    dish = request.args.get('dish')
    page = int(request.args.get('page', 1))
    data = fetch_dishes(dish, page)
    return jsonify(data)

@app.route('/dish/<int:dish_id>', methods=['GET'])
def dish_details(dish_id):
    details = fetch_dish_ingredients(dish_id)
    video_id = fetch_youtube_video(details['title'])
    details['videoId'] = video_id
    return jsonify(details)

if __name__ == '__main__':
    app.run(debug=True)
