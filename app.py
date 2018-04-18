from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
# from util import api

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("map.html")

@app.route("/api")
def api():
    return render_template("api.html")

@app.route("/nobel")
def nobel():
    d = ''
    with open("data/laureate.json") as f:
        d = f.read()
    # print d
    return jsonify(d)

if __name__ == "__main__":
    app.debug = True
    app.run()
