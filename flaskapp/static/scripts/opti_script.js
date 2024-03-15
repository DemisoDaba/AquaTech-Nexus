// Add an event listener to the form submission
document.getElementById('recommendationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    var formData = new FormData(this);
    var requestData = {};
    formData.forEach(function(value, key) {
        requestData[key] = value;
    });

    // Get selected options
    var cropType = requestData['crop_type'];
    var soilType = requestData['soil_type'];
    var weatherCondition = requestData['weather_condition'];
    var growthStage = requestData['growth_stage'];

    // Get globally recommended water application rate
    var globallyRecommendation = getGloballyRecommendedRate(cropType, soilType, weatherCondition, growthStage);

    // Get locally recommended water application rate
    var locallyRecommendation = getLocallyRecommendedRate(cropType, weatherCondition);

    // Display recommendations with selected options
    displayRecommendations({ globally_recommendation: globallyRecommendation, locally_recommendation: locallyRecommendation }, cropType, soilType, weatherCondition, growthStage);
});

// Function to get globally recommended water application rate
function getGloballyRecommendedRate(cropType, soilType, weatherCondition, growthStage) {
    // Example implementation (replace with your logic)
    var globallyRecommendation = RECOMMENDED_WATER_RATES[cropType]['globally'];
    // Adjust water recommendation based on growth stage (example adjustment)
    if (growthStage === 'Seedling') {
        globallyRecommendation *= 1.1; // Increase water recommendation by 10% for seedling stage
    } else if (growthStage === 'Vegetative') {
        globallyRecommendation *= 1.15; // Increase water recommendation by 15% for vegetative stage
    } else if (growthStage === 'Reproductive') {
        globallyRecommendation *= 1.2; // Increase water recommendation by 20% for reproductive stage
    } else if (growthStage === 'Maturation') {
        globallyRecommendation *= 1.05; // Increase water recommendation by 5% for maturation stage
    }
    return globallyRecommendation;
}

// Function to get locally recommended water application rate
function getLocallyRecommendedRate(cropType, weatherCondition) {
    // Example implementation (replace with your logic)
    return RECOMMENDED_WATER_RATES[cropType]['locally'][weatherCondition];
}

// Function to display recommendations
function displayRecommendations(data, cropType, soilType, weatherCondition, growthStage) {
    var recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous recommendations

    var globallyRecommendation = data.globally_recommendation;
    var locallyRecommendation = data.locally_recommendation;

    // Create a table element
    var table = document.createElement('table');
    table.border = '1';

    // Create table rows for globally and locally recommended rates
    var globallyRow = table.insertRow();
    var globallyCell1 = globallyRow.insertCell(0);
    var globallyCell2 = globallyRow.insertCell(1);
    globallyCell1.textContent = 'Globally Recommended';
    globallyCell2.textContent = globallyRecommendation + ' liters per hour';

    var locallyRow = table.insertRow();
    var locallyCell1 = locallyRow.insertCell(0);
    var locallyCell2 = locallyRow.insertCell(1);
    locallyCell1.textContent = 'Locally Recommended';
    locallyCell2.textContent = locallyRecommendation + ' liters per hour';

    // Create a row for selected options
    var selectedOptionsRow = table.insertRow();
    var selectedOptionsCell1 = selectedOptionsRow.insertCell(0);
    var selectedOptionsCell2 = selectedOptionsRow.insertCell(1);
    selectedOptionsCell1.textContent = 'Selected Options';
    selectedOptionsCell2.textContent = '(' + cropType + ', ' + soilType + ', ' + weatherCondition + ', ' + growthStage + ')';

    // Append the table to the recommendationsDiv
    recommendationsDiv.appendChild(table);
}

// Dictionary containing example recommended water application rates (in liters per hour) for each crop type
// These values are placeholders and not scientifically proven
var RECOMMENDED_WATER_RATES = {
    'Rice': { 'globally': 30, 'locally': { 'Sunny': 35, 'Cloudy': 25, 'Rainy': 20 } },
    'Wheat': { 'globally': 20, 'locally': { 'Sunny': 25, 'Cloudy': 18, 'Rainy': 15 } },
    'Corn': { 'globally': 25, 'locally': { 'Sunny': 30, 'Cloudy': 22, 'Rainy': 18 } },
    'Barley': { 'globally': 22, 'locally': { 'Sunny': 27, 'Cloudy': 20, 'Rainy': 16 } },
    'Soybean': { 'globally': 18, 'locally': { 'Sunny': 22, 'Cloudy': 15, 'Rainy': 12 } },
    'Cotton': { 'globally': 28, 'locally': { 'Sunny': 32, 'Cloudy': 25, 'Rainy': 20 } },
    'Potato': { 'globally': 26, 'locally': { 'Sunny': 30, 'Cloudy': 22, 'Rainy': 18 } },
    'Tomato': { 'globally': 24, 'locally': { 'Sunny': 28, 'Cloudy': 20, 'Rainy': 16 } }
};
