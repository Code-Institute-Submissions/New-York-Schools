from flask import Flask, render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
print MONGO_URI
DBS_NAME = os.getenv('MONGO_DB_NAME', 'donorsUSA')
COLLECTION_NAME = 'projects'

@app.route('/')
def index():
    return render_template("home.html")

@app.route('/details')
def details():
    return render_template('details.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/dashboard/data')
def dashboard_data():
    FIELDS = {
        '_id': False, 'school_city': True, 'school_state': 'NY', 'school_zip': True, 'school_latitude': True,
        'school_longitude': True, 'school_metro': True, 'school_district': True, 'school_county': True,
        'primary_focus_subject': True, 'primary_focus_area': True, 'secondary_focus_subject': True,
        'secondary_focus_area': True, 'resource_type': True, 'poverty_level': True, 'total_donations': True,
        'num_donors': True, 'funding_status': True, 'date_posted': True
    }

    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS, filter={"school_state": 'NY',
                                                              "date_posted": {"$gt": '2010-01-01 00:00:00'}},
                                   )
        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run(debug=True)