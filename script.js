"use strict"

// attach the submit button to the table so when you emter submit the table populates
//attach submit also to the balance,income,expenses numbers

const submitBtn = document.getElementById("submit-transaction");
const table = document.getElementById("transactions-table-body");
const amount = document.getElementById("transaction-amount");
const type = document.getElementById("transaction-type");
const label = document.getElementById("transaction-label");
const date = document.getElementById("transaction-date");
const balanceUI = document.getElementById("balance")
const incomeUI = document.getElementById("income")
const expensesUI = document.getElementById("expenses")

class Budget {
   constructor(){
    
   this.balance = 0;
   this.income = 0;
   this.expenses = 0;
   this.balanceUI = balanceUI;
   this.incomeUI = incomeUI;
   this.expensesUI = expensesUI;
}


updateBalance(){
    this.balance = this.income - this.expenses;
    this.balanceUI.innerText = this.balance.toFixed(2)
   }
  

updateIncome(amount){
    this.income = this.income + amount;
    this.incomeUI.innerText = this.balance.toFixed(2)
    this.updateBalance();
}

updateExpenses(amount){
    this.expenses = this.expenses + amount;
    this.expensesUI.innerText= this.balance.toFixed(2)
    this.updateBalance();
}

addNewEntry (){
    
}

}



// const testBudget = new Budget
// //Test update income 
// testBudget.updateIncome(100); 
// console.log(testBudget.income); 
// console.log(testBudget.balance);
// // Test update income
// testBudget.updateIncome(300)
// console.log(testBudget.income); 
// console.log(testBudget.balance);

// //Test expenses

// testBudget.updateExpenses(300)
// console.log(testBudget.expenses); 
// console.log(testBudget.balance);

