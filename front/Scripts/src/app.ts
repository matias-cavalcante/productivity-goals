/*Addactivity is pretty equal to Startchallenge*/

/*Main panel to display TABLE and posibly other elements*/
const mainPanel = document.getElementById('main-content') as HTMLDivElement;

/*Add activity block html elements*/ 
const addActivityInputContainer = document.getElementById('add-content-input-container') as HTMLDivElement;
const addActivityConfirm = document.getElementById('add-act') as HTMLButtonElement
const addActivityInputField = document.getElementById('activity-input') as HTMLInputElement

/*Buttons in column*/

const addactivityColumn = document.getElementById('addActivity') as HTMLButtonElement;

/*Click add activity button on column and display panel to do so*/
document.addEventListener("DOMContentLoaded", () =>{
    addactivityColumn.addEventListener('click', () => {
        addActivityInputContainer.style.display = "flex"
        addActivityInputContainer.style.flexDirection = "column"
        addActivityInputContainer.style.justifyContent = "space-evenly";
        addActivityInputContainer.style.alignItems = "center";
        addActivityInputContainer.style.backgroundColor = "white";
    });
})

/*Add activity from panel*/
document.addEventListener("DOMContentLoaded", () => {
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

    })
})




document.addEventListener("DOMContentLoaded", () => {
    const myInput = document.getElementById("myInput") as HTMLInputElement;
    const button = document.getElementById('addactivity') as HTMLButtonElement;

    button.addEventListener('click', () => {
        const activity = myInput.value; // Get the value from the input field
        fetch('http://127.0.0.1:5000/createactivity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ activity: activity }) // Convert the activity object to a JSON string
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

/*Get activities block*/
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('seeactivity') as HTMLButtonElement;

    button.addEventListener('click', () => {
        fetch('http://127.0.0.1:5000/seeactivities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});


/*Create a new challenge block*/
document.addEventListener("DOMContentLoaded", () => {
    const daysInput = document.getElementById('quantity') as HTMLInputElement
    const button = document.getElementById('startchallenge') as HTMLButtonElement;

    button.addEventListener('click', () => {
        const challengeDays = daysInput.value; // Get the value from the input field
        fetch('http://127.0.0.1:5000/createchallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ days: challengeDays }) // Convert the activity object to a JSON string
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});


/*Get a challenge (passing id)*/
document.addEventListener("DOMContentLoaded", () => {
    const challengeId = document.getElementById('id') as HTMLInputElement
    const button = document.getElementById('seechallenges') as HTMLButtonElement;

    button.addEventListener('click', () => {
        fetch('http://127.0.0.1:5000/getchallenge/'+ challengeId.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

/*Add a check to a challenge (pass challenge id optional, if not it uses date to find one)*/

document.addEventListener("DOMContentLoaded", () => {
    const challengeInput = document.getElementById("challengeid") as HTMLInputElement;
    const activityInput = document.getElementById("activityid") as HTMLInputElement;

    const button = document.getElementById('addcheck') as HTMLButtonElement;

    button.addEventListener('click', () => {
        const challenge = challengeInput.value; // Get the value from the input field
        const activity = activityInput.value;
        fetch('http://127.0.0.1:5000/addcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({challenge: challenge, activity:activity }) // Convert the activity object to a JSON string
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});