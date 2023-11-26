/*Addactivity is pretty equal to Startchallenge*/

/*Add activity block*/ 


document.addEventListener("DOMContentLoaded", () =>{
    const addactivityButton = document.getElementById('addActivity') as HTMLButtonElement;
    const activityInput = document.getElementById('add-content-input') as HTMLDivElement;
    addactivityButton.addEventListener('click', () => {
        activityInput.style.display = "inline"
        activityInput.style.backgroundColor = "red";
    });
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