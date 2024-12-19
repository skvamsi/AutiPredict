function final(arg) {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const formValues = {};

    // Loop through the FormData object and collect values
    for (let [key, value] of formData.entries()) {
        formValues[key] = value;
    }

    // Validate Age
    const age = Number(formValues["Age_Years"]);
    if (!age || isNaN(age)) {
        alert("Please enter a valid Age.");
        return;
    }

    // Process numeric fields
    const numericFields = Object.keys(formValues).filter((key) =>
        !isNaN(formValues[key]) &&
        !["Age_Years", "Gender", "Ethnicity", "Who", "Model"].includes(key)
    );
    const numericValues = numericFields.map((key) => parseInt(formValues[key], 10) || 0);

    // Check if all numeric input values are zeros
    const allZeros = numericValues.every((value) => value === 0);
    if (allZeros) {
        const resultSentence = `Based on the input provided, all numeric values are zeros (excluding Age). The result is a prediction of 0% likelihood.`;
        document.getElementById('predictionResult').innerHTML = `<h6>${resultSentence}</h6>`;
        return;
    }

    // Prepare input values for the model
    const inputValues = numericFields.map((key) => parseInt(formValues[key], 10) || 0);

    console.log("Form values:", formValues);
    console.log("Input values:", inputValues);

    // Get selected model
    const selectedModel = formValues['Model'];
    if (!selectedModel) {
        alert("Please select a model.");
        return;
    }

    // Initialize prediction result and percentage
    let prediction = "";
    let percentage = 0;

    // Call the appropriate model function based on selected model
    if (selectedModel === "GaussianNB") {
        ({ prediction, percentage } = naiveBayesPredict(inputValues));
    } else if (selectedModel === "Decision tree") {
        ({ prediction, percentage } = decisionTreePredict(inputValues));
    } else if (selectedModel === "Random Forest") {
        ({ prediction, percentage } = randomForestPredict(inputValues));
    } else if (selectedModel === "ANN") {
        ({ prediction, percentage } = annPredict(inputValues));
    }

    // Display the result
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
