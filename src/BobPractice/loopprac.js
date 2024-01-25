const { prompt } = require("enquirer");

let counter;

async function mainLoop() {
  for (counter = 1; counter <= 7; counter++) {
    await higherOrLower();
  }
}

mainLoop();

async function higherOrLower() {
  const currentNumber = randomInt();
  const nextNumber = randomInt(); // intend to compare then set current to next

  const userResultPrompt = await prompt({
    type: "input",
    name: "userResponse",
    message: `The number is ${currentNumber}. Will the next number (1-13) be higher or lower?`,
  });

  const guess = userResultPrompt.userResponse.toLowerCase();
  if (
    (guess === "higher" && nextNumber > currentNumber) ||
    (guess === "lower" && nextNumber < currentNumber)
  ) {
    console.log(
      `You said ${guess}. The next number is ${nextNumber}. Congratulations! You move on to round ${
        counter + 1
      }.`
    );
  } else if (nextNumber === currentNumber) {
    console.log(`Unlucky! The next number is also ${nextNumber}. You lose.`);
    counter = 11;
  } else {
    console.log(
      `You said ${guess}. This was wrong. The next number is ${nextNumber}. Go home.`
    );
    counter = 11;
  }

  return userResultPrompt;
}

function randomInt() {
  return Math.floor(1 + Math.random() * 13);
}
