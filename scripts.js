// Select the form and summary elements
const form = document.getElementById('userForm');
const summary = document.getElementById('summary');

// Helper function to display errors
function displayError(element, message) {
    document.getElementById(element).innerText = message;
}

// Helper function to clear error messages
function clearErrors() {
    displayError('nameError', '');
    displayError('emailError', '');
    displayError('contactError', '');
    displayError('termsError', '');
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Update summary
function updateSummary(formData) {
    summary.innerHTML = `
        <p><strong>Full Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Preferred Contact Method:</strong> ${formData.contactMethod}</p>
        <p><strong>Terms Accepted:</strong> ${formData.terms ? 'Yes' : 'No'}</p>
    `;
}

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    
    // Capture form data
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        contactMethod: form['contact-method'].value,
        terms: form.terms.checked
    };

    let isValid = true;

    // Validate name
    if (formData.name === '') {
        displayError('nameError', 'Name is required');
        isValid = false;
    }

    // Validate email
    if (formData.email === '') {
        displayError('emailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(formData.email)) {
        displayError('emailError', 'Invalid email format');
        isValid = false;
    }

    // Validate contact method
    if (formData.contactMethod === '') {
        displayError('contactError', 'Please select a contact method');
        isValid = false;
    }

    // Validate terms and conditions
    if (!formData.terms) {
        displayError('termsError', 'You must accept the terms and conditions');
        isValid = false;
    }

    // If valid, update the summary
    if (isValid) {
        updateSummary(formData);
        alert('Form submitted successfully!');
    }
});

// Real-time validation feedback
form.email.addEventListener('input', function () {
    if (!validateEmail(form.email.value.trim())) {
        displayError('emailError', 'Invalid email format');
    } else {
        displayError('emailError', '');
    }
});