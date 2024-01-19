from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')

# def index():
    # return "<h1>Hello World!</h1>"

def index():
    return render_template("index.html")

# http://127.0.0.1:5000/user/Michael
@app.route('/user/<name>')

def user(name):
    return "<h1>Hello {}</h1>".format(name)
