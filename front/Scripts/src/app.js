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
/*Get activities code*/
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
