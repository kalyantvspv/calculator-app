let result = document.getElementById('result');


function appendNumber(number) {
    result.value += number;
}

function appendOperator(operator) {
    result.value += operator;
}

function clearResult() {
    result.value = '';
}

function deleteNumber() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    let expression = result.value;

    try {
        let resultValue = evaluateExpression(expression);
        result.value = resultValue;
    } catch (error) {
        result.value = 'Error';
    }
}

function square() {
    let value = result.value;

    try {
        let resultValue = Math.pow(parseFloat(value), 2);
        result.value = resultValue;
    } catch (error) {
        result.value = 'Error';
    }
}

function evaluateExpression(expression) {
    let operators = ['+', '-', '*', '/', '%'];
    let operatorStack = [];
    let operandStack = [];
    let number = '';

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (!operators.includes(char)) {
            // Build the number
            number += char;
        } else {
            // Push the number to the operand stack
            operandStack.push(parseFloat(number));
            number = '';

            // Perform calculations based on operator precedence
            while (
                operatorStack.length > 0 &&
                hasPrecedence(char, operatorStack[operatorStack.length - 1])
            ) {
                let b = operandStack.pop();
                let a = operandStack.pop();
                let operator = operatorStack.pop();
                operandStack.push(applyOperator(a, operator, b));
            }

            // Push the current operator to the operator stack
            operatorStack.push(char);
        }
    }

    // Push the last number to the operand stack
    operandStack.push(parseFloat(number));

    // Perform the remaining calculations
    while (operatorStack.length > 0) {
        let b = operandStack.pop();
        let a = operandStack.pop();
        let operator = operatorStack.pop();
        operandStack.push(applyOperator(a, operator, b));
    }

    // The final result will be the top element of the operand stack
    return operandStack.pop();
}

function hasPrecedence(op1, op2) {
    let precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2
    };

    return precedence[op1] >= precedence[op2];
}

function applyOperator(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return a % b;
        default:
            throw new Error('Invalid operator');
    }
}
