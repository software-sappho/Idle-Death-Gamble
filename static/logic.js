function getRandomNumber() {
    return Math.floor(Math.random() * (3 - 1 + 1)) + 1; // Generates 1, 2, or 3
}

function spinFirstTwoNumbers() {
    document.getElementById("slot1").innerText = "?";
    document.getElementById("slot2").innerText = "?";

     // Call to display the indicators at the start of the spin
     displayIndicators();

    let counter = 0;
    let interval = setInterval(() => {
        document.getElementById("slot1").innerText = getRandomNumber();
        document.getElementById("slot2").innerText = getRandomNumber();
        
        counter++;
        if (counter >= 10) { // Stops after 10 changes
            clearInterval(interval);
        }
    }, 100); // Changes numbers every 100ms
}


// Generate random indicator based on weighted probabilities
function getRandomIndicator() {
    const rand = Math.random();
    if (rand < 0.05) {
        return 'rainbow';
    } else if (rand < 0.20) {
        return 'green';
    } else if (rand < 0.60) {
        return 'red';
    } else {
        return 'gold';
    }
}

// Display the indicators during reach mode
function displayIndicators() {
    const reachContainer = document.getElementById("reach-mode");
    reachContainer.innerHTML = ''; // Clear previous indicators

    // Generate 5 random indicators to show
        const indicatorType = getRandomIndicator();
        const indicatorDiv = document.createElement("div");
        indicatorDiv.classList.add("indicator", indicatorType);
        reachContainer.appendChild(indicatorDiv);
    
}