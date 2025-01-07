## About The Project

Inspired by some apps I regularly use like Strava and The Weather Channel, I decided to use the same Mapbox library they use to develop an online grocery shopping application.
The project is backed by numerous technologies: JavaScript, HTML/CSS on the frontend, Python & Django on the backend, and database management through PostgreSQL.

Some important features include:
- Geolocation to find grocery stores near you
- Wishlist implementation so users can edit/delete hopeful purchases
- Detailed store-by-store browsing with descriptions and prices
- Geographical data and visualizations through Mapbox

## Installation
Before any commands are run, it is assumed you have Python and PostgreSQL.

Cloning the repo:
   ```sh
  git clone https://github.com/eshan327/GroceryZone.git
  cd GroceryZone
   ```
Opening a virtual environment with required dependencies:
   ```sh
python3 -m venv env
source env\Scripts\activate
pip install -r requirements.txt
   ```
Database configuration (substitute fields as needed):
   ```sh
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
   ```
Migrate and run the server:
   ```sh
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
   ```
Lastly, make your way to `http://localhost:8080/home?username=USER` with the appropriate value for `USER`.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/eshan327/GroceryZone/blob/main/LICENSE) file for details.
