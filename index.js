// helper function
const ce = (tagName) => document.createElement(tagName);
const qs = (selector) => document.querySelector(selector);

//DOM Nodes
const incomeDataDOM = qs("#incomeData");
const incomeFormDOM = qs("#incomeForm");

// MODEL
// dane naszej aplikacji
let incomeData = [
  {
    id: 1, //uuid.v4(),
    name: "a",
    amount: 4,
  },
];

// VIEW
// funkcje render'ujące View (czyli tworzące DOM)
const incomeRender = () => {
  incomeDataDOM.innerHTML = ""; //reset incomeDataDOM -> inaczej za każdym razem dodawałby nie tylko przychód wpisany w input, ale również te, któe już zostały dodane

  incomeData.forEach(({ id, name, amount }) => {
    const incomeLi = ce("li");
    incomeLi.textContent = `${name} - ${amount}`;
    //const editBtn = ce("button");
    //editBtn.textContent = "Edytuj";
    const deleteBtn = ce("button");
    deleteBtn.textContent = "Usuń";
    //incomeLi.appendChild(editBtn);
    incomeLi.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (e) => {
      deleteIncome(id); //TODO
    });
    //TODO editBtn
    incomeDataDOM.appendChild(incomeLi);
  });
};
const incomeRenderApp = () => {
  incomeRender();
};

// UPDATE
// funkcje zmieniające Model
const addIncome = (newIncome) => {
  const newIncomes = [...incomeData, newIncome];
  incomeData = newIncomes; //change Model - incomeData zawiera to, co miał i to co wpisane w input
  incomeRenderApp(); //change Model
};

const deleteIncome = (incomeId) => {
  const newIncomes = incomeData.filter(({ id }) => id !== incomeId); //redukujemy incomeData, pozyskujemy wszystkie przychody za wyjątkiem przychodu o podanym ID
  incomeData = newIncomes; //change Model
  incomeRenderApp(); //change Model
};

// Eventy
incomeFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); //forma nie przeładuje strony

  const { incomeName, incomeAmount } = e.currentTarget.elements; // bo <input type="text" placeholder="Nazwa przychodu" name="incomeName" />
  // bo  <input type="text" placeholder="Kwota" name="incomeAmount" />
  const incomeId = 2; //uuid.v4();
  const newIncome = {
    id: incomeId,
    name: incomeName.value,
    amount: incomeAmount.value,
  };
  addIncome(newIncome);
});

// Start aplikacji
incomeRenderApp();
