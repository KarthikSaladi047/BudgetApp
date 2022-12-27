let budgetFeedback = document.querySelector(".budget-feedback");
let expenseFeedback = document.querySelector(".expense-feedback");
let budgetForm = document.getElementById("budget-form");
let budgetInput = document.getElementById("budget-input");
let budgetAmount = document.getElementById("budget-amount");
let expenseAmount = document.getElementById("expense-amount");
let balance = document.getElementById("balance-amount");
let balanceAmount = document.getElementById("balance-amount");
let expenseForm = document.getElementById("expense-form");
let expenseInput = document.getElementById("expense-input");
let amountInput = document.getElementById("amount-input");
let expenseList = document.getElementById("expense-list");
let itemList = [];
let itemID = 0;
let budgetNotes = localStorage.getItem("budget") || 0;
let expensesNotes = JSON.parse(localStorage.getItem("expenses") || "[]");
// localStorage.clear();
// location.reload();
const update = () => {
  budgetAmount.innerHTML = Number.parseInt(budgetNotes);
  let result = 0;
  for (let i = 0; i < expensesNotes.length; i++) {
    expenses = Number.parseInt(expensesNotes[i].amount);
    result = result + expenses;
  }
  expenseAmount.innerText = result;
  balance.innerText = String(Number.parseInt(budgetNotes) - result) || 0;
  if(expenseInput.value == "" || amountInput.value === "" ){
  document.getElementById('expense-submit').innerHTML='Add Expense'
}
};
const showNotes = () => {
  if (!expensesNotes) return;
  document.querySelectorAll(".expense1").forEach((e) => e.remove());
  expensesNotes.forEach((item, id) => {
    let div = `<div class="expense1" >
      <div class="expense-item d-flex justify-content-between align-items-baseline">
      <h6 class="expense-title mb-0 text-uppercase list-item">
        ${item.name}
      </h6>
      <h5 class="expense-amount mb-0 list-item">${item.amount}</h5>
      <div class="expense-icons list-item">
        <a
          href="#"
          class="edit-icon mx-2"
          data-id="${id}"
        >
          <i class="fas fa-edit" onClick="editIt(${id},'${item.name}','${item.amount}')"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${id}">
          <i class="fas fa-trash" onClick="deleteIt(${id})"></i>
        </a>
      </div>
    </div>
    </div>`;
    expenseList.insertAdjacentHTML("afterend", div);
  });
};

update();
showNotes();

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (budgetInput.value === "" || budgetInput.value < 0) {
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerText = "value cannot be empty or negative.";
    setTimeout(() => {
      budgetFeedback.classList.remove("showItem");
    }, 4000);
  } else {
    budgetNotes = budgetInput.value.trim();
    localStorage.setItem("budget", budgetNotes);
    budgetInput.value = "";
    update();
  }
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    expenseInput.value == "" ||
    amountInput.value === "" ||
    amountInput.value < 0
  ) {
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerText = "Not a valid input.";
    setTimeout(() => {
      expenseFeedback.classList.remove("showItem");
    }, 4000);
  } else {
    let name = expenseInput.value.trim();
    let amount = amountInput.value.trim();
    let expense = { name, amount };
    expensesNotes.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expensesNotes));
    expenseInput.value = "";
    amountInput.value = "";
    update();
    showNotes();
  }
});

const deleteIt = (id) => {
  expensesNotes.splice(id, 1);
  localStorage.setItem("expenses", JSON.stringify(expensesNotes));
  showNotes();
  update();
};
const editIt = (id,title,amount) => {
    deleteIt(id);
    expenseInput.value = title;
    amountInput.value = amount;
    document.getElementById('expense-submit').innerHTML='Update Expense';
    showNotes();
    update();
};
