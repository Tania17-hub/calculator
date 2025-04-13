let display = document.querySelector(".display");
let buttNum = Array.from(document.querySelectorAll(".button"));
let clearNext = false;
buttNum.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "0";
        break;
      case "=":
        try {
          const expression = display.innerText;
          const result = eval(expression);
          if (!isFinite(result)) {
            display.innerText = "Ділення на 0 неможливе";
          } else {
            historyList.innerHTML += `<div>${expression} = ${result}</div>`;
            display.innerText = result;
            clearNext = true; //
          }
        } catch (e) {
          display.innerText = "Error!";
        }
        break;
      case "+/-":
        if (display.innerText.startsWith("-")) {
          display.innerText = display.innerText.slice(1);
        } else {
          display.innerText = "-" + display.innerText;
        }
        break;

      case "%":
        try {
          const result = eval(display.innerText + "/100");
          if (!isFinite(result)) {
            display.innerText = "Ділення на 0 неможливе";
          } else {
            display.innerText = result;
          }
        } catch {
          display.innerText = "Error!";
        }
        break;
      default:
        if (clearNext) {
          display.innerText = e.target.innerText;
          clearNext = false;
        } else if (display.innerText === "0" && e.target.innerText !== ".") {
          display.innerText = e.target.innerText;
        } else {
          display.innerText += e.target.innerText;
        }
        break;
    }
  });
});

//------Подключить клавиатуру----///

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[\d\+\-\*\/\.]/.test(key)) {
    if (display.innerText === "0") {
      display.innerText = key;
    } else {
      display.innerText += key;
    }
  }
  if (key === "Enter") {
    try {
      const result = eval(display.innerText);
      if (!isFinite(result)) {
        display.innerText = "Ділення на 0 неможливе";
      } else {
        display.innerText = result;
      }
    } catch (e) {
      display.innerText = "Error!";
    }
  }

  if (key === "Backspace") {
    display.innerText = display.innerText.slice(0, -1) || "0";
  }

  if (key === "Escape") {
    display.innerText = "0";
  }

  if (key === "%") {
    try {
      const result = eval(display.innerText + "/100");
      if (!isFinite(result)) {
        display.innerText = "Ділення на 0 неможливе";
      } else {
        display.innerText = result;
      }
    } catch {
      display.innerText = "Error!";
    }
  }
});
//---Память обчислювань--//

let historyList = document.querySelector("#history-list");
let windowHistory = document.querySelector("#windowHistory");

document.querySelector("#toggle-history").addEventListener("click", () => {
  windowHistory.classList.toggle("hidden");
});

document.querySelector("#close-history").addEventListener("click", () => {
  windowHistory.classList.add("hidden");
});
