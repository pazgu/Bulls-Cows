let new_target = random_number_to_guess();
let currentInputField = null;
let startTime = null;

//set the current active input field
function setCurrentInputField(inputField) {
  currentInputField = inputField;
}

// Function to handle digit button clicks from the board
function handleNumberButtonClick(digit) {
  if (currentInputField) {
    currentInputField.value = digit;
  }
}

function random_number_to_guess() {
  let guessing_array = [];
  let counter = 0;
  while (counter < 4) {
    num = Math.floor(Math.random() * 10);
    if (!guessing_array.includes(num)) {
      guessing_array.push(num);
      counter++;
    }
  }
  return guessing_array;
}

function user_guessings_go() {
  if (!startTime) { //so it will update the starting time just once in a game 
    startTime = new Date();
  }
  document.getElementById("duplicates").innerHTML = "";
  let guessing_array_user = [];
  let bulls = 0;
  let cows = 0;

  //for inserting values to the guessings
  for (let i = 0; i < 4; i++) {
    guessing_array_user[i] = document.getElementById(
      `${"guess" + (i + 1)}`
    ).value;
  }
  let duplicates = false;
  //for finding duplicates
  for (let i = 0; i < guessing_array_user.length; i++) {
    for (let j = i + 1; j < guessing_array_user.length; j++) {
      if (guessing_array_user[i] == guessing_array_user[j]) {
        duplicates = true;
        break;
      }
    }
    if (duplicates) {
      break;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (guessing_array_user[i] == new_target[i]) {
      bulls++;
    } else {
      for (let j = 0; j < 4; j++) {
        if (i !== j && guessing_array_user[i] == new_target[j]) {
          cows++;
          break;
        }
      }
    }
  }
  if (!duplicates) {
    displayGuessing(guessing_array_user, bulls, cows);
  } else {
    let guessingsHistoryDiv = document.getElementById("duplicates");
    let currentGuessingDiv = document.createElement("div");
    currentGuessingDiv.textContent = "duplicates";
    guessingsHistoryDiv.appendChild(currentGuessingDiv);
  }

  if (bulls == 4) {
    let endTime = new Date();
    alert("Congratulations! You got it right.");
    if (startTime && endTime) {
        let totalTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds
        alert("Total game time: " + totalTime + " seconds");
    } else {
        alert("Game time not available.");
    }
    start_new_game();
  }
}

//display history of guessings
function displayGuessing(guessing, bulls, cows) {
  let guessingsHistoryDiv = document.getElementById("guessings_history");
  let currentGuessingDiv = document.createElement("div");
  for (let i = 0; i < guessing.length; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = guessing[i];
    input.disabled = true; // Disable input to prevent user modification
    input.classList.add("new-guessing-input"); //for styling
    currentGuessingDiv.appendChild(input);
  }

  // Create input fields for bulls and cows
  let bullsInput = document.createElement("input");
  bullsInput.type = "text";
  bullsInput.value = bulls;
  bullsInput.disabled = true;
  bullsInput.classList.add("bulls");
  currentGuessingDiv.appendChild(bullsInput);

  let cowsInput = document.createElement("input");
  cowsInput.type = "text";
  cowsInput.value = cows;
  cowsInput.disabled = true;
  cowsInput.classList.add("cows");
  currentGuessingDiv.appendChild(cowsInput);
  guessingsHistoryDiv.appendChild(currentGuessingDiv);
}

function clear_window() {
  document.getElementById("guess1").value = "0";
  document.getElementById("guess2").value = "1";
  document.getElementById("guess3").value = "2";
  document.getElementById("guess4").value = "3";
  document.getElementById("guessings_history").innerHTML = "";
}

function start_new_game() {
  startTime = new Date();
  new_target = random_number_to_guess();
  document.getElementById("show_target").innerHTML = "";
  clear_window();
}

function give_up() {
  let target = document.getElementById("show_target");
  target.innerHTML = ""; // Clear previous content
  for (let i = 0; i < new_target.length; i++) {
    let digitInput = document.createElement("input");
    digitInput.type = "text";
    digitInput.value = new_target[i];
    digitInput.disabled = true; 
    digitInput.classList.add("target-digit");
    target.appendChild(digitInput);
  }
  clear_window();
}
