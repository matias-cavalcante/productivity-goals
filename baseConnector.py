from pymongo import MongoClient
from datetime import datetime, timedelta
from bson import ObjectId


class SimpleTracker:
    """A simple activity tracker interfacing with MongoDB using PyMongo."""
    
    def check_challenge_status(self):
        """Check the status of ongoing or recently finished challenges."""
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        challenges = self.challenges_col.find({
            'end_date': {'$gte': today}
        })

        for challenge in challenges:
            if challenge['end_date'] == today:
                print(f"Challenge with ID {challenge['_id']} has finished today.")
            else:
                days_remaining = (challenge['end_date'] - today).days
                print(f"Challenge with ID {challenge['_id']} is ongoing. {days_remaining} day(s) remaining.")
                

    def __init__(self):
        """Initialize connection to MongoDB and select database & collections."""
        # Connect to the local MongoDB server
        self.client = MongoClient('localhost', 27017)

        # Create or select a database named 'activity_tracker'
        self.db = self.client['activity_tracker']

        # Create or select two collections
        self.activities_col = self.db['activities']
        self.challenges_col = self.db['challenges']
        self.check_challenge_status()


    def add_activity(self):
        """Prompt user to add a new activity to the activities collection."""
        name = input("Enter the name of the new activity: ")
        activity = {
            'name': name
        }
        self.activities_col.insert_one(activity)
        print(f"Added activity: {name}")

    def list_activities(self):
        """Print all activities."""
        print("\nActivities:")
        # Create an empty dictionary to store activity names and their associated numbers.
        pairs = {}
        incremental = 1  # Start numbering from 1.

        # Assign numbers to each activity name.
        for activity in self.activities_col.find():
            pairs[incremental] = activity['name']
            incremental += 1

        # Print out the numbers and activity names.
        for key, value in pairs.items():
            print(f"{key}. {value}")

    def start_challenge(self):
        """Prompt user to start a new challenge."""
        days = int(input("Enter the duration of the challenge (in days): "))
        end_date = datetime.now() + timedelta(days=days)
        challenge = {
            'start_date': datetime.now(),
            'end_date': end_date,
            'checks': {}
        }
        self.challenges_col.insert_one(challenge)
        print(
            f"Started a new challenge lasting until {end_date.strftime('%Y-%m-%d')}")

    from datetime import datetime, timedelta

    def add_check(self):
        """Prompt user to add a check for a specific activity in an ongoing challenge."""

        # Determine the current UTC date and time
        current_utc = datetime.utcnow()

        # Find an ongoing challenge based on the current UTC date and time
        ongoing_challenge = self.challenges_col.find_one({
            'start_date': {'$lte': current_utc},
            'end_date': {'$gte': current_utc}
        })

        # If no ongoing challenge is found, notify the user and return
        if not ongoing_challenge:
            print("No ongoing challenge found!")
            return

        challenge_id = ongoing_challenge['_id']

        # Display the list of activities for user selection
        self.list_activities()
        activity_idx = int(input("Select the activity number you want to add a check for: "))

        # Retrieve the activity ID based on the selected index
        activities = list(self.activities_col.find())
        if 0 < activity_idx <= len(activities):
            activity = activities[activity_idx - 1]
            activity_id = activity['_id']
        else:
            print("Invalid selection.")
            return

        # Add the check for the selected activity in the ongoing challenge
        self.challenges_col.update_one(
            {'_id': challenge_id},
            {'$push': {f"checks.{activity_id}": datetime.utcnow()}}
        )

        print(f"Added check for activity {activity['name']} in the ongoing challenge.")

        
    def list_challenges(self):
        """Print all challenges with activity names and check dates."""
        print("\nChallenges:")
        for challenge in self.challenges_col.find():
            print(
                f"ID: {challenge['_id']}, "
                f"Start Date: {challenge['start_date'].strftime('%Y-%m-%d')}, "
                f"End Date: {challenge['end_date'].strftime('%Y-%m-%d')}"
            )

            # If there are checks in the challenge, get the names and dates
            if 'checks' in challenge:
                for activity_id, checks in challenge['checks'].items():
                    # Find the activity name by its ID
                    activity = self.activities_col.find_one({'_id': ObjectId(activity_id)})
                    if activity:
                        activity_name = activity['name']
                    else:
                        activity_name = "Unknown Activity"

                    # Print the activity name and check dates
                    check_dates = ", ".join([check.strftime('%Y-%m-%d') for check in checks])
                    print(f"  Activity: {activity_name}, Checks: {check_dates}")
            else:
                print("  No checks for this challenge.")

            print()  # Print a newline for better readability


if __name__ == '__main__':
    tracker = SimpleTracker()

    while True:
        print("\nOptions:")
        print("1. Add Activity")
        print("2. List Activities")
        print("3. Start Challenge")
        print("4. Add Check")
        print("5. List Challenges")
        print("6. Exit")

        choice = input("Choose an option (1-6): ")

        if choice == "1":
            tracker.add_activity()
        elif choice == "2":
            tracker.list_activities()

        elif choice == "3":
            tracker.start_challenge()
        elif choice == "4":
            tracker.add_check()
        elif choice == "5":
            tracker.list_challenges()
        elif choice == "6":
            break
        else:
            print("Invalid choice. Please select again.")
