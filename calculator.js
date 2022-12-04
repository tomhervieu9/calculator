const PRECISION = 10;
const keys = Array.from(document.querySelectorAll('button'));
const formulaDisplay = document.querySelector('.formula');
const resultDisplay = document.querySelector('.result');
const OPERATOR_MAPPING = {
    '+':'add',
    '−':'subtract',
    '×':'multiply',
    '÷':'divide'
}
let formula = {
    leftOperand:'',
    operator:'',
    rightOperand:'',
    // evaluated:false;
}


const operands = Array.from(document.querySelectorAll('.operand'));
operands.forEach(operand => operand.addEventListener('click', () => {
    displayOperand(operand.textContent)
}));

const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach(operator => operator.addEventListener('click', () => {
    displayOperator(operator.textContent);
}));

const evaluate = document.querySelector('.operate');
evaluate.addEventListener('click', operate);

const clear = document.querySelector('.clear');
clear.addEventListener('click',clearFormulaDisplay);

window.addEventListener('keydown', (e) => {
    const keyPressed = keys.find(key => key.getAttribute('data-keys').includes(e.key));

    if (keyPressed.classList.contains('operand')) {
        displayOperand(keyPressed.textContent);
    } else if (keyPressed.classList.contains('operator')) {
        displayOperator(keyPressed.textContent);
    } else if (keyPressed.classList.contains('operate')) {
        operate();
    }
});

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
function operate() {
    if(formula.leftOperand===''
        || formula.operator===''
        || formula.rightOperand==='') {
            return;
        }
    const result = window[OPERATOR_MAPPING[formula.operator]]
        (+formula.leftOperand,+formula.rightOperand);
    resultDisplay.textContent = result;
}
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

