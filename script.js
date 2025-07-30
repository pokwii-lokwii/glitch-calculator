let currentInput = '0';
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
}

function append(value) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1 || currentInput === 'Error') {
        clearAll();
    } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function calculate() {
    try {
        const expr = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        if (/[^0-9+\-*/.()\s]/.test(expr)) throw new Error();
        const result = eval(expr);
        currentInput = Number.isFinite(result) ? result.toString() : 'Error';
    } catch {
        currentInput = 'Error';
    }
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (/[0-9+\-*/.=]/.test(e.key)) {
        e.preventDefault();
        if (e.key === '=' || e.key === 'Enter') calculate();
        else append(e.key);
    } else if (e.key === 'Backspace') backspace();
    else if (e.key === 'Escape') clearAll();
});
