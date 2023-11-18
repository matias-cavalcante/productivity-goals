
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

