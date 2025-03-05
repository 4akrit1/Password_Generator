// Get elements for Password Generator Section 
const generateBtn = document.getElementById('generate-btn');
const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('include-uppercase');
const lowercaseCheckbox = document.getElementById('include-lowercase');
const numbersCheckbox = document.getElementById('include-numbers');
const specialCheckbox = document.getElementById('include-special');
const strengthTextGenerator = document.getElementById('strength-text-generator'); // Changed to match the new id

// Get elements for Password Strength Checker Section
const checkStrengthBtn = document.getElementById('check-strength-btn');
const passwordToCheckField = document.getElementById('password-to-check');
const strengthTextChecker = document.getElementById('strength-text-checker');

// Function to generate password
function generatePassword() {
    let length = parseInt(lengthInput.value);

    // Check if password length is less than 8
    if (length < 8) {
        alert("Password length must be at least 8 characters.");
        lengthInput.value = 8;  // Set the input to 8
        return;  // Exit function if the length is invalid
    }

    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSpecial = specialCheckbox.checked;

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characters = '';
    if (includeLowercase) characters += lowercaseChars;
    if (includeUppercase) characters += uppercaseChars;
    if (includeNumbers) characters += numberChars;
    if (includeSpecial) characters += specialChars;

    if (characters === '') {
        alert('Please select at least one character type.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    passwordField.value = password;

    // Update password strength
    updateStrength(password);
}

// Function to update password strength for Generator Section
function updateStrength(password) {
    let strength = '❓';
    const length = password.length;

    if (length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        strength = 'Strong 💪';
    } else if (length >= 8 && (/[A-Z]/.test(password) || /[a-z]/.test(password)) && (/[0-9]/.test(password) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password))) {
        strength = 'Medium 😐';
    } else if (length >= 8) {
        strength = 'Weak 😓';
    } else {
        strength = 'Very Weak 😱';
    }

    strengthTextGenerator.textContent = strength;
}

// Function to check password strength for Strength Checker Section
function checkPasswordStrength() {
    const password = passwordToCheckField.value;
    let strength = '❓';

    if (password.length < 8) {
        strength = 'Very Weak 😱';
    } else if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        strength = 'Strong 💪';
    } else if (password.length >= 8 && (/[A-Z]/.test(password) || /[a-z]/.test(password)) && (/[0-9]/.test(password) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password))) {
        strength = 'Medium 😐';
    } else if (password.length >= 8) {
        strength = 'Weak 😓';
    }

    strengthTextChecker.textContent = strength;
}

// Function to copy password
function copyPassword() {
    passwordField.select();
    document.execCommand('copy');
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
checkStrengthBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission and page reload
    checkPasswordStrength();
});

