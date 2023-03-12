const toggle = document.querySelector('.theme-toggle-wrapper');
let crosses = document.querySelectorAll('.cross');
let inputEl = document.querySelector('#new-todo');
let todos = document.querySelector('.todos');
let remainingActiveTodo = document.querySelector('.number');
let alltodo = [...document.querySelectorAll('.todo')];

let body = document.querySelector('body').classList.add(localStorage.getItem('theme'));

let todosObj = {
    todos: {},
    theme : ''
};

let parsedTodos = JSON.parse(localStorage.getItem('todos'));
let theme = localStorage.getItem('theme');

if(parsedTodos){
    let todosArr = Object.values(parsedTodos.todos);
    todosArr.forEach((each, index) => {
        let newTodo = document.createElement('div');
    newTodo.className = 'todo';

    newTodo.innerHTML = `<div class="circle">
    <div class="check-wrapper">
      <img src="images/icon-check.svg" alt="check">
    </div>
  </div>
  <div class="wrap">
  <p class="todo-content">${parsedTodos.todos[0]}</p>
  <img src="images/icon-cross.svg" alt="" class="cross"></div>`;
  todos.appendChild(newTodo);
  e.target.value = '';
  remainingActiveTodo.textContent = getActiveTodos();

  alltodo.push(newTodo);
    })
    
}


toggle.addEventListener('click', e => {

    let body = document.querySelector('body');
    let theme;
    body.classList.toggle('light');
    if(body.classList.contains('light')){
       theme = 'light';
    }else{
        theme = 'ligh';
    }

    localStorage.setItem('theme', theme);
})

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

todos.addEventListener('click', e => {
    if(e.target.className == 'cross'){
        let cross = e.target;
        //console.log(cross);
        let todo = cross.parentElement.parentElement;
         todo.classList.add('remove');
        setTimeout(function(){
            todos.removeChild(todo);
            alltodo.pop(todo)
        },300);

      
        
    }

    remainingActiveTodo.textContent = getActiveTodos() - 1;
})

todos.addEventListener('click', e => {
    if(e.target.className == 'circle'){
        let circle = e.target;
        let todo = circle.parentElement;

        // todo.classList.contains('completed') ? todo.classList.remove('completed') : todo.classList.add('completed');

        if(todo.classList.contains('completed')){
            todo.classList.remove('completed');
        }else{
            todo.classList.add('completed');

        }
        
        remainingActiveTodo.textContent = getActiveTodos() ;
    }
})



inputEl.addEventListener('blur', e => {

    let inputtedText = e.target.value;

    if(inputtedText != ''){
    //console.log('The inputted todo is: ', inputtedText);

    let newTodo = document.createElement('DIV');
    newTodo.className = 'todo';
    newTodo.setAttribute('draggable','true')

    let todos = document.querySelector('.todos');

    newTodo.innerHTML = `<div class="circle">
    <div class="check-wrapper">
      <img src="images/icon-check.svg" alt="check">
    </div>
  </div>
  <div class="wrap">
  <p class="todo-content">${inputtedText}</p>
  <img src="images/icon-cross.svg" alt="" class="cross"></div>`;
  todos.appendChild(newTodo);
  e.target.value = '';
  remainingActiveTodo.textContent = getActiveTodos();

  alltodo.push(newTodo);

    }else{
        //console.log('Inputted text is empty')
        return
    }
})

function getActiveTodos(){
    let allTodos = [...todos.querySelectorAll('.todo')];
    let todoItemsLeft = document.querySelector('.number');
    //console.log(todoItemsLeft)

    //console.log(allTodos)
     let active = allTodos.filter((todo) => {
         return !todo.classList.contains('completed');
     })

    //console.log(active.length + ' active todos left');
     //console.log(active);
     
         return active.length;
}


let filters = [...document.querySelectorAll('.filter')];
//console.log(filters);

filterFun(filters[1],filterActive)
filterFun(filters[0],displayAll)
filterFun(filters[2],displayCompleted)

function filterFun(filter,callback){
    filter.addEventListener('click', e => {
     
        callback();
    })
}

function filterActive(){
    let allTodo = [...document.querySelectorAll('.todo')];
    displayAll()
    let active = allTodo.filter(todo => {
        return todo.classList.contains('completed');
    })



    active.forEach(each => {
        console.log(each)
        each.style.display = 'none';
    })


}

function displayAll(){
    let allTodo = [...document.querySelectorAll('.todo')];
    clearFilters();
    allTodo.forEach(each => {
        each.style.display = 'flex';
    })
}

function displayCompleted(){
    let allTodo = [...document.querySelectorAll('.todo')];
    displayAll()
    let notcompleted = allTodo.filter(todo => {
        return !todo.classList.contains('completed');
    })

    notcompleted.forEach(each => {
        each.style.display = 'none';
    })
}

function clearFilters(){
    let todo = [...document.querySelectorAll('.filter')];
    todo.forEach(each => {
        each.classList.remove('selected');
    })
}


document.querySelectorAll('.filter').forEach(each => {
    each.addEventListener('click', e => {
        clearFilters()
        each.classList.add('selected');
    })
})


document.querySelector('.clear').addEventListener('click' , e => {
    let todos = [...document.querySelectorAll('.todo')];

    let completed = todos.filter(todo => {
        return todo.classList.contains('completed');
    })

    completed.forEach(each => {
        each.classList.add('remove');
        setTimeout(function(){
            let todos = document.querySelector('.todos')
            todos.removeChild(each);
        },300);
    })
})

//drag and drop functonality

alltodo.forEach((eachTodo, ind) => {
    eachTodo.addEventListener('dragstart', e => {
        
        console.log(`Drag started for todo number ${ind + 1}`);
        eachTodo.classList.add('dragging');
    })
    eachTodo.addEventListener('dragend', e => {
        
        console.log(`Drag stopped for todo number ${ind + 1}`)
    })
    eachTodo.addEventListener('dragover', e => {
        
        console.log(`Dragging over todo number ${ind + 1}`)
    })
})