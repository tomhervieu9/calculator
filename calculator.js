// global data
const PRECISION = 10;
const keys = Array.from(document.querySelectorAll('button'));
const formulaDisplay = document.querySelector('.formula');
const resultDisplay = document.querySelector('.result');
const operands = Array.from(document.querySelectorAll('.operand'));
const operators = Array.from(document.querySelectorAll('.operator'));
const evaluator = document.querySelector('.evaluator');
const clear = document.querySelector('.clear');
const OPERATOR_MAPPING = {
    '+':'add',
    '−':'subtract',
    '×':'multiply',
    '÷':'divide',
    '^':'exponent',
}
let formula = {
    leftOperand:'',
    operator:'',
    rightOperand:'',
}

// adds sensing for clicks
operands.forEach(operand => operand.addEventListener('click', () => {
    displayOperand(operand.textContent)
}));
operators.forEach(operator => operator.addEventListener('click', () => {
    displayOperator(operator.textContent);
}));
evaluator.addEventListener('click', evaluate);
clear.addEventListener('click',clearFormulaDisplay);

// adds sensing for keys
window.addEventListener('keydown', (e) => {
    e.preventDefault();

    const keyPressed = keys.find(key => {
        const validInputs = key.getAttribute('data-keys').split(',');
        return validInputs.includes(e.key);
    });

    if (!keyPressed) {
        return;
    } else if (keyPressed.classList.contains('operand')) {
        displayOperand(keyPressed.textContent);
    } else if (keyPressed.classList.contains('operator')) {
        displayOperator(keyPressed.textContent);
    } else if (keyPressed.classList.contains('evaluator')) {
        evaluate();
    } else if (keyPressed.classList.contains('clear')) {
        clearFormulaDisplay();
    }
});

// calculation functions
function evaluate() {
    if(formula.leftOperand===''
        || formula.operator===''
        || formula.rightOperand==='') {
            return;
        }
    const result = window[OPERATOR_MAPPING[formula.operator]]
        (+formula.leftOperand,+formula.rightOperand);
    resultDisplay.textContent = result;
}
function add(a,b) {
    return +(a+b).toFixed(PRECISION);
}
function subtract(a,b) {
    return +(a-b).toFixed(PRECISION);
}
function multiply(a,b) {
    return +(a*b).toFixed(PRECISION);
}
function divide(a,b) {
    return +(a/b).toFixed(PRECISION);
}
function exponent(a,b) {
    return +(a**b).toFixed(PRECISION);
}

// display functions
function displayOperand(textContent) {
    formulaDisplay.textContent += textContent;

    if (formula.operator === '') formula.leftOperand+=textContent;
    else formula.rightOperand+=textContent;
}
function displayOperator(textContent) {
    if (resultDisplay.textContent !== '' && (formula.leftOperand==='' || formula.rightOperand!=='')) {
        clearFormulaDisplay();
        formulaDisplay.textContent+=resultDisplay.textContent;
        formula.leftOperand = resultDisplay.textContent;
        formula.operator = textContent;
        formulaDisplay.textContent+=textContent;
        resultDisplay.textContent = '';
    }
    else if (formula.operator===''&&formula.leftOperand!=='') {
        formulaDisplay.textContent += textContent;
        formula.operator = textContent;
    }
    return;
}
function clearFormulaDisplay() {
    formulaDisplay.textContent='';
    formula.leftOperand='';
    formula.operator='';
    formula.rightOperand='';
}

