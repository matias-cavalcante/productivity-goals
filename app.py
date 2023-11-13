from flask import Flask, request, jsonify
from databaseOperations import ActivitiesOperations, ChallengesOperations
from bson import json_util  # Import json_util from pymongo
from datetime import datetime, timedelta


app = Flask(__name__)

activities_ops = ActivitiesOperations()
challenges_ops = ChallengesOperations()

# ******************** ACTIVITIES ENDPOINTS ********************


@app.route('/createactivity', methods=['POST'])
def create_activity():
    """Receives and passes an activity to be inserted in the activities collection"""
    data = request.get_json() or {}
    activity = data.get('activity')
    # print(f"Received activity: {activity}")
    activity_id = activities_ops.insert_activity(activity)
    return jsonify({"message": "Activity received", "activity": activity}), 200


@app.route('/seeactivities', methods=['GET'])
def show_activities():
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


@app.route('/getonechallenge', methods=['GET'])
def get_only_one_challenge():
    id = request.get_json()
    challenge_id = id.get('id')
    challenge = challenges_ops.get_one_challenge(challenge_id)
    print(challenge)
    return challenge


if __name__ == '__main__':
    app.run(debug=True)
