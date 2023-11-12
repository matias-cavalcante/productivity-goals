from flask import Flask, request, jsonify
from databaseOperations import ActivitiesOperations

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
    activities = activities_ops.get_all_activities()
    return jsonify({"activities": activities}), 200


if __name__ == '__main__':
    app.run(debug=True)
