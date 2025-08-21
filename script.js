document.addEventListener('DOMContentLoaded', function () {
    // 🌟 DOM Selectors for Expense Tracker

    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseList = document.getElementById('expense-list');

    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = [];
    if (expenses.length === 0) {
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
            expenses = JSON.parse(storedExpenses);
            expenses.forEach(expense => {
                renderExpenses(expense, expenses.indexOf(expense));
                updateTotalAmount();
            });
        }
    }
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            expenses.splice(index, 1);
            updateLocalStorage();
            refreshExpenseList();
        }
    });
    function refreshExpenseList() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => renderExpenses(expense, index));
        updateTotalAmount();
    }


    function renderExpenses(expense, index) {
        const li = document.createElement('li');
        li.innerHTML = `    
        <span>${expense.name}</span>
        <span>$${expense.amount.toFixed(2)}</span>
        <small>${expense.date}</small>
        <button data-index="${index}" class="delete-btn">❌</button>
    `;
        expenseList.appendChild(li);
    };

    function updateTotalAmount() {
        const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    };

    const updateLocalStorage = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value.trim());
        if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
            const expense = {
                name: expenseName, amount: expenseAmount, date: new Date().toLocaleDateString()
            };
            expenses.push(expense);
            updateTotalAmount();
            renderExpenses(expense);
            expenseForm.reset();
            updateLocalStorage();
        } else {
            alert('Please enter valid expense details.');
        }
    });
});