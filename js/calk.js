let display = document.querySelector(".display");
let buttNum = Array.from(document.querySelectorAll(".button"));
buttNum.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "0";
        break;
      case "=":
        try {
          display.innerText = eval(display.innerText);
        } catch (e) {
          display.innexText = "Error!";
        }
        break;
      case "+/-":
        display.innerText = "-";
        break;
      case "%":
        let passedText = display.innerText + "/100";
        display.innerText = eval(passedText);
        break;
      default:
        if (display.innerText === "0" && e.target.innerText !== ".") {
          display.innerText = e.target.innerText;
        } else {
          display.innerText += e.target.innerText;
        }
    }
  });
});
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[\d\+\-\*\/\.]/.test(key)) {
    if (display.innerText === "0") {
      display.innerText = key;
    } else {
      display.innerText += key;
    }
  }
  if (key === "Enter" || key === "=") {
    try {
      display.innerText = eval(display.innerText);
    } catch (e) {
      display.innexText = "Error!";
    }
  }
  if (key === "Backspace") {
    display.innerText = display.innerText.slice(0, -1) || "0";
  }
  if (key === "Escape") {
    display.innerText = "0";
  }
  if (key === "%") {
    display.innerText = eval(display.innerText + "/100");
  }
});
