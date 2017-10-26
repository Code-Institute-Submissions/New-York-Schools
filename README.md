# New York school donations

## Overview

### What is the app for?

This is a web app to showcase a dashboard for school donations across New York state. The dashboard is owned by the Henry Curtis, who is aspiring to be governer of New York State. The dashboard is to assist in the governer's narrative on how bad funding is for school within the state. 

### What does it do?

The web app will provide a story for the public. It will showcase data in an intereactive dashboard, which will assist in letting the public know about current funding in the New York state area. 

### How does it work?

Users will be will be directed to the homepage, which will inform them on the mission of the aspiring governer. They will then be directed to an interactive dashboard. This will provide various charts informing the user on the current school funding, and visualisation of data will help the user understand clearer the positiong of funding within in the state. The user will then be led to a final page where they can view plans on how electing Henry as governer can help change the current state of schools, and how to contact the campaign. 

## Features

### Existing features

- None Yet

### Features to implement

- User based
        - Interactive Graphs
        - Submit email

- Dislpay features
        - Home page
        - Dashboard page containting interactive graphs
        - View of govener plans
        - Interactive graphs:
        	- Number of donations in past 10 years in USD (Line Graph)
        	- Resource allocation (Bar Graph)
        	- Division by Poverty Area (Bar Graph)
        	- Average Donations Nationwide Compared (Line)
        	- Donation precentage For Primary subject (Pie)
        	- New York State map showing levels of funding per area (Map) - Optimisitc

- Mobile adaptability

## Tech Used

- [Flask] (http://flask.pocoo.org/)
    - We use **Flask** as our microframework for python. We use it for our page routing as well as contacting the data sets for our dashboard. 
- [Bootstrap] (http://getbootstrap.com/)
    - We use **Bootstrap** to give our webapp a responsive layout.
- [JQuery] (https://jquery.com/)
    - We use **JQuery** to produce a more interactive webapp. 
- [Dc.js] (https://dc-js.github.io/dc.js/)
    - We use **Dc.js** is used to make our graphs more interactive. It used along with D3.js
- [D3.js] (https://d3js.org/)
    - We use **D3.js** to create coordinates and axis for graphs. 
- [Crossfilter] (http://square.github.io/crossfilter/)
    - We use **Crossfilter** to manipulate data for the graphs. 
- [queue.js] ()
    - We use **Queue.js** to queue data coming from multiple api's
- [MongoDB] (https://www.mongodb.com/)
    - We use **MongoDB** for our NoSQL database. and local server testing. 

    ## Contributing

### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. After you've done that you'll need to make sure that you have tools from the requirements.txt file. To do this you'll need to: 
  1. cd to the directory with the requirments.txt file is located.
  2. Then you'll need to activate your local environment.
  3. Then you'll need to run: 
    '''
    pip install -r requirements.txt
    '''
3. Once **requirements.txt** is installed run the **ny_school_dash.py** file in your python editor.
4. The project will now run on [localhost](http://127.0.0.1:5000)
5. Make changes to the code and if you think it belongs in here then just submit a pull request