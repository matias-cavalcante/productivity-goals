/*Addactivity is pretty equal to Startchallenge*/
/*Add activity block*/
document.addEventListener("DOMContentLoaded", function () {
    var myInput = document.getElementById("myInput");
    var button = document.getElementById('addactivity');
    button.addEventListener('click', function () {
        var activity = myInput.value; // Get the value from the input field
        fetch('http://127.0.0.1:5000/createactivity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ activity: activity }) // Convert the activity object to a JSON string
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log('Success:', data);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    });
});
/*Get activities block*/
document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById('seeactivity');
    button.addEventListener('click', function () {
        fetch('http://127.0.0.1:5000/seeactivities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log('Success:', data);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    });
});
/*Create a new challenge block*/
document.addEventListener("DOMContentLoaded", function () {
    var daysInput = document.getElementById('quantity');
    var button = document.getElementById('startchallenge');
    button.addEventListener('click', function () {
        var challengeDays = daysInput.value; // Get the value from the input field
        fetch('http://127.0.0.1:5000/createchallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ days: challengeDays }) // Convert the activity object to a JSON string
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log('Success:', data);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    });
});
/*Get a challenge (passing id)*/
document.addEventListener("DOMContentLoaded", function () {
    var challengeId = document.getElementById('id');
    var button = document.getElementById('seechallenges');
    button.addEventListener('click', function () {
        fetch('http://127.0.0.1:5000/getchallenge/' + challengeId.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log('Success:', data);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    });
});
/*Add a check to a challenge (pass challenge id optional, if not it uses date to find one)*/
document.addEventListener("DOMContentLoaded", function () {
    var challengeInput = document.getElementById("challengeid");
    var activityInput = document.getElementById("activityid");
    var button = document.getElementById('addcheck');
    button.addEventListener('click', function () {
        var challenge = challengeInput.value; // Get the value from the input field
        var activity = activityInput.value;
        fetch('http://127.0.0.1:5000/addcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ challenge: challenge, activity: activity }) // Convert the activity object to a JSON string
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log('Success:', data);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    });
});
