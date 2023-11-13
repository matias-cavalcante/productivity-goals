from pymongo import MongoClient
from datetime import datetime, timedelta
from bson import ObjectId


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
        # Convert the string ID to a MongoDB ObjectId
        challenge_object_id = ObjectId(challenge_id)

        # Find the challenge by its ID
        challenge = self.challenges_collection.find_one(
            {"_id": challenge_object_id})

        if challenge:
            # Convert MongoDB's ObjectId and datetime objects to strings
            challenge_data = {
                "_id": str(challenge["_id"]),
                "start_date": challenge["start_date"].isoformat(),
                "end_date": challenge["end_date"].isoformat(),
                # Using .get() to avoid KeyError if 'checks' doesn't exist
                "checks": challenge.get("checks", {})
            }
            return challenge_data

    def get_all_challenges(self):
        """Return all challenges."""
        try:
            return list(self.challenges_collection.find({}, {'name': 1}))
        except Exception as e:
            print(f"An error occurred: {e}")
            return []

    def add_check_to_challenges(self, data):
        """data {id: challenge id, activity id}"""
        self.challenges_collection.update_one(
            {'_id': data.get('_id')},
            {'$push': {
                f"checks.{data.get('activity_id')}": datetime.now()}}
        )

    def add_check_to_challenges(self, challenge_id_str, activity_id_str):
        """Add a check to the challenges collection."""
        # Convert strings to ObjectId
        challenge_id = ObjectId(challenge_id_str)
        activity_id = ObjectId(activity_id_str)

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
