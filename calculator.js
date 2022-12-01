const PRECISION = 10;
let formula = {
    leftOperand:'',
    operator:'',
    rightOperand:'',
    // evaluated:false;
}

const OPERATOR_MAPPING = {
    '+':'add',
    '−':'subtract',
    '×':'multiply',
    '÷':'divide'
}

const formulaDisplay = document.querySelector('.formula');
const resultDisplay = document.querySelector('.result');

const operands = Array.from(document.querySelectorAll('.operand'));
operands.forEach(operand => operand.addEventListener('click', displayOperand));

const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach(operator => operator.addEventListener('click', displayOperator));

const equalSign = document.querySelector('.functional.equal');
equalSign.addEventListener('click', operate);

const clear = document.querySelector('.functional.clear');
clear.addEventListener('click',clearFormulaDisplay);

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

function displayOperand() {
    formulaDisplay.textContent += this.textContent;

    if (formula.operator === '') formula.leftOperand+=this.textContent;
    else formula.rightOperand+=this.textContent;
}

function displayOperator() {
    if (resultDisplay.textContent !== '' && (formula.leftOperand==='' || formula.rightOperand!=='')) {
        clearFormulaDisplay();
        formulaDisplay.textContent+=resultDisplay.textContent;
        formula.leftOperand = resultDisplay.textContent;
        formula.operator = this.textContent;
        formulaDisplay.textContent+=this.textContent;
        resultDisplay.textContent = '';
    }
    else if (formula.operator===''&&formula.leftOperand!=='') {
        formulaDisplay.textContent += this.textContent;
        formula.operator = this.textContent;
    }
    return;
}

function clearFormulaDisplay() {
    formulaDisplay.textContent='';
    formula.leftOperand='';
    formula.operator='';
    formula.rightOperand='';
}

