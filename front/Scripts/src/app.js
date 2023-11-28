/*Main panel to display TABLE and posibly other elements*/
var mainPanel = document.getElementById('right-wide-display');
/*Add activity block html elements*/
var addActivityInputContainer = document.getElementById('add-content-input-container');
var addActivityInputField = document.getElementById('activity-input');
var addActivityConfirm = document.getElementById('add-act');
/*Buttons in column*/
var addactivityColumn = document.getElementById('column-add-activity');
/*---------------------------------------------------------------------------------------------*/
/*ACTIVITIES*/
/*Click add activity button on column and display panel to do so*/
addactivityColumn.addEventListener('click', function () {
    addActivityInputContainer.style.display = "flex";
    addActivityInputContainer.style.flexDirection = "column";
    addActivityInputContainer.style.justifyContent = "space-evenly";
    addActivityInputContainer.style.alignItems = "center";
    addActivityInputContainer.style.backgroundColor = "white";
});
/*Add activity from panel*/
addActivityConfirm.addEventListener('click', function () {
    var activityToAdd = addActivityInputField.value;
    fetch('http://127.0.0.1:5000/createactivity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity: activityToAdd }) // Convert the activity object to a JSON string
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
});
