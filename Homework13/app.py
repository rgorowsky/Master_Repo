from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/scrape_data"
mongo = PyMongo(app)


@app.route("/")
def index():
    # listings = mongo.db.listings.find_one()
    mars_scrape_objects = mongo.db.mars_scrape_objects.find_one()
    # strippedTitle = titleResult["strippedTitle"]
    return render_template("index.html", mars_scrape_objects = mars_scrape_objects)
    

@app.route("/scrape_mars")
def scrape():
    scrape_data = mongo.db.mars_scrape_objects
    mars_scrape_objects = scrape_mars.scrape()
    # strippedTitle = "strippedTitle"
    scrape_data.update(
        {},
        mars_scrape_objects,
        upsert=True
    )
    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)