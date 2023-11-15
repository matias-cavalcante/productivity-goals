from pymongo import MongoClient
from datetime import datetime, timedelta
from bson import ObjectId
from flask import jsonify


class DataBaseConnector:
    """Handles DB connections and provides connection to instances of itself"""

    def __init__(self):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client['activity_tracker']

    def close_connection(self):
        self.client.close()


class ActivitiesOperations(DataBaseConnector):
    """Connects to the DB & to the 'activities' collection. It´s methods interact with that collection"""

    def __init__(self):
        super().__init__()
        self.activities_collection = self.db.activities

    def insert_activity(self, name):
        """Insert an activity into the database."""
        try:
            result = self.activities_collection.insert_one({'name': name})
            return result.inserted_id  # Return the ID of the inserted document
        except Exception as e:
            print(f"An error occurred: {e}")
            return None  # or you could re-raise the exception

    def get_all_activities(self):
        """Return all activities."""
        try:
            return list(self.activities_collection.find({}, {'name': 1}))
        except Exception as e:
            print(f"An error occurred: {e}")
            return []


class ChallengesOperations(DataBaseConnector):
    """Connects to the DB & to the 'activities' collection. It´s methods interact with that collection"""

    def __init__(self):
        super().__init__()
        self.challenges_collection = self.db.challenges

    def create_challenge(self, challenge):
        """Create a challenge."""
        # Challenges needs to be formated correctly
        try:
            result = self.challenges_collection.insert_one(challenge)
            return result.inserted_id
        except Exception as e:
            print(f"An error occurred: {e}")
            return None

    def get_one_challenge(self, challenge_id):
        challenge_object_id = ObjectId(challenge_id)
        challenge = self.challenges_collection.find_one(
            {"_id": challenge_object_id})
        if challenge:
            # Prepare the challenge data for JSON serialization
            challenge_data = {
                "_id": str(challenge["_id"]),
                "start_date": challenge["start_date"].isoformat(),
                "end_date": challenge["end_date"].isoformat(),
                "checks": challenge.get("checks", {})
            }
            return challenge_data
        else:
            return None  # Challenge not found

    def get_all_challenges(self):
        """Return all challenges."""
        try:
            return list(self.challenges_collection.find({}, {'name': 1}))
        except Exception as e:
            print(f"An error occurred: {e}")
            return []

    """def add_check_to_challenges(self, challenge_id_str, activity_id_str):
        #Add a check to the challenges collection.
        # Convert strings to ObjectId
        challenge_id = ObjectId(challenge_id_str)
        activity_id = ObjectId(activity_id_str)

        # Perform the update operation
        self.challenges_collection.update_one(
            {'_id': challenge_id},
            {'$push': {f"checks.{activity_id}": datetime.now()}}
        )"""

    def find_current_ongoing_challenge_id(self):
        """Find the current ongoing challenge based on the current date."""
        current_date = datetime.now()
        ongoing_challenge = self.challenges_collection.find_one({
            'start_date': {'$lte': current_date},
            'end_date': {'$gte': current_date}
        })
        if ongoing_challenge:
            return ongoing_challenge['_id']
        else:
            # Handle the case where no ongoing challenge is found
            return None

    def add_check_to_challenges(self, activity_id_str, challenge_id_str=None):
        """Add a check to the challenges collection."""
        activity_id = ObjectId(activity_id_str)

        if challenge_id_str:
            challenge_id = ObjectId(challenge_id_str)
        else:
            challenge_id = self.find_current_ongoing_challenge_id()

        if challenge_id:
            # Perform the update operation
            self.challenges_collection.update_one(
                {'_id': challenge_id},
                {'$push': {f"checks.{activity_id}": datetime.now()}}
            )


# TESTING.........................................................
if __name__ == "__main__":

    # TESTING ACTIVITIES

    # Instantiate the class
    # activities = ActivitiesOperations()

    # Call a method of the class
    # activities.insert_activity("Swimming")
    # print(activities.get_all_activities())

    # Close the database connection
    # activities.close_connection()

    # TESTING CHALLENGES ...........................................

    # Instantiate the class
    challenges = ChallengesOperations()

    # Create a test challenge

    # testChallenge = {'start_date': datetime.now(
    # ), 'end_date': datetime.now() + timedelta(8), 'checks': {}}

    # Call method to create a challenge

    # challenges.create_challenge(testChallenge)
    # print(challenges.get_all_challenges())
    # challenges.add_check_to_challenges(
    #    '654c07707f7265fa073b039a', '65470e894a1aed46ecd79168')

    print(challenges.get_one_challenge('654c07707f7265fa073b039a'))

    challenges.close_connection()
