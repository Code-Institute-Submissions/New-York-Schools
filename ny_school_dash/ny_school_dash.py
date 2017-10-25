from flask import Flask, render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'donorsUSA'
COLLECTION_NAME = 'projects'

@app.route('/')
def index():
    return render_template("home.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/details')
def details():
    return render_template('details.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/donorsUS/projects')
def donor_projects():
    FIELDS = {
        '_id': False, 'school_city': True, 'school_state': True, 'school_zip': True, 'school_latitude': True,
        'school_longitude': True, 'school_metro': True, 'school_district': True, 'school_county': True,
        'primary_focus_subject': True, 'primary_focus_area': True, 'secondary_focus_subject': True,
        'secondary_focus_area': True, 'resource_type': True, 'poverty_level': True, 'total_donations': True,
        'num_donors': True, 'funding_status': True, 'date_posted': True
    }

    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS, limit=55000)
        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run(debug=True)
