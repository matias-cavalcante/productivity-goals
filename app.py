from flask import Flask, request, jsonify
from databaseOperations import ActivitiesOperations
from bson import json_util  # Import json_util from pymongo


app = Flask(__name__)

activities_ops = ActivitiesOperations()


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


if __name__ == '__main__':
    app.run(debug=True)
