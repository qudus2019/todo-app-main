/** @format */

const toggle = document.querySelector(".theme-toggle-wrapper");
let crosses = document.querySelectorAll(".cross");
let inputEl = document.querySelector("#new-todo");
let todos = document.querySelector(".todos");
const circleBtn = document.querySelector(".circle");
let remainingActiveTodo = document.querySelector(".number");
let alltodo = [...document.querySelectorAll(".todo")];
const messageBox = document.querySelector(".message-box-hide");
let body = document
  .querySelector("body")
  .classList.add(localStorage.getItem("theme"));
let no_todo = document.querySelector(".no-todo");

let todosObj = {};
let inputtedText;
for (let prop in todosObj) {
  console.log(todosObj[prop].text);
}
function MessageToDisplay(response) {
  messageBox.textContent = response.message;
  messageBox.classList.add("message-box-show");
  messageBox.style.background = `var(--${response.bgColor})`;
  setTimeout(() => {
    messageBox.classList.remove("message-box-show");
  }, 3000);
  inputtedText = "";
  return inputtedText;
}
circleBtn.addEventListener("click", () => {
  let SuccessMsg = {
    message: "Congratulations! todo added.",
    bgColor: "Success-Bg-Color",
  };
  let errMsg = {
    message: "Ahh shot! todo is empty.",
    bgColor: "error-Bg-Color",
  };

  inputtedText ? MessageToDisplay(SuccessMsg) : MessageToDisplay(errMsg);
});
console.log("first todo in todosObj is:", todosObj.one);
// let dot = JSON.stringify(todosObj);
// console.log(dot)
// let dos = JSON.parse(dot);
// console.log(dos)

let parsedTodos = JSON.parse(localStorage.getItem("todos"));
//console.log(parsedTodos)
let theme = localStorage.getItem("theme");

if (parsedTodos) {
  no_todo.style.display = "none";
  console.log("todo is present in local storage");
  for (let todo in parsedTodos) {
    // console.log(todo)
    let inputtedText = parsedTodos[todo].text;
    let todoClass = parsedTodos[todo].class;

    let newDiv = document.createElement("div");
    newDiv.className = "todo";
    newDiv.classList.add(todoClass);
    newDiv.innerHTML = `<div class="circle">
        <div class="check-wrapper">
          <img src="images/icon-check.svg" alt="check">
        </div>
      </div>
      <div class="wrap">
      <p class="todo-content">${inputtedText}</p>
      <img src="images/icon-cross.svg" alt="" class="cross"></div>`;
    todos.appendChild(newDiv);
  }
} else {
  console.log("todo is absent in local storage");
}

toggle.addEventListener("click", (e) => {
  let body = document.querySelector("body");
  let theme;
  body.classList.toggle("light");
  if (body.classList.contains("light")) {
    theme = "light";
  } else {
    theme = "ligh";
  }

  localStorage.setItem("theme", theme);
});

// crosses.forEach(cross => {
//     cross.addEventListener('click', e => {
//         let todos = document.querySelector('.todos');
//         let todo = cross.parentElement.parentElement;
//         todo.classList.add('remove');
//         setTimeout(function(){
//             todos.removeChild(todo);
//         },300)
//     })
// })

todos.addEventListener("click", (e) => {
  if (e.target.className == "cross") {
    let cross = e.target;
    let todo = cross.parentElement.parentElement;
    todo.classList.add("remove");
    setTimeout(function () {
      todos.removeChild(todo);
      alltodo.pop(todo);
    }, 300);
    checkTodo();
  }

  remainingActiveTodo.textContent = getActiveTodos() - 1;
});

todos.addEventListener("click", (e) => {
  if (e.target.className == "circle") {
    let circle = e.target;
    let todo = circle.parentElement;

    // todo.classList.contains('completed') ? todo.classList.remove('completed') : todo.classList.add('completed');

    if (todo.classList.contains("completed")) {
      todo.classList.remove("completed");
    } else {
      todo.classList.add("completed");
    }

    remainingActiveTodo.textContent = getActiveTodos();
  }
});

