const actions = ['+', '-', '*', '/', '.', '%'];

const dashboard = document.getElementById("dashboard");

function printAction(val) {
  if (val === '+/-') {
    let firstDigit = dashboard.value[0]
    if (firstDigit === '-') {
      dashboard.value = dashboard.value.slice(1, dashboard.value.length)
    } else {
      dashboard.value = '-' + dashboard.value
    }
  } else if (actions.includes(dashboard.value[dashboard.value.length - 1])
    || dashboard.value.length === 0) {
  } else {
    dashboard.value += val
  }
}

function printDigit(val) {
  dashboard.value += val
}

function solve() {
  let expression = dashboard.value;
  try {
    dashboard.value = math.evaluate(expression);
  } catch (e) {
    dashboard.value = "Error";
    console.error("Invalid mathematical expression");
  }
}

function clr() {
  dashboard.value = ''
}

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.querySelector('body').className = themeName;
}

function toggleTheme() {
  let theme = localStorage.getItem('theme');

  if (theme === 'theme-second') {
    theme = 'theme-one'
  } else if (theme === 'theme-one') {
    theme = 'theme-second'
  }
  setTimeout(() => {
    setTheme(theme);
  }, 500)
}

function save() {
  const dashboard = document.getElementById("dashboard");
  console.log('Dashboard value:', dashboard.value); // Додаємо логування
  if (dashboard && dashboard.value.trim() !== '') {
    localStorage.setItem('result', dashboard.value);
    console.log('Saved to localStorage:', dashboard.value); // Додаємо логування
  } else {
    console.error("Dashboard is empty. Nothing to save.");
  }
}

function paste() {
  const savedValue = localStorage.getItem('result');
  if (savedValue) {
    printDigit(savedValue);
  } else {
    console.error("No saved value in localStorage under the key 'result'");
  }
}


setTheme('theme-one');
