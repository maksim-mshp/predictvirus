from flask import Flask, render_template, request, url_for
from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
import json
from regr import *

app = Flask(__name__)

@app.route("/", methods=["POST", "GET"])
def main():
    if request.method == "POST":
        return "HEy"
    else:
        regr = MyRegr(7)
        
        return render_template("index.html",
                           archive = regr.get_archive_data(),
                           predict = regr.get_predict(),
                           apidata = regr.get_data_from_api()
                           )


@app.route("/json", methods=["POST"])
def json_example():
    if request.is_json:
        req = request.get_json()
        print(req)
        return "JSON received!", 200

if __name__ == '__main__':
    app.run()

