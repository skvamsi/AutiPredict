
function validateForm() {
    // Get the form values
    const name = document.getElementById("user").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check if name is filled
    if (name === "") {
        alert("Please enter your name.");
        return false;
    }

    // Check if email is filled and valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        alert("Please enter your email.");
        return false;
    } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Check if password is filled and at least 6 characters long
    if (password === "") {
        alert("Please enter your password.");
        return false;
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // If all validations pass
    return true;
}



function validateSignInForm() {
    // Get the form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check if email/username field is filled
    if (email === "") {
        alert("Please enter your email or username.");
        return false;
    }

    // Check if the email format is correct (if an email is entered)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.includes("@") && !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Check if password field is filled
    if (password === "") {
        alert("Please enter your password.");
        return false;
    }

    // If all validations pass, allow form submission
    return true;
}
