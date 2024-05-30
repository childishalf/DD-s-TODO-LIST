document.addEventListener('DOMContentLoaded', function() {
    let userName = localStorage.getItem('userName');
    
    if (!userName) {
      userName = prompt('Please enter your name:');
      if (userName) {
        localStorage.setItem('userName', userName);
        alert(`Welcome to the to-do list, ${userName}!`);
      }
    } else {
      alert(`Welcome back to the to-do list, ${userName}!`);
    }
    
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
      addTask(task.text);
    });
  });
  
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  
  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = todoInput.value;
  
    if (newTask === '') {
      alert('Please enter a task!');
      return;
    }
    todoInput.value = '';
    addTask(newTask);
  });
  
  function addTask(task) {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);
  
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkBox);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete'); // Add class 'delete' for styling
    listItem.appendChild(deleteButton);
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit'); // Add class 'edit' for styling
    listItem.appendChild(editButton);
  
    todoList.appendChild(listItem);
  
    checkBox.addEventListener('change', function() {
      if (this.checked) {
        taskText.style.textDecoration = 'line-through';
      } else {
        taskText.style.textDecoration = 'none';
      }
    });
  
    deleteButton.addEventListener('click', function() {
      todoList.removeChild(listItem);
      saveTasksToLocalStorage();
    });
  
    editButton.addEventListener('click', function() {
      const isEditing = listItem.classList.contains('editing');
  
      if (isEditing) {
        const input = listItem.querySelector('input[type="text"]');
        taskText.textContent = input.value;
        listItem.removeChild(input);
        listItem.insertBefore(taskText, checkBox);
        listItem.classList.remove('editing');
        editButton.textContent = 'Edit';
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskText.textContent;
        listItem.insertBefore(input, taskText);
        listItem.removeChild(taskText);
        listItem.classList.add('editing');
        editButton.textContent = 'Save';
      }
  
      saveTasksToLocalStorage();
    });
  
    saveTasksToLocalStorage();
  }
  
  function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.querySelector('input[type="checkbox"]').checked;
      tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  