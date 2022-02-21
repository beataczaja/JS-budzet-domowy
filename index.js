/*
1. helper function
---------------
*/
const ce = (tagName) => document.createElement(tagName);
const qs = (selector) => document.querySelector(selector);

/*
2. DOM Nodes
------------
*/
const incomeDataDOM = qs("#incomeData");
const incomeFormDOM = qs("#incomeForm");
const newIncomeNameDOM = qs("newIncomeName");
const sumIncomesDOM = qs("#sumIncomes");
const sumIncomesSpan = ce("span");

const expenseDataDOM = qs("#expenseData");
const expenseFormDOM = qs("#expenseForm");
const newExpenseNameDOM = qs("newExpenseName");
const sumExpensesDOM = qs("#sumExpenses");
const sumExpensesSpan = ce("span");

const balanceSpan = ce("span");
const balanceDOM = qs("#balance");

/*
3. MODEL - dane aplikacji
-------------------------
*/

let incomeData = [];
let incomeDataEdit = [];
let sumIncome = [];
let incomeId = 1; //uuid.v4();

let expenseData = [];
let expenseDataEdit = [];
let sumExpense = [];
let expenseId = 1; //uuid.v4();

/*
4. VIEW - funkcje render'ujące View (czyli tworzące DOM)
--------------------------------------------------------
*/
// --------PRZYCHODY----------------
const renderIncome = () => {
  incomeDataDOM.innerHTML = "";
  //reset incomeDataDOM -> inaczej za każdym razem dodawałby nie tylko przychód wpisany w input, ale również te, które już zostały dodane
  //TODO: komunikat o pustych inputach
  incomeData.forEach(({ id, name, amount }) => {
    const incomeLi = ce("li");
    const incomeNameAmountSpan = ce("span");
    const incomeNameSpan = ce("span");
    const incomeAmountSpan = ce("span");
    const dash = ce("span");
    incomeNameSpan.textContent = `${name}`;
    incomeAmountSpan.textContent = `${amount}`;
    dash.textContent = " - ";
    incomeNameAmountSpan.appendChild(incomeNameSpan);
    incomeNameAmountSpan.appendChild(dash);
    incomeNameAmountSpan.appendChild(incomeAmountSpan);
    incomeLi.appendChild(incomeNameAmountSpan);
    const inputNameEdit = ce("input");
    const inputAmountEdit = ce("input");
    //------Button EDYTUJ/ZAPISZ
    const editBtn = ce("button");
    editBtn.textContent = "Edytuj";
    editBtn.classList.add("btnEdit");
    incomeLi.appendChild(editBtn);
    //--event na button
    editBtn.addEventListener("click", (e) => {
      //const button = e.target; //można też tak zamiast editBtn
      //const li = editBtn.parentNode; //można też tak zamiast incomeLi
      if (editBtn.textContent === "Edytuj") {
        inputNameEdit.type = "text";
        inputAmountEdit.type = "text";
        inputNameEdit.value = incomeNameSpan.textContent;
        inputAmountEdit.value = incomeAmountSpan.textContent;
        incomeLi.insertBefore(inputAmountEdit, incomeNameAmountSpan);
        incomeLi.insertBefore(inputNameEdit, inputAmountEdit);
        incomeNameAmountSpan.removeChild(incomeNameSpan);
        incomeNameAmountSpan.removeChild(dash);
        incomeNameAmountSpan.removeChild(incomeAmountSpan);
        incomeLi.removeChild(incomeNameAmountSpan);
        editBtn.textContent = "Zapisz";
        editBtn.classList.add("btnSave");
        deleteBtn.textContent = "Anuluj";
        deleteBtn.classList.add("btnCancel");
      } else if (editBtn.textContent === "Zapisz") {
        // const inputNameEditID = document.getElementById(id + "inputNameEditID");
        // const inputAmountEditID = document.getElementById(
        //   id + "inputAmountEditID"
        // );
        //const inputNameEditID = qs(`input[data-id="${id} + "inputNameEditID""]`);
        incomeNameSpan.textContent = inputNameEdit.value;
        incomeAmountSpan.textContent = inputAmountEdit.value;
        let pos = incomeData.findIndex((i) => i.id === id); //szukam indeksu edytowanego przychodu
        incomeData[pos].name = inputNameEdit.value; //nowa nazwa edytowanego przychodu
        incomeData[pos].amount = inputAmountEdit.value; //nowa kwota edytowanego przychodu
        sumIncomesShow(incomeData); //nowa suma

        incomeNameAmountSpan.appendChild(incomeNameSpan);
        incomeNameAmountSpan.appendChild(dash);
        incomeNameAmountSpan.appendChild(incomeAmountSpan);
        incomeLi.insertBefore(incomeNameAmountSpan, editBtn);
        incomeLi.removeChild(inputNameEdit);
        incomeLi.removeChild(inputAmountEdit);
        editBtn.textContent = "Edytuj";
        editBtn.classList.remove("btnSave");
        deleteBtn.textContent = "Usuń";
        deleteBtn.classList.remove("btnCancel");
      }
      balanceShow(incomeData, expenseData);
    });

    //------Button USUŃ/ANULUJ--PRZYCHODY
    const deleteBtn = ce("button");
    deleteBtn.textContent = "Usuń";
    deleteBtn.classList.add("btnDelete");
    incomeLi.appendChild(deleteBtn);
    //--event na button
    deleteBtn.addEventListener("click", (e) => {
      if (deleteBtn.textContent === "Usuń") {
        deleteIncome(id); //TODO
        sumIncomesShow(incomeData); //nowa suma
      } else if (deleteBtn.textContent === "Anuluj") {
        incomeNameAmountSpan.appendChild(incomeNameSpan);
        incomeNameAmountSpan.appendChild(dash);
        incomeNameAmountSpan.appendChild(incomeAmountSpan);
        incomeLi.insertBefore(incomeNameAmountSpan, editBtn);
        incomeLi.removeChild(inputNameEdit);
        incomeLi.removeChild(inputAmountEdit);
        editBtn.textContent = "Edytuj";
        editBtn.classList.remove("btnSave");
        deleteBtn.textContent = "Usuń";
        deleteBtn.classList.remove("btnCancel");
      }
      balanceShow(incomeData, expenseData);
    });

    incomeDataDOM.appendChild(incomeLi);
  });
};

