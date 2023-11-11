from flask import Flask
from requests import request

app = Flask(__name__)


@app.route('/activitiescreate')
# ‘/’ URL is bound with hello_world() function.
def create_activity():
    activity = request.json()
    print(request)
    return 'Hello World'
