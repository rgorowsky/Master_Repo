from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/scrape_data"
mongo = PyMongo(app)


@app.route("/")
def index():
    # listings = mongo.db.listings.find_one()
    titleResult = mongo.db.scrape_data.find_one()
    strippedTitle = titleResult["strippedTitle"]
    return render_template("index.html")
    

@app.route("/scrape_mars")
def scrape():
    scrape_db = mongo.db.scrape_data
    scrape_data = scrape_mars.scrape()
    strippedTitle = "strippedTitle"
    scrape_db.update(
        {},
        scrape_data,
        upsert=True
    )
    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)