const renderIncomeApp = () => {
  renderIncome();
};

//---------WYDATKI-------------
const renderExpense = () => {
  expenseDataDOM.innerHTML = "";
  //reset expenseDataDOM -> inaczej za każdym razem dodawałby nie tylko przychód wpisany w input, ale również te, które już zostały dodane
  //TODO: komunikat o pustych inputach
  expenseData.forEach(({ id, name, amount }) => {
    const expenseLi = ce("li");
    const expenseNameAmountSpan = ce("span");
    const expenseNameSpan = ce("span");
    const expenseAmountSpan = ce("span");
    const dash = ce("span");
    expenseNameSpan.textContent = `${name}`;
    expenseAmountSpan.textContent = `${amount}`;
    dash.textContent = " - ";
    expenseNameAmountSpan.appendChild(expenseNameSpan);
    expenseNameAmountSpan.appendChild(dash);
    expenseNameAmountSpan.appendChild(expenseAmountSpan);
    expenseLi.appendChild(expenseNameAmountSpan);
    const inputNameEdit = ce("input");
    const inputAmountEdit = ce("input");
    //------Button EDYTUJ/ZAPISZ
    const editBtn = ce("button");
    editBtn.textContent = "Edytuj";
    editBtn.classList.add("btnEdit");
    expenseLi.appendChild(editBtn);
    //--event na button
    editBtn.addEventListener("click", (e) => {
      //const button = e.target; //można też tak zamiast editBtn
      //const li = editBtn.parentNode; //można też tak zamiast expenseLi
      if (editBtn.textContent === "Edytuj") {
        inputNameEdit.type = "text";
        inputAmountEdit.type = "text";
        inputNameEdit.value = expenseNameSpan.textContent;
        inputAmountEdit.value = expenseAmountSpan.textContent;
        expenseLi.insertBefore(inputAmountEdit, expenseNameAmountSpan);
        expenseLi.insertBefore(inputNameEdit, inputAmountEdit);
        expenseNameAmountSpan.removeChild(expenseNameSpan);
        expenseNameAmountSpan.removeChild(dash);
        expenseNameAmountSpan.removeChild(expenseAmountSpan);
        expenseLi.removeChild(expenseNameAmountSpan);
        editBtn.textContent = "Zapisz";
        editBtn.classList.add("btnSave");
        deleteBtn.textContent = "Anuluj";
        deleteBtn.classList.add("btnCancel");
      } else if (editBtn.textContent === "Zapisz") {
        // const inputNameEditID = document.getElementById(id + "inputNameEditID");
        // const inputAmountEditID = document.getElementById(
        //   id + "inputAmountEditID"
        // );
        //const inputNameEditID = qs(`input[data-id="${id} + "inputNameEditID""]`);
        expenseNameSpan.textContent = inputNameEdit.value;
        expenseAmountSpan.textContent = inputAmountEdit.value;
        let pos = expenseData.findIndex((i) => i.id === id); //szukam indeksu edytowanego przychodu
        expenseData[pos].name = inputNameEdit.value; //nowa nazwa edytowanego przychodu
        expenseData[pos].amount = inputAmountEdit.value; //nowa kwota edytowanego przychodu
        sumExpensesShow(expenseData); //nowa suma
        expenseNameAmountSpan.appendChild(expenseNameSpan);
        expenseNameAmountSpan.appendChild(dash);
        expenseNameAmountSpan.appendChild(expenseAmountSpan);
        expenseLi.insertBefore(expenseNameAmountSpan, editBtn);
        expenseLi.removeChild(inputNameEdit);
        expenseLi.removeChild(inputAmountEdit);
        editBtn.textContent = "Edytuj";
        editBtn.classList.remove("btnSave");
        deleteBtn.textContent = "Usuń";
        deleteBtn.classList.remove("btnCancel");
      }
      balanceShow(incomeData, expenseData);
    });

    //------Button USUŃ/ANULUJ
    const deleteBtn = ce("button");
    deleteBtn.textContent = "Usuń";
    deleteBtn.classList.add("btnDelete");
    expenseLi.appendChild(deleteBtn);
    //--event na button
    deleteBtn.addEventListener("click", (e) => {
      if (deleteBtn.textContent === "Usuń") {
        deleteExpense(id); //TODO
        sumExpensesShow(expenseData); //nowa suma
      } else if (deleteBtn.textContent === "Anuluj") {
        expenseNameAmountSpan.appendChild(expenseNameSpan);
        expenseNameAmountSpan.appendChild(dash);
        expenseNameAmountSpan.appendChild(expenseAmountSpan);
        expenseLi.insertBefore(expenseNameAmountSpan, editBtn);
        expenseLi.removeChild(inputNameEdit);
        expenseLi.removeChild(inputAmountEdit);
        editBtn.textContent = "Edytuj";
        editBtn.classList.remove("btnSave");
        deleteBtn.textContent = "Usuń";
        deleteBtn.classList.remove("btnCancel");
      }
      balanceShow(incomeData, expenseData);
    });

    expenseDataDOM.appendChild(expenseLi);
  });
};

