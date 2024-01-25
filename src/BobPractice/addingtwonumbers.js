const { prompt } = require("enquirer");

async function takeTwo() {
  const firstResult = await firstNumber();
  console.log("First number input was " + firstResult.digits);
  const secondResult = await secondNumber();
  console.log("Second number input was " + secondResult.digits);
  const answer = firstResult.digits + secondResult.digits;
  console.log(
    `The result of ${firstResult.digits} + ${secondResult.digits} is ${answer}`
  );
}

function firstNumber() {
  return prompt({
    type: "numeral",
    name: "digits",
    message: "Give me a number.",
  });
}

function secondNumber() {
  return prompt({
    type: "numeral",
    name: "digits",
    message: "Give me another number.",
  });
}

console.log("Before");

takeTwo();

console.log("After");
