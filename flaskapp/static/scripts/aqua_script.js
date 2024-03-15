// JavaScript (script.js)
document.addEventListener('DOMContentLoaded', () => {
    // Selecting elements
    const dateInput = document.getElementById('date');
    const durationInput = document.getElementById('duration');
    const addIrrigationBtn = document.getElementById('add-irrigation');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const totalWaterSpan = document.getElementById('total-water-value');
    const irrigationLogTable = document.getElementById('irrigation-log-table');
    const irrigationForm = document.getElementById('irrigationForm'); // Added

    // Initializing variables
    let irrigationLog = [];
    let editIdx = -1; // Initialize edit index to -1

    // Function to clear input fields
    function clearInputFields() {
        dateInput.value = '';
        durationInput.value = '';
		document.getElementById('principle').value = '';
    }

    // Function to save irrigation log to local storage
    function saveIrrigationLog() {
        localStorage.setItem('IrrigationLog', JSON.stringify(irrigationLog));
    }

    // Function to get/read irrigation log from local storage
    function getIrrigationLog() {
        const storedLog = localStorage.getItem('IrrigationLog');
        irrigationLog = storedLog ? JSON.parse(storedLog) : [];
    }

    // Function to display irrigation log
    function displayIrrigationLog() {
        let totalWater = 0; // Initialize total water usage to 0
        let counter = 1; // Initialize counter variable

        irrigationLogTable.innerHTML = '';

        irrigationLog.forEach((entry, index) => {
            const row = `
                <tr>
                    <td>${counter}</td>
                    <td>${entry.date}</td>
                    <td>${entry.duration}</td>
                    <td>${entry.principle}</td>
                    <td>
                        <button type="button" data-id="${index}" class="btn btn-warning btn-sm edit-btn">Edit</button>
                        <button type="button" data-id="${index}" class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </td>
                </tr>
            `;
            irrigationLogTable.innerHTML += row;

            // Calculate total water usage
            const waterUsage = calculateTotalWaterUsage(entry.duration, entry.principle);
            totalWater += waterUsage;

            // Increment counter
            counter++;
        });

        totalWaterSpan.textContent = totalWater.toFixed(2); // Update the total water value span

        saveIrrigationLog();
    }

    // Function to add irrigation entry
    function addIrrigation(event) { // Modified to accept event argument
        event.preventDefault(); // Prevent form submission

        const dateValue = dateInput.value.trim();
        const durationValue = Number(durationInput.value);
        const principleValue = document.getElementById('principle').value;

        if (!dateValue || isNaN(durationValue) || durationValue <= 0 || principleValue === '') {
            alert('Please enter valid inputs');
            return;
        }

        const irrigationEntry = {
            date: dateValue,
            duration: durationValue,
            principle: principleValue
        };

        if (editIdx !== -1) {
            irrigationLog[editIdx] = irrigationEntry;
            editIdx = -1; // Reset edit index
        } else {
            irrigationLog.push(irrigationEntry);
        }
        
        clearInputFields();
        displayIrrigationLog();
    }

    // Function to delete irrigation entry
    function deleteIrrigation(idx) {
        irrigationLog.splice(idx, 1);
        displayIrrigationLog();
    }

    // Function to edit irrigation entry
    function editIrrigation(idx) {
        const entry = irrigationLog[idx];
        dateInput.value = entry.date;
        durationInput.value = entry.duration;
        document.getElementById('principle').value = entry.principle;
        editIdx = idx; // Set edit index
    }

    // Function to cancel edit
    function cancelEdit() {
        editIdx = -1; // Reset edit index
        clearInputFields();
    }

    // Event listener for adding irrigation
    irrigationForm.addEventListener('submit', addIrrigation); // Changed to submit event

    // Event listener for canceling edit
    cancelEditBtn.addEventListener('click', cancelEdit);

    // Event delegation for deleting and editing irrigation entries
    irrigationLogTable.addEventListener('click', (event) => {
        const entryIdx = event.target.getAttribute('data-id');
        if (event.target.classList.contains('delete-btn')) {
            deleteIrrigation(entryIdx);
        } else if (event.target.classList.contains('edit-btn')) {
            editIrrigation(entryIdx);
        }
    });

    // Initialize irrigation log and display
    getIrrigationLog();
    displayIrrigationLog();
    
    // Define standard water flow rates for each irrigation principle (in liters per minute)
    const standardWaterFlowRates = {
        "Drip Irrigation": 0.01, // 0.01 liters per minute
        "Sprinkler Irrigation": 190, // 190 liters per minute
        "Soaker Hoses": 0.33, // 0.33 liters per minute
        "Furrow Irrigation": 5, // 5 liters per minute
        "Center Pivot Irrigation": 500 // 500 liters per minute
    };

    // Function to calculate total water usage based on the duration of irrigation and principle
    function calculateTotalWaterUsage(duration, principle) {
        const waterFlowRate = standardWaterFlowRates[principle]; // Get the standard water flow rate for the selected principle
        if (!waterFlowRate) {
            console.error("No standard water flow rate found for the selected principle:", principle);
            return null; // Return null if no standard water flow rate found
        }
        return duration * waterFlowRate; // Calculate total water usage
    }
});
