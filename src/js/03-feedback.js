import throttle from 'lodash.throttle';



const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const formData = {
    email: '',
    message: ''
};

function saveFormData() {
    localStorage.setItem('feedbackFormData', JSON.stringify(formData));
}

function loadFormData() {
    const savedFormData = localStorage.getItem('feedbackFormData');
    if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        formData.email = parsedData.email;
        formData.message = parsedData.message;
        emailInput.value = parsedData.email;
        messageInput.value = parsedData.message;
    }
}

function handleInputChange(event) {
    const { name, value } = event.target;
    formData[name] = value;
    saveFormData();
}

function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted:', formData);
    localStorage.removeItem('feedbackFormData');
    emailInput.value = '';
    messageInput.value = '';
}

form.addEventListener('input', throttle(handleInputChange, 500));
form.addEventListener('submit', handleSubmit);

loadFormData();