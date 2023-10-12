const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const addExpenseButton = document.getElementById("addExpense");
    const expensesList = document.querySelector(".expenses-list ul");
    const totalExpensesElement = document.getElementById("totalExpenses");

    let expenses = [];
    let totalExpenses = 0;

    addExpenseButton.addEventListener("click", () => {
      const description = descriptionInput.value;
      const amount = parseFloat(amountInput.value);

      if (description && !isNaN(amount)) {
        expenses.push({ description, amount });
        totalExpenses += amount;
        updateExpensesList();
        updateTotalExpenses();
        clearInputs();
      }
    });

    function updateExpensesList() {
      expensesList.innerHTML = "";
      expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${expense.description}: ${expense.amount.toFixed(2)}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          totalExpenses -= expenses[index].amount;
          expenses.splice(index, 1);
          updateExpensesList();
          updateTotalExpenses();
        });
        listItem.appendChild(deleteButton);
        expensesList.appendChild(listItem);
      });
    }

    function updateTotalExpenses() {
      totalExpensesElement.textContent = totalExpenses.toFixed(2);
    }

    function clearInputs() {
      descriptionInput.value = "";
      amountInput.value = "";
    }
  