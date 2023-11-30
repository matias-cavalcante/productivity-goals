from flask import Flask, request, jsonify
from databaseOperations import ActivitiesOperations, ChallengesOperations
from bson import json_util  # Import json_util from pymongo
from datetime import datetime, timedelta

from flask_cors import CORS


app = Flask(__name__)
CORS(app)

activities_ops = ActivitiesOperations()
challenges_ops = ChallengesOperations()

# ******************** ACTIVITIES ENDPOINTS ********************

"""
def verifyActivityInserted(activity):
    query = {"name": activity}
    if type(activities_ops.find_one(query)) == dict:
        return True

@app.route('/createactivity', methods=['POST'])
def create_activity():
    Receives and passes an activity to be inserted in the activities collection
    data = request.get_json() or {}
    activity = data.get('activity')
    activity_id = activities_ops.insert_activity(activity)
    confirmed = verifyActivityInserted(activity)
    if confirmed == True:
        return jsonify({"message": "Activity received", "activity": activity}), 200
    else:
        abort(400, description="Seems like that value was not successfully inserted")
"""


@app.route('/createactivity', methods=['POST'])
def create_activity():
    data = request.get_json() or {}
    activity = data.get('activity')

    # Insert the activity and get the result
    result = activities_ops.insert_activity(activity)

    # If insertion was successful, result will not be None
    if result:
        return jsonify({"message": "Activity received", "activity": activity}), 201
    else:
        # If result is None, insertion failed
        return jsonify({"error": "Activity insertion failed"}), 400


@app.route('/seeactivities', methods=['GET'])
def show_activities():
    # This function does not require an ID
    """Returns all activities of the activities collections in a JSON"""
    activities = activities_ops.get_all_activities()
    # Use json_util.dumps to serialize MongoDB documents to JSON
    activities_json = json_util.dumps(activities)
    # print(activities_json)
    return jsonify(activities_json), 200

# ******************** CHALLENGES ENDPOINTS  ********************


def new_challenge_prepare_data(enddate):
    """It is used by new_challenge to feed the data in the right shape to the create_challenge method"""
    return {'start_date': datetime.now(), 'end_date': datetime.now() + timedelta(days=int(enddate)), 'checks': {}}


@app.route('/createchallenge', methods=['POST'])
def new_challenge():
    """Receives a total of days and using that data a challenge is created and with create_challenge inserted in db"""
    data = request.get_json()
    total_days = data.get('days')
    challenge_data = new_challenge_prepare_data(total_days)
    new_challenge = challenges_ops.create_challenge(challenge_data)
    return jsonify({"message": "Challenge received", "total days": total_days}), 200


@app.route('/getchallenge/<challenge_id>', methods=['GET'])
def get_only_one_challenge(challenge_id):
    # This function requires an ID
    challenge = challenges_ops.get_one_challenge(challenge_id)
    if challenge:
        # Flask converts the dictionary to a JSON response
        return jsonify(challenge)
    else:
        return jsonify({"error": "Challenge not found"}), 404


"""
@app.route('/addcheck', methods=['POST'])
def check_in_challenge():
    data = request.get_json()
    activity_id = data.get('activity')
    # Initially challenge will be filled assuming is the current one. Later user will choose
    challenge_id = data.get('challenge')
    adding_check = challenges_ops.add_check_to_challenges(
        challenge_id, activity_id)
    return jsonify({"message": "Check added"}), 200
"""


@app.route('/addcheck', methods=['POST'])
def check_in_challenge():
    """Im trying this method"""
    data = request.get_json()
    activity_id = data.get('activity')
    # challenge_id is optional in the request
    challenge_id = data.get('challenge', None)  # None if not provided
    adding_check = challenges_ops.add_check_to_challenges(
        activity_id, challenge_id)
    return jsonify({"message": "Check added"}), 200


if __name__ == '__main__':
    app.run(debug=True)
