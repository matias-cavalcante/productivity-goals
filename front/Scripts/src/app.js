import { showMessage } from './helperfile.js';
/*Main panel to display TABLE and posibly other elements*/
const mainPanel = document.getElementById('right-wide-display');
/*Add activity block html elements*/
const addActivityInputContainer = document.getElementById('add-content-input-container');
const addActivityInputField = document.getElementById('activity-input');
const addActivityConfirm = document.getElementById('add-act');
const activityAddOk = document.getElementById('activity-inserted');
/*Buttons in column*/
const addactivityColumn = document.getElementById('column-add-activity');
/*---------------------------------------------------------------------------------------------*/
/*ACTIVITIES*/
/*Click add activity button on column and display panel to do so*/
addactivityColumn.addEventListener('click', () => {
    addActivityInputContainer.style.display = "flex";
    addActivityInputContainer.style.flexDirection = "column";
    addActivityInputContainer.style.justifyContent = "space-evenly";
    addActivityInputContainer.style.alignItems = "center";
    addActivityInputContainer.style.backgroundColor = "white";
});
/*Add activity from panel*/
/*
addActivityConfirm.addEventListener('click', () => {
    let activityToAdd = addActivityInputField.value;
    fetch('http://127.0.0.1:5000/createactivity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity: activityToAdd }) // Convert the activity object to a JSON string
    })
    .then(response => response.json())

    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});*/
/* Add activity from panel */
addActivityConfirm.addEventListener('click', () => {
    let activityToAdd = addActivityInputField.value;
    fetch('http://127.0.0.1:5000/createactivity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity: activityToAdd }) // Convert the activity object to a JSON string
    })
        .then(data => {
        console.log('Success:', data);
        showMessage("Activity added successfully!", true);
    })
        .catch((error) => {
        console.error('Error:', error);
        showMessage("Failed to add activity.", false);
    });
});
