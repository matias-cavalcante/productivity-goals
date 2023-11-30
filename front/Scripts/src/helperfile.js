// Function to show a message with a fade-in and fade-out effect
export function showMessage(message, isSuccess) {
    const messageContainer = document.getElementById('add-content-input-container');
    messageContainer.textContent = message;
    // Fade in
    messageContainer.classList.add('fade-in');
    messageContainer.classList.remove('fade-out');
    // Set a timeout to fade out
    setTimeout(() => {
        // Start fade out
        messageContainer.classList.add('fade-out');
        messageContainer.classList.remove('fade-in');
        // Set another timeout to hide the element after the transition
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 500); // This should match the transition duration in your CSS
    }, 3000);
}