const renderExpenseApp = () => {
  renderExpense();
};

/*
5. UPDATE - funkcje zmieniające Model
-------------------------------------
*/

// PRZYCHODY
//-----------addIncome() -> wywoływana przez Button DODAJ; zwraca listę zawierającą przychody łącznie z nowo dodanym-----------
const addIncome = (newIncome) => {
  const newIncomes = [...incomeData, newIncome];
  incomeData = newIncomes; //change Model - incomeData zawiera to, co miał i to co wpisane w input
  renderIncomeApp(); //change Model
};

//-----------deleteIncome() -> wywoływana przez Button Usuń; zwraca listę zawierającą przychody bez usuniętego-----------
const deleteIncome = (incomeId) => {
  const newIncomes = incomeData.filter(({ id }) => id !== incomeId); //redukujemy incomeData, pozyskujemy wszystkie przychody za wyjątkiem przychodu o podanym ID
  incomeData = newIncomes; //change Model
  renderIncomeApp(); //change Model
};

//-----------sumIncomes(newIncome) -> zwraca sumę przychodów-----------
const sumIncomes = (incomeData) => {
  return incomeData
    .reduce((acc, amountIncome) => acc + parseFloat(amountIncome.amount), 0)
    .toFixed(2); //parseFloat(liczba).toFixed(2) -> konwertuje string na liczbę dziesiętną
};

//-----------sumIncomesShow -> wyświetla sumę przychodów------------
const sumIncomesShow = (incomeData) => {
  sumIncomesSpan.textContent = `${sumIncomes(incomeData)}`;
  sumIncomesDOM.appendChild(sumIncomesSpan);
};
sumIncomesShow(incomeData); //suma początkowa: 0

