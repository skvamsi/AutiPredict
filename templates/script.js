function final(arg) {
  // alert(arg);
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const formValues = {};

    // Loop through the FormData object and collect values
    for (let [key, value] of formData.entries()) {
        formValues[key] = value;
    }

    // Ensure the Age field is correctly processed as a number
    if (!formValues["Age_Years"] || isNaN(formValues["Age_Years"]) || formValues["Age_Years"].trim() === "") {
        alert("Please enter a valid Age.");
        return; // Stop further execution
    }

    // Extract numeric input values, excluding non-numeric fields like 'Gender', 'Ethnicity', etc.
    const inputValues = Object.values(formValues).filter(value => !isNaN(value)).map(value => parseInt(value));
    
    // Track the formValues and inputValues in the console and alert
    console.log("Form values:", formValues);
    console.log("Input values:", inputValues);
    // alert(`Input values: ${inputValues}`);

    // Get selected model
    const selectedModel = formValues['Model'];
    // alert(`Selected model: ${selectedModel}`);

    // Initialize prediction result and percentage
    let prediction = "";
    let percentage = 0;

    // Call the appropriate model function based on selected model
    if (selectedModel === "GaussianNB") {
        // alert("Calling GaussianNB model...");
        ({ prediction, percentage } = naiveBayesPredict(inputValues));
    } else if (selectedModel === "Decision tree") {
        // alert("Calling Decision Tree model...");
        ({ prediction, percentage } = decisionTreePredict(inputValues));
    } else if (selectedModel === "Random Forest") {
        // alert("Calling Random Forest model...");
        ({ prediction, percentage } = randomForestPredict(inputValues));
    } else if (selectedModel === "ANN") {
        // alert("Calling ANN model...");
        ({ prediction, percentage } = annPredict(inputValues));
    }

    // Check the prediction and percentage results before displaying
    // alert(`Prediction: ${prediction}, Percentage: ${percentage}`);
      
      const resultSentence = `Based on the ${selectedModel} model, the prediction for ${arg} is a ${prediction} with a probability of ${percentage.toFixed(2)}%.`;

  document.getElementById('predictionResult').innerHTML = `<h6>${resultSentence}</h6>`;

}

// Decision Tree Logic
function decisionTreePredict(inputs) {
    // alert(`Decision Tree inputs: ${inputs}`);
    let score = inputs.reduce((acc, val) => acc + val, 0);
    // alert(`Decision Tree score: ${score}`);
    let prediction = score > 10 ? "High Risk" : "Low Risk";
    let percentage = (score / (inputs.length * 2)) * 100; // Example percentage calculation based on input range
    return { prediction, percentage };
}

// Gaussian Naive Bayes Logic
function naiveBayesPredict(inputs) {
    // alert(`Naive Bayes inputs: ${inputs}`);
    let probClass0 = 0.5, probClass1 = 0.5; // Simulate prior probabilities
    let score = inputs.reduce((acc, val) => acc + val, 0);
    let prediction = score > 10 ? "High Risk" : "Low Risk";
    let percentage = (score / (inputs.length * 2)) * 100;
    return { prediction, percentage };
}

// Random Forest Logic
function randomForestPredict(inputs) {
    // alert(`Random Forest inputs: ${inputs}`);
    // Simulate three decision trees
    let tree1 = decisionTreePredict(inputs);
    let tree2 = decisionTreePredict(inputs.map(x => x + 1));  // Simulating another tree
    let tree3 = decisionTreePredict(inputs.map(x => x - 1));  // Simulating another tree

    // Majority vote among trees
    let highRiskCount = [tree1.prediction, tree2.prediction, tree3.prediction].filter(result => result === "High Risk").length;
    let prediction = highRiskCount >= 2 ? "High Risk" : "Low Risk";

    // Averaging percentages from each tree
    let averagePercentage = (tree1.percentage + tree2.percentage + tree3.percentage) / 3;

    return { prediction, percentage: averagePercentage };
}

// ANN Logic (simple sigmoid function)
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function annPredict(inputs) {
    // alert(`ANN inputs: ${inputs}`);
    let weights = inputs.map(() => Math.random()); // Random weights
    let bias = Math.random();

    // Weighted sum
    let sum = inputs.reduce((acc, input, idx) => acc + (input * weights[idx]), 0) + bias;

    // Apply sigmoid
    let probability = sigmoid(sum);

    // Return result based on threshold
    let prediction = probability > 0.5 ? "High Risk" : "Low Risk";
    let percentage = probability * 100; // Use the sigmoid output for percentage

    return { prediction, percentage };
}
