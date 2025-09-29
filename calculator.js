document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const screen = document.querySelector('.screen-content h5');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let expression = '';

    // Update screen display
    function updateScreen() {
        screen.textContent = expression + currentInput || '0';
    }

    // Add click event to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            switch(value) {
                case 'CE':
                    // Clear everything
                    currentInput = '';
                    expression = '';
                    updateScreen();
                    break;

                case '<==':
                    // Backspace - remove last character
                    if (currentInput.length > 0) {
                        currentInput = currentInput.slice(0, -1);
                    } else if (expression.length > 0) {
                        // If currentInput is empty, remove from expression
                        expression = expression.slice(0, -1);
                    }
                    updateScreen();
                    break;

                case '=':
                    // Calculate result
                    try {
                        if (expression + currentInput) {
                            // Evaluate the expression
                            const result = eval(expression + currentInput);
                            screen.textContent = result;
                            expression = result.toString();
                            currentInput = '';
                        }
                    } catch (error) {
                        screen.textContent = 'Error';
                        currentInput = '';
                        expression = '';
                    }
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                case '(':
                case ')':
                    // Handle operators and parentheses
                    // If currentInput is empty and we're adding an operator after a result
                    if (currentInput === '' && expression && !isNaN(expression[expression.length - 1])) {
                        expression += value;
                    } else {
                        expression += currentInput + value;
                    }
                    currentInput = '';
                    updateScreen();
                    break;

                default:
                    // Handle numbers and decimal point
                    // Prevent multiple decimal points in a number
                    if (value === '.' && currentInput.includes('.')) {
                        break;
                    }
                    currentInput += value;
                    updateScreen();
                    break;
            }
        });
    });

    // Initialize screen
    updateScreen();
});