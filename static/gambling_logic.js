function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1; // Generates 1, 2, or 3
}

function spinFirstTwoNumbers() {
    document.getElementById("slot1").innerText = "?";
    document.getElementById("slot2").innerText = "?";

    displayIndicators(); // Show indicators at the start

    let counter = 0;
    let interval = setInterval(() => {
        let num1 = getRandomNumber();
        let num2;

        let chance = Math.random();
        if (chance <= 0.9) { 
            // 90% chance to be the same
            num2 = num1;
        } else {
            // 10% chance to be different
            do {
                num2 = getRandomNumber();
            } while (num2 === num1); // Ensure it's different
        }

        document.getElementById("slot1").innerText = num1;
        document.getElementById("slot2").innerText = num2;
        
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

    const indicatorType = getRandomIndicator();
    const indicatorDiv = document.createElement("div");
    indicatorDiv.classList.add("indicator", indicatorType);
    reachContainer.appendChild(indicatorDiv);
}
