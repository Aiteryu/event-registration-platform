<!-- js/app.js: JavaScript for Dynamic Functionality -->
document.addEventListener('DOMContentLoaded', () => {
    // Populate Event List on events.html
    const eventListContainer = document.getElementById('event-list');

    if (eventListContainer) {
        fetch('/api/events') // Assuming the backend serves this endpoint
            .then(response => response.json())
            .then(events => {
                events.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.innerHTML = `
                        <h2>${event.name}</h2>
                        <p>${event.description}</p>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <a href="register.html?event=${event.id}" class="btn">Register</a>
                    `;
                    eventListContainer.appendChild(eventElement);
                });
            })
            .catch(error => console.error('Error fetching events:', error));
    }

    // Populate Event Options on register.html
    const eventDropdown = document.getElementById('event');

    if (eventDropdown) {
        fetch('/api/events')
            .then(response => response.json())
            .then(events => {
                events.forEach(event => {
                    const option = document.createElement('option');
                    option.value = event.id;
                    option.textContent = event.name;
                    eventDropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching events:', error));
    }

    // Handle Registration Form Submission
    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData.entries());

            // Save registration data to localStorage (as a placeholder for backend submission)
            localStorage.setItem('registrationData', JSON.stringify(data));
            window.location.href = 'confirmation.html';
        });
    }

    // Populate Confirmation Details on confirmation.html
    const confirmationDetails = document.getElementById('confirmation-details');

    if (confirmationDetails) {
        const registrationData = JSON.parse(localStorage.getItem('registrationData'));

        if (registrationData) {
            confirmationDetails.innerHTML = `
                <h2>Thank you, ${registrationData.name}!</h2>
                <p>You have registered for: ${registrationData.event}</p>
                <p>We will contact you at: ${registrationData.email}</p>
            `;
        } else {
            confirmationDetails.innerHTML = '<p>No registration data found. Please register first.</p>';
        }
    }
});
