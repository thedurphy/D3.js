import os
import pandas as pd
import numpy as np
import json
from flask import Flask, render_template, redirect
app = Flask(__name__)

@app.route('/')
def home():
    print(os.getcwd())
    template_list = [i.split('.')[0] for i in os.listdir(os.getcwd()+'\\templates\\projects')]
    return render_template('projects/skillz.html', template_list = template_list)

@app.route('/skillz')
def skillz():
    return redirect('/')

@app.route('/lesson22_buildings')
def lesson22_buildings():
    data = json.load(open("static/data/buildings.json"))
    data = pd.DataFrame(data)
    return render_template('projects/lesson22_buildings.html', data = data)

@app.route('/lesson23_coffee_project')
def lesson23_coffee_project():
    data = json.load(open("static/data/revenues.json"))
    data = pd.DataFrame(data)
    return render_template('projects/lesson23_coffee_project.html', data = data)

if __name__ == '__main__':
    app.run(port=3000, debug=True, threaded=True)
