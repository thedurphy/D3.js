import pandas as pd
import numpy as np
import json
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    data = json.load(open("static/data/buildings.json"))
    data = pd.DataFrame(data)
    #print(data)
    return render_template('index.html', data = data)

if __name__ == '__main__':
    app.run(port=3000, debug=True, threaded=True)