//WYDATKI
//-----------addExpense() -> wywoływana przez Button DODAJ; zwraca listę zawierającą wydatki łącznie z nowo dodanym-----------
const addExpense = (newExpense) => {
  const newExpenses = [...expenseData, newExpense];
  expenseData = newExpenses; //change Model - expenseData zawiera to, co miał i to co wpisane w input
  renderExpenseApp(); //change Model
};

//-----------deleteExpense() -> wywoływana przez Button Usuń; zwraca listę zawierającą wydatki bez usuniętego-----------
const deleteExpense = (expenseId) => {
  const newExpenses = expenseData.filter(({ id }) => id !== expenseId); //redukujemy expenseData, pozyskujemy wszystkie przychody za wyjątkiem przychodu o podanym ID
  expenseData = newExpenses; //change Model
  renderExpenseApp(); //change Model
};

//-----------sumExpenses(newExpense) -> zwraca sumę wydatków-----------
const sumExpenses = (expenseData) => {
  return expenseData
    .reduce((acc, amountExpense) => acc + parseFloat(amountExpense.amount), 0)
    .toFixed(2); //parseFloat(liczba).toFixed(2) -> konwertuje string na liczbę dziesiętną
};

//-----------sumExpensesShow -> wyświetla sumę wydatków------------
const sumExpensesShow = (expenseData) => {
  sumExpensesSpan.textContent = `${sumExpenses(expenseData)}`;
  sumExpensesDOM.appendChild(sumExpensesSpan);
};
sumExpensesShow(expenseData); //suma początkowa: 0

//-------------balance - zwraca bilans przychodów i wydatków
const balance = (incomeData, expenseData) => {
  return sumIncomes(incomeData) - sumExpenses(expenseData);
};

//------------balanceShow -> wyświetla bilans
const balanceShow = (incomeData, expenseData) => {
  if (balance(incomeData, expenseData) > 0) {
    balanceSpan.textContent = `Możesz jeszcze wydać ${balance(
      incomeData,
      expenseData
    )} zł`;
    balanceSpan.classList.remove("c-red");
    balanceSpan.classList.add("c-green");
  }
  if (balance(incomeData, expenseData) === 0) {
    balanceSpan.textContent = `Bilans wynosi zero`;
    balanceSpan.classList.remove("c-red");
    balanceSpan.classList.remove("c-green");
  }
  if (balance(incomeData, expenseData) < 0) {
    balanceSpan.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance(incomeData, expenseData)
    )} zł`;
    balanceSpan.classList.remove("c-green");
    balanceSpan.classList.add("c-red");
  }
  balanceDOM.appendChild(balanceSpan);
};
balanceShow(incomeData, expenseData); //początkowy bilans 0

/*
6. Eventy
---------
*/

/*---------Button DODAJ-PRZYCHODY--------*/
incomeFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); //forma nie przeładuje strony

  const { newIncomeName, newIncomeAmount } = e.currentTarget.elements; // bo <input name="newIncomeName" /> i  <input name="newIncomeAmount" />
  if (newIncomeName.value !== "" && newIncomeAmount.value !== "") {
    sumIncomesShow(incomeData); //nowa suma

    const newIncome = {
      id: incomeId,
      name: newIncomeName.value,
      amount: newIncomeAmount.value,
    };
    addIncome(newIncome);
    sumIncomesShow(incomeData);
    incomeId++; //albo incomeId = incomeId + 1;
  }
  balanceShow(incomeData, expenseData);
});

/*---------Button DODAJ-WYDATKI--------*/
expenseFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); //forma nie przeładuje strony

  const { newExpenseName, newExpenseAmount } = e.currentTarget.elements; // bo <input name="newExpenseName" /> i  <input name="newIncomeAmount" />
  if (newExpenseName.value !== "" && newExpenseAmount.value !== "") {
    sumExpensesShow(expenseData); //nowa suma

    const newExpense = {
      id: expenseId,
      name: newExpenseName.value,
      amount: newExpenseAmount.value,
    };
    addExpense(newExpense);
    sumExpensesShow(expenseData);
    expenseId++; //albo expenseId = expenseId + 1;
  }
  balanceShow(incomeData, expenseData);
});

// Start aplikacji
renderIncomeApp();
renderExpenseApp();
