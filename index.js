// helper function
const ce = (tagName) => document.createElement(tagName);
const qs = (selector) => document.querySelector(selector);

//DOM Nodes
const incomeDataDOM = qs("#incomeData");
const incomeFormDOM = qs("#incomeForm");
const newIncomeNameDOM = qs("newIncomeName");
const sumIncomesDOM = qs("#sumIncomes");
const sumIncomesSpan = ce("span");

//-----------------------------------------------------------------------------
// ----------------------------------MODEL-------------------------------------
// dane naszej aplikacji
let incomeData = [];
let sumIncome = [];
let incomeId = 1; //uuu.v4();

//-----------------------------------------------------------------------------
// -----------------------------------VIEW-------------------------------------
// funkcje render'ujące View (czyli tworzące DOM)

//-----------incomeRender = () -> dodaje do VIEW to, co wpiszemy w input-----------
const incomeRender = () => {
  incomeDataDOM.innerHTML = "";
  //reset incomeDataDOM -> inaczej za każdym razem dodawałby nie tylko przychód wpisany w input, ale również te, które już zostały dodane
  //TODO: const labelErrDOM = qs("labelErr"); incomeFormDOM.removeChild(labelNameErr);

  incomeData.forEach(({ id, name, amount }) => {
    const incomeLi = ce("li");
    incomeLi.textContent = `${name} - ${amount} `;
    //------Button EDYTUJ
    const editBtn = ce("button");
    editBtn.textContent = "Edytuj";
    editBtn.classList.add("btnEdit");
    incomeLi.appendChild(editBtn);
    //------Button USUŃ
    const deleteBtn = ce("button");
    deleteBtn.textContent = "Usuń";
    deleteBtn.classList.add("btnDelete");
    incomeLi.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (e) => {
      deleteIncome(id); //TODO
      sumIncomesShow(incomeData); //nowa suma
    });
    //TODO editBtn
    incomeDataDOM.appendChild(incomeLi);
    //
  });
};
const incomeRenderApp = () => {
  incomeRender();
};

//----------------------------------------------------------------------------
// -----------------------------------UPDATE----------------------------------
// funkcje zmieniające Model

//-----------addIncome() -> wywoływana przez Button DODAJ; zwraca listę zawierającą przychody łącznie z nowo dodanym-----------
const addIncome = (newIncome) => {
  const newIncomes = [...incomeData, newIncome];
  incomeData = newIncomes; //change Model - incomeData zawiera to, co miał i to co wpisane w input
  incomeRenderApp(); //change Model
};

//-----------deleteIncome() -> wywoływana przez Button Usuń; zwraca listę zawierającą przychody bez usuniętego-----------
const deleteIncome = (incomeId) => {
  const newIncomes = incomeData.filter(({ id }) => id !== incomeId); //redukujemy incomeData, pozyskujemy wszystkie przychody za wyjątkiem przychodu o podanym ID
  incomeData = newIncomes; //change Model
  incomeRenderApp(); //change Model
};

//-----------sumIncomes(newIncome) -> zwraca sumę przychodów-----------
const sumIncomes = (incomeData) => {
  return incomeData
    .reduce((acc, amonutIncome) => acc + parseFloat(amonutIncome.amount), 0)
    .toFixed(2); //parseFloat(liczba).toFixed(2) -> konwertuje string na liczbę dziesiętną
};

//-----------sumIncomesShow -> wyświetla sumę przychodów------------
const sumIncomesShow = (incomeData) => {
  console.log(incomeData);
  sumIncomesSpan.textContent = `${sumIncomes(incomeData)}`;
  //  sumIncomesSpan.textContent = `${Number(sumIncomes(incomeData).toFixed(2))}`;
  sumIncomesDOM.appendChild(sumIncomesSpan);
};
sumIncomesShow(incomeData); //nowa suma

//----------------------------------------------------------------------------
//----------------------------------Eventy------------------------------------

//---------Button DODAJ---------
incomeFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); //forma nie przeładuje strony

  const { newIncomeName, newIncomeAmount } = e.currentTarget.elements; // bo <input name="newIncomeName" /> i  <input name="newIncomeAmount" />

  if (newIncomeName.value === "" || newIncomeAmount.value === "") {
    // throw new Error('Brak danych')//w consoli dla testów
    const checklabelErr = qs("#labelErrID");
    if (checklabelErr !== null) {
      checklabelErr;
      //incomeFormDOM.removeChild(checklabelErr);
    } else {
      const labelNameErr = ce("label");
      labelNameErr.id = "labelErrID";
      labelNameErr.name = "labelErr";
      labelNameErr.classList.add("c-red");
      labelNameErr.textContent = "Podaj nazwę i kwotę przychodu";
      incomeFormDOM.appendChild(labelNameErr);
      //console.log(labelNameErr);
      console.log(incomeData);
      sumIncomesShow(incomeData); //nowa suma
    }
  } else {
    const checklabelErr = qs("#labelErrID");
    if (checklabelErr !== null) {
      incomeFormDOM.removeChild(checklabelErr);
      const newIncome = {
        id: incomeId,
        name: newIncomeName.value,
        amount: newIncomeAmount.value,
      };
      addIncome(newIncome);
      sumIncomesShow(incomeData);
      incomeId++; //albo incomeId = incomeId + 1;
    } else {
      const newIncome = {
        id: incomeId,
        name: newIncomeName.value,
        amount: newIncomeAmount.value,
      };
      addIncome(newIncome);
      sumIncomesShow(incomeData);
      incomeId++; //albo incomeId = incomeId + 1;
    }
  }
});

// Start aplikacji
incomeRenderApp();
