import autoAnimate from "@formkit/auto-animate";

function displayTodos() {
    const localTodos = JSON.parse(localStorage.getItem("todos"));

    document.querySelector("#todo-list").innerHTML = "";

    localTodos.forEach(todo => {
        addTodoToDOM(todo);
    });
}


function addTodo(e) {
    e.preventDefault();

    let title;
    if (e.target.firstElementChild.value) title = e.target.firstElementChild.value;
    else return;

    e.target.firstElementChild.value = "";

    if (title == "burhanaltintop") { // Little surprise
        document.body.style.backgroundImage = "url('./burhan_altintop.jpg')";
        setTimeout(() => {
            document.body.style.backgroundImage = "";
        }, 5000);
        return;
    }

    addTodoLocal(title);
}


function addTodoLocal(title) {
    const localTodos = JSON.parse(localStorage.getItem("todos"));

    let id;
    if (!localTodos.length) id = 1;
    else id = localTodos[localTodos.length - 1].id + 1;

    let newTodo = {
        title,
        id,
        completed: false,
    }

    localTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(localTodos));

    addTodoToDOM(newTodo);
}


function addTodoToDOM(todo) {
    const todoListElem = document.querySelector("#todo-list");

    const todoElem = document.createElement("div");
    todoElem.className = "todo";
    todoElem.dataset.id = todo.id;
    todoElem.dataset.completed = todo.completed;
    todoElem.innerHTML = `<p>${todo.title}</p> <i class="fa-solid fa-xmark"></i>`;
    
    if (todo.completed) {
        todoElem.classList.add("completed");
        todoListElem.append(todoElem);    
    } else {
        todoListElem.prepend(todoElem);
    }    
}


function deleteTodo(e) {
    if (e.target.tagName != "I") return;

    const todoElem = e.target.parentElement;
    const id = todoElem.dataset.id;

    deleteTodoLocal(id);
    deleteTodoFromDOM(todoElem);
}


function deleteTodoLocal(id) {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
        
    localTodos = localTodos.filter((todo) => {
        return todo.id != id;
    });

    localStorage.setItem("todos", JSON.stringify(localTodos));
}

function deleteTodoFromDOM(todoElem) {
    const parentElement = document.querySelector("#todo-list");
    parentElement.removeChild(todoElem);
}


function toggleTodo(e) {
    if (!e.target.classList.contains("todo")) {
        if (e.target.tagName != "P") return;   
    }

    const todoElem = e.target.closest("div");
    toggleTodoLocal(todoElem.dataset.id);
    toggleTodoDOM(todoElem);
}


function toggleTodoLocal(id) {
    const localTodos = JSON.parse(localStorage.getItem("todos"));

    localTodos.forEach(todo => {
        if (todo.id == id) { 
            todo.completed = !todo.completed; 
        }
    });

    localStorage.setItem("todos", JSON.stringify(localTodos));
}


function toggleTodoDOM(todoElem) {
    const parentElement = document.querySelector("#todo-list");
    if (todoElem.dataset.completed == "false") {
        todoElem.classList.add("completed");
        todoElem.dataset.completed = "true";
        parentElement.removeChild(todoElem);
        parentElement.append(todoElem);
    } else {
        todoElem.classList.remove("completed");
        todoElem.dataset.completed = "false";
        parentElement.removeChild(todoElem);
        parentElement.prepend(todoElem);
    }
}


function init() {
    if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", JSON.stringify([]));
    }
    const todoListElem = document.querySelector("#todo-list");
    autoAnimate(todoListElem, {
        duration: 150,
        easing: 'ease-in-out',
        disrespectUserMotionPreference: false
    });

    displayTodos();    
    document.querySelector("form").addEventListener("submit", addTodo);
    document.querySelector("#todo-list").addEventListener("click", deleteTodo);
    document.querySelector("#todo-list").addEventListener("click", toggleTodo);
}


document.addEventListener("DOMContentLoaded", init);
