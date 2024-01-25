const { prompt } = require("enquirer");

async function mainLoop() {
  let counter = 1;
  const MAX_ROUND_NUMBER = 7;

  let currentNumber = randomInt();
  while (counter <= MAX_ROUND_NUMBER) {
    const nextNumberOrNull = await playOneIterationOfHigherLower(
      currentNumber,
      counter
    );
    if (nextNumberOrNull === null) {
      //must have failed
      break;
    } else {
      currentNumber = nextNumberOrNull;
    }
    counter++;
  }
  if (counter > MAX_ROUND_NUMBER) {
    console.log("WOOO HOO CONGRATS");
  }
}

/**
 *@param {number} currentNumber
 *
 * @returns {Promise<number|null>}
 */
async function playOneIterationOfHigherLower(currentNumber, roundNumber) {
  const nextNumber = randomInt(); // intend to compare then set current to next

  const userResultPrompt = await prompt({
    type: "input",
    name: "userResponse",
    message: `The number is ${currentNumber}. Will the next number (1-13) be higher or lower? (CHEAT: ${nextNumber})`,
  });

  //@ts-ignore
  const guess = userResultPrompt.userResponse.toLowerCase();
  if (
    (guess === "higher" && nextNumber > currentNumber) ||
    (guess === "lower" && nextNumber < currentNumber)
  ) {
    console.log(
      `You said ${guess}. The next number is ${nextNumber}. Congratulations! You move on to round ${
        roundNumber + 1
      }.`
    );
    return nextNumber;
  } else if (nextNumber === currentNumber) {
    console.log(`Unlucky! The next number is also ${nextNumber}. You lose.`);
    return null;
  } else {
    console.log(
      `You said ${guess}. This was wrong. The next number is ${nextNumber}. Go home.`
    );
    return null;
  }
}

function randomInt() {
  return Math.floor(1 + Math.random() * 13);
}

mainLoop();
