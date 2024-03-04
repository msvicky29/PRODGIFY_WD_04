const form = document.getElementById("contact-form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Check if a string is a valid email
function isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

// Check if a string contains only alphabets
function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function checkRequired(inputs) {
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            // Error
            errorInput(input, `${getName(input)} is Required`);
        } else {
            // Success
            successInput(input);
        }
    });
}

function getName(input) {
    return input.getAttribute("id");
}

function errorInput(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const p = formGroup.querySelector("p");
    p.innerHTML = message;
}

function successInput(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
    const p = formGroup.querySelector("p");
    p.innerHTML = "";
}

function checkEmail(input) {
    if (!isEmail(input.value.trim())) {
        errorInput(input, `This is not a valid email address`);
    }
}

function checkAlpha(input) {
    if (!isAlpha(input.value.trim())) {
        errorInput(input, `${getName(input)} must contain only alphabets`);
    }
}
function checkMessage(input) {
    if (input.value==='') {
        errorInput(input, `${getName(input)} is required`);

    }
}

// Initialize Email.js
emailjs.init("BgduNB8jwqqia8IEu"); // Replace with your Email.js user ID

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset the form error messages
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach((formGroup) => {
        formGroup.className = "form-group";
        const p = formGroup.querySelector("p");
        p.innerHTML = "";
    });

    // Check required fields
    const inputs = [name, email, message];
    checkRequired(inputs);

    // Check email format
    checkEmail(email);

    // Check if the name contains only alphabets
    checkAlpha(name);
    checkMessage(message);

    // If all checks passed, send the email
    const isValid = inputs.every((input) => input.value.trim() !== "" && input.parentElement.className === "form-group success");

    if (isValid) {
        emailjs
            .sendForm("service_d14jrha", "template_e9f5p2m", this) // Replace with your service ID and template ID
            .then(function (response) {
                alert("Email sent successfully!");
                form.reset();
            })
            .catch(function (error) {
                console.error("Email could not be sent:", error);
            });
    }
});
