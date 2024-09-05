const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');
let screenValue = '';
let memory = 0;
let radians = true;  // Default mode for trigonometry functions

// Function to process input
function processInput(value) {
  if (value === 'clear') {
    screenValue = '';
    screen.value = screenValue;
  } else if (value === '=') {
    try {
      screen.value = eval(screenValue);
    } catch {
      screen.value = 'Error';
    }
  } else if (value === 'pi') {
    screenValue += Math.PI;
    screen.value = screenValue;
  } else if (value === 'e') {
    screenValue += Math.E;
    screen.value = screenValue;
  } else if (value === 'sqrt') {
    screenValue = Math.sqrt(eval(screenValue));
    screen.value = screenValue;
  } else if (value === 'log') {
    screenValue = Math.log10(eval(screenValue));
    screen.value = screenValue;
  } else if (value === 'ln') {
    screenValue = Math.log(eval(screenValue));
    screen.value = screenValue;
  } else if (value === '1/x') {
    screenValue = 1 / eval(screenValue);
    screen.value = screenValue;
  } else if (value === 'x^2') {
    screenValue = Math.pow(eval(screenValue), 2);
    screen.value = screenValue;
  } else if (value === 'y^x') {
    const values = screenValue.split("^");
    screenValue = Math.pow(values[0], values[1]);
    screen.value = screenValue;
  } else if (value === 'sin') {
    screenValue = radians ? Math.sin(eval(screenValue)) : Math.sin(eval(screenValue) * (Math.PI / 180));
    screen.value = screenValue;
  } else if (value === 'cos') {
    screenValue = radians ? Math.cos(eval(screenValue)) : Math.cos(eval(screenValue) * (Math.PI / 180));
    screen.value = screenValue;
  } else if (value === 'tan') {
    screenValue = radians ? Math.tan(eval(screenValue)) : Math.tan(eval(screenValue) * (Math.PI / 180));
    screen.value = screenValue;
  } else if (value === 'deg') {
    radians = false;
  } else if (value === 'rad') {
    radians = true;
  } else {
    screenValue += value;
    screen.value = screenValue;
  }
}

// Event listeners for button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    processInput(button.value);
  });
});

// Keyboard input handling
document.addEventListener('keydown', function(event) {
  const key = event.key;

  // Number and decimal point input
  if (!isNaN(key) || key === '.') {
    processInput(key);
  }

  // Basic operators
  if (key === '+') processInput('+');
  if (key === '-') processInput('-');
  if (key === '*') processInput('*');
  if (key === '/') processInput('/');
  
  // Parentheses
  if (key === '(') processInput('(');
  if (key === ')') processInput(')');
  
  // Enter for equal sign
  if (key === 'Enter') processInput('=');

  // Backspace to clear
  if (key === 'Backspace') processInput('clear');
  
  // Special keys for constants and functions
  if (key === 'p') processInput('pi');  // Press 'p' for pi
  if (key === 'e') processInput('e');   // Press 'e' for Euler's constant
  if (key === 's') processInput('sqrt'); // Press 's' for square root
});

// Prevent form submission on Enter (optional, if inside a form element)
document.querySelector('form')?.addEventListener('submit', (event) => event.preventDefault());
