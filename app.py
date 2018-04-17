from flask import Flask, render_template, request, redirect, url_for
from util import api

app = Flask(__name__)

data = api.getdata()

@app.route("/")
def home():
    return render_template("map.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
