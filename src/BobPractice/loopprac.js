const { prompt } = require("enquirer");

async function mainLoop() {
  const MAX_ROUND_NUMBER = 7;
  let counter = 1;
  let currentNumber = randomInt();
  while (counter <= MAX_ROUND_NUMBER) {
    const result = await playOneIterationOfHigherLower(currentNumber);
    if (result.outcome === "success") {
      currentNumber = result.number;
    } else {
      //must have failed
      break;
    }
    counter++;
  }
  if (counter > MAX_ROUND_NUMBER) {
    console.log("WOOO HOO CONGRATS");
  }
}

mainLoop();

/**
 *@param {number} currentNumner
 * @returns {Promise<{outcome: "success", number:number } | {outcome: "fail"} >}
 */
async function playOneIterationOfHigherLower(currentNumber) {
  const nextNumber = randomInt(); // intend to compare then set current to next

  const userResultPrompt = await prompt({
    type: "input",
    name: "userResponse",
    message: `The number is ${currentNumber}. Will the next number (1-13) be higher or lower? (CHEAT: ${nextNumber})`,
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
    return { outcome: "success", number: nextNumber };
  } else if (nextNumber === currentNumber) {
    console.log(`Unlucky! The next number is also ${nextNumber}. You lose.`);
    return { outcome: "fail" };
  } else {
    console.log(
      `You said ${guess}. This was wrong. The next number is ${nextNumber}. Go home.`
    );
    return { outcome: "fail" };
  }

  return userResultPrompt;
}

function randomInt() {
  return Math.floor(1 + Math.random() * 13);
}