inputEl.addEventListener("blur", (e) => {
  inputtedText = e.target.value;

  if (inputtedText != "") {
    //console.log('The inputted todo is: ', inputtedText);

    no_todo.style.display = "none";

    let newTodo = document.createElement("DIV");
    newTodo.className = "todo";
    newTodo.setAttribute("draggable", "true");

    let todos = document.querySelector(".todos");

    newTodo.innerHTML = `<div class="circle">
    <div class="check-wrapper">
      <img src="images/icon-check.svg" alt="check">
    </div>
  </div>
  <div class="wrap">
  <p class="todo-content">${inputtedText}</p>
  <img src="images/icon-cross.svg" alt="" class="cross"></div>`;
    todos.appendChild(newTodo);
    e.target.value = "";
    remainingActiveTodo.textContent = getActiveTodos();

    alltodo.push(newTodo);

    let index = document.querySelectorAll(".todo").length;

    todosObj[index] = {
      text: inputtedText,
      class: "incomplete",
      dataCount: index + 1,
    };

    console.log(todosObj);

    localStorage.setItem("todos", JSON.stringify(todosObj));
    //   todosObj.push(newTodo);
    //   localStorage.setItem('todos',todosObj);
    //   console.log(JSON.parse(localStorage.getItem('todos')))
  } else {
    //console.log('Inputted text is empty')
    return;
  }
});

function getActiveTodos() {
  let allTodos = [...todos.querySelectorAll(".todo")];
  let todoItemsLeft = document.querySelector(".number");
  //console.log(todoItemsLeft)

  //console.log(allTodos)
  let active = allTodos.filter((todo) => {
    return !todo.classList.contains("completed");
  });

  //console.log(active.length + ' active todos left');
  //console.log(active);

  return active.length;
}

let filters = [...document.querySelectorAll(".filter")];
//console.log(filters);

filterFun(filters[1], filterActive);
filterFun(filters[0], displayAll);
filterFun(filters[2], displayCompleted);

function filterFun(filter, callback) {
  filter.addEventListener("click", (e) => {
    callback();
  });
}

function filterActive() {
  let allTodo = [...document.querySelectorAll(".todo")];
  displayAll();
  let active = allTodo.filter((todo) => {
    return todo.classList.contains("completed");
  });

  active.forEach((each) => {
    console.log(each);
    each.style.display = "none";
  });
}

function displayAll() {
  let allTodo = [...document.querySelectorAll(".todo")];
  clearFilters();
  allTodo.forEach((each) => {
    each.style.display = "flex";
  });
}

function displayCompleted() {
  let allTodo = [...document.querySelectorAll(".todo")];
  displayAll();
  let notcompleted = allTodo.filter((todo) => {
    return !todo.classList.contains("completed");
  });

  notcompleted.forEach((each) => {
    each.style.display = "none";
  });
}

function clearFilters() {
  let todo = [...document.querySelectorAll(".filter")];
  todo.forEach((each) => {
    each.classList.remove("selected");
  });
}

document.querySelectorAll(".filter").forEach((each) => {
  each.addEventListener("click", (e) => {
    clearFilters();
    each.classList.add("selected");
  });
});

document.querySelector(".clear").addEventListener("click", (e) => {
  let todos = [...document.querySelectorAll(".todo")];

  let completed = todos.filter((todo) => {
    return todo.classList.contains("completed");
  });

  completed.forEach((each) => {
    each.classList.add("remove");
    setTimeout(function () {
      let todos = document.querySelector(".todos");
      todos.removeChild(each);
    }, 300);
  });
});

//drag and drop functonality

alltodo.forEach((eachTodo, ind) => {
  eachTodo.addEventListener("dragstart", (e) => {
    console.log(`Drag started for todo number ${ind + 1}`);
    eachTodo.classList.add("dragging");
  });
  eachTodo.addEventListener("dragend", (e) => {
    console.log(`Drag stopped for todo number ${ind + 1}`);
  });
  eachTodo.addEventListener("dragover", (e) => {
    console.log(`Dragging over todo number ${ind + 1}`);
  });
});

function checkTodo() {
  let todosNum = todos.querySelectorAll(".todo").length;
  //console.log(todos);

  if (todosNum === 1) {
    console.log("here is ", no_todo);
    no_todo.style.display = "flex";
  } else {
    console.log(no_todo, "not here");
    //no_todo.style.color = 'green';
    no_todo.style.display = "none";
  }
}
