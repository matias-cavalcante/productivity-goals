import { showMessage } from './helperfile.js';


/*Main panel to display TABLE and posibly other elements*/
const mainPanel = document.getElementById('right-wide-display') as HTMLDivElement;

/*Add activity block html elements*/ 
const addActivityInputContainer = document.getElementById('add-content-input-container') as HTMLDivElement;
const addActivityInputField = document.getElementById('activity-input') as HTMLInputElement;
const addActivityConfirm = document.getElementById('add-act') as HTMLButtonElement;
const activityAddOk = document.getElementById('activity-inserted') as HTMLDivElement;


/*Buttons in column*/
const addactivityColumn = document.getElementById('column-add-activity') as HTMLButtonElement;

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
      


