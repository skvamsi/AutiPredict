function final() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const formValues = {};
    
    // Loop through the FormData object
    for (let [key, value] of formData.entries()) {
        formValues[key] = value;
    }

     if (!formValues["Age_Years"] || isNaN(formValues["Age_Years"]) || formValues["Age_Years"].trim() === "") {
        alert("Please enter a valid Age.");
        return; // Stop further execution
    }

    // Convert the formValues object to a string using JSON.stringify
    console.log("Form Values:\n" + JSON.stringify(formValues, null, 2));
}