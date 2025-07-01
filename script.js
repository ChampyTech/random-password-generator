const passwordDisplay = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const strengthDisplay = document.getElementById("strength");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

function generatePassword() {
    const length = parseInt(lengthInput.value);
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    let charPool = "";
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === "") {
        passwordDisplay.textContent = "Please select at least one option";
        strengthDisplay.textContent = "Strength: -";
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    passwordDisplay.textContent = password;
    evaluateStrength(password);
}

function evaluateStrength(password) {
    const length = password.length;
    let strength = "Weak";
    if (length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
        strength = "Strong";
    } else if (length >= 8) {
        strength = "Medium";
    }
    strengthDisplay.textContent = `Strength: ${strength}`;
}

function copyToClipboard() {
    const text = passwordDisplay.textContent;
    if (!text || text === "Click Generate" || text === "Please select at least one option") return;
    navigator.clipboard.writeText(text).then(() => alert("Password copied to clipboard!"));
}

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
});