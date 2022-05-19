//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);


//Functions

function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();

  //Todo DIV

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TO DO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  //Checked button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Thrash button

  const thrashButton = document.createElement("button");
  thrashButton.innerHTML = '<i class="fas fa-trash"></i>';
  thrashButton.classList.add("thrash-btn");
  todoDiv.appendChild(thrashButton);

  //Append to list

  todoList.appendChild(todoDiv);

  //Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //Delete Todo
  if (item.classList[0] === "thrash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Checkmark

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveLocalTodos(todo){
 let todos;
 if(localStorage.getItem('todos') === null){
     todos = [];
 }else{
     todos = JSON.parse(localStorage.getItem('todos'));
 }

 todos.push(todo);
 localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
   todos.forEach(function(todo){
         //Todo DIV

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI

  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Checked button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Thrash button

  const thrashButton = document.createElement("button");
  thrashButton.innerHTML = '<i class="fas fa-trash"></i>';
  thrashButton.classList.add("thrash-btn");
  todoDiv.appendChild(thrashButton);

  //Append to list

  todoList.appendChild(todoDiv);

   })
}

function removeLocalTodos(todo){
    let todos;
 if(localStorage.getItem('todos') === null){
     todos = [];
 }else{
     todos = JSON.parse(localStorage.getItem('todos'));
 }
 const todoIndex = todo.children[0].innerText;
 todos.splice(todos.indexOf(todoIndex), 1);
 localStorage.setItem('todos', JSON.stringify(todos));
}