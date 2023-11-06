from datetime import datetime, timedelta


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
            print(
                f"Challenge with ID {challenge['_id']} is ongoing. {days_remaining} day(s) remaining.")


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
                activity = self.activities_col.find_one(
                    {'_id': ObjectId(activity_id)})
                if activity:
                    activity_name = activity['name']
                else:
                    activity_name = "Unknown Activity"

                # Print the activity name and check dates
                check_dates = ", ".join(
                    [check.strftime('%Y-%m-%d') for check in checks])
                print(f"  Activity: {activity_name}, Checks: {check_dates}")
        else:
            print("  No checks for this challenge.")

        print()  # Print a newline for better readability
