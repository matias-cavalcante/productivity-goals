document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('addactivity') as HTMLButtonElement;
    button.addEventListener('click', () => {
        document.body.style.backgroundColor = 'orange'; // Change background color
    });
});
