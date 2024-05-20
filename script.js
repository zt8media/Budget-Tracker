"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById("submit-transaction");
    const clearBtn = document.getElementById("clear-table");
    const table = document.getElementById("transactions-table-body");
    const amount = document.getElementById("transaction-amount");
    const type = document.getElementById("transaction-type");
    const label = document.getElementById("transaction-label");
    const date = document.getElementById("transaction-date");
    const balanceUI = document.getElementById("balance");
    const incomeUI = document.getElementById("income");
    const expensesUI = document.getElementById("expenses");

    // Initialize the Chart.js doughnut chart
    const ctx = document.getElementById('income-expense-chart').getContext('2d');
    const data = {
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [{
            label: 'Budget Data',
            data: [0, 0, 0],
            backgroundColor: [
                'rgb(236, 67, 219)', // income
                'rgb(132, 37, 145)', // expenses
                'rgb(247, 247, 247)'  // balance
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    };
    const budgetChart = new Chart(ctx, config);

    // Function to update the chart
    function updateChart(income, expenses, balance) {
        budgetChart.data.datasets[0].data = [income, expenses, balance];
        budgetChart.update();
    }

    // Function to format date to mm/dd/yyyy
    function formatDate(inputDate) {
        if (!inputDate) return ''; // Return empty string if no date is provided
        const dateObj = new Date(inputDate);
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${month}/${day}/${year}`;
    }

    class Budget {
        constructor() {
            this.balance = 0;
            this.income = 0;
            this.expenses = 0;

            this.balanceUI = balanceUI;
            this.incomeUI = incomeUI;
            this.expensesUI = expensesUI;
        }

        updateBalance() {
            this.balance = this.income - this.expenses;
            this.balanceUI.innerText = this.balance.toFixed(2);
            updateChart(this.income, this.expenses, this.balance);
        }

        updateIncome(amount) {
            this.income += amount;
            this.incomeUI.innerText = this.income.toFixed(2);
            this.updateBalance();
        }

        updateExpenses(amount) {
            this.expenses += amount;
            this.expensesUI.innerText = this.expenses.toFixed(2);
            this.updateBalance();
        }

        addNewEntry() {
            const inputAmount = parseFloat(amount.value); // parseFloat = Turns string into number
            const inputType = type.value;
            const inputLabel = label.value;
            const inputDate = date.value;

            // Validation: Check if amount is entered
            if (!inputAmount || inputAmount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            // Check if income or expense
            if (inputType === "expense") {
                this.updateExpenses(inputAmount);
            } else {
                this.updateIncome(inputAmount);
            }

            // Format the date
            const formattedDate = formatDate(inputDate);

            // Add new entry to the table
            const newRow = document.createElement("tr");
            newRow.classList.add(inputType === 'income' ? 'income-row' : 'expense-row');
            newRow.innerHTML = `
                <td>${inputType}</td>
                <td>$${inputAmount.toFixed(2)}</td>
                <td>${inputLabel}</td>
                <td>${formattedDate}</td>
                <td class="delete-icon">🗑️</td>
            `;
            newRow.querySelector('.delete-icon').addEventListener('click', () => {
                this.deleteEntry(newRow, inputType, inputAmount);
            });
            table.appendChild(newRow);

            // Clear input fields after submitting
            amount.value = '';
            label.value = '';
            date.value = '';
        }

        deleteEntry(row, type, amount) {
            row.remove();
            if (type === 'expense') {
                this.expenses -= amount;
                this.updateExpenses(0);
            } else {
                this.income -= amount;
                this.updateIncome(0);
            }
            this.updateBalance();
        }

        clearTable() {
            // Remove all rows from the table body
            table.innerHTML = '';

            // Reset income, expenses, and balance to 0
            this.balance = 0;
            this.income = 0;
            this.expenses = 0;

            // Update the UI elements
            this.balanceUI.innerText = this.balance.toFixed(2);
            this.incomeUI.innerText = this.income.toFixed(2);
            this.expensesUI.innerText = this.expenses.toFixed(2);

            // Update the chart
            updateChart(this.income, this.expenses, this.balance);
        }
    }

    // Create an instance of the Budget class
    const budget = new Budget();

    // Add event listener to the submit button
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        budget.addNewEntry();
    });

    // Add event listener to the clear button
    clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        budget.clearTable();
    });
});
