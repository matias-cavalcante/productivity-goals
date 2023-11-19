/*Addactivity is pretty equal to Startchallenge*/

/*Add activity block*/ 

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


