"use strict";

{
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodo = (todo) => {
    // - li
    // - label
    // - input
    // - span
    // - button
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.isCompleted;
    input.addEventListener("change", () => {
      todos.forEach((item) => {
        if (item.id === todos.id) {
          item.isCmpleted = !item.isCmpleted;
        }
      });
    saveTodos();
    });
    
    const span = document.createElement("span");
    span.textContent = todo.title;
    const label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(span);
    const button = document.createElement("button");
    button.textContent = "x";
    button.addEventListener("click", () => {
      //  if (confirm("sure?") === false) {
      if (!confirm("sure?")) {
        return;
      }
      li.remove();
      todos = todos.filter((item) => {
        return item.id !== todo.id;
      });
      saveTodos();
    });
    const li = document.createElement("li");
    li.appendChild(label);
    li.appendChild(button);
    document.querySelector("#todos").appendChild(li);
  };

  const renderTodos = () => {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  };

  document.querySelector("#add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#add-form input");
    const todo = {
      id: Date.now(),
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);
    console.table(todos);
    saveTodos();
    input.value = "";
    input.focus();
  });

  document.querySelector("#purge").addEventListener("click", () => {
    if (!confirm("sure?")) {
      return;
    }
    todos = todos.filter((todo) => {
      return todo.isCmpleted === false;
    });
    saveTodos();
    document.querySelectorAll("#todos li").forEach((li) => {
      li.remove();
  });
  renderTodos(); 
  

    });
    renderTodos();
  }

  
