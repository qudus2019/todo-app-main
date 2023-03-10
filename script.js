const toggle = document.querySelector('.theme-toggle-wrapper');
let crosses = document.querySelectorAll('.cross');
let inputEl = document.querySelector('#new-todo');
let todos = document.querySelector('.todos');

toggle.addEventListener('click', e => {
    document.querySelector('body').classList.toggle('light');
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
        console.log(cross);
        let todo = cross.parentElement.parentElement;
         todo.classList.add('remove');
        setTimeout(function(){
            todos.removeChild(todo);
        },300)

    }
})

todos.addEventListener('click', e => {
    if(e.target.className == 'circle'){
        let circle = e.target;
        let todo = circle.parentElement;
        todo.classList.add('completed');
    }
})



inputEl.addEventListener('blur', e => {
    let inputtedText = e.target.value;
    console.log('The inputted todo is: ', inputtedText);

    let newTodo = document.createElement('DIV');
    newTodo.className = 'todo';

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

  getActiveTodos()
})

function getActiveTodos(){
    let allTodos = [...todos.querySelectorAll('.todo')];
    let active = allTodos.filter((todo) => {
        return !todo.classList.contains('completed');
    })

    console.log(active.length);
    console.log(active)
        return active.length;
}