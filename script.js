let tasks = [];  // Array for task storage

// Saves the tasks in case the screen is refreshed
const saveTasks = () =>
{
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    updateTasksList();
    updateStats(); // if you're using stats
  }
};

window.onload = loadTasks;

const addTask = () => 
{
  const taskinput = document.getElementById("taskinput");
  const text = taskinput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTasksList();
    taskinput.value = "";
  }
  updateStats();
  saveTasks();
};

const toggleTaskComplete = (index) => 
{
  tasks[index].completed = !tasks[index].completed;
  updateTasksList(); 
  updateStats();
  saveTasks();
};

const deleteTask = (index) => 
{
  tasks.splice(index, 1); 
  updateTasksList();     
  updateStats();
  saveTasks();
};

const editTask = (index) =>
{
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    updateTasksList();
  }
  updateStats();
  saveTasks();
};

const updateStats = () => 
{
  const completeTasks = tasks.filter(task => task.completed).length;
  const totalTask = tasks.length;
  const progress = totalTask > 0 ? (completeTasks / totalTask) * 100 : 0;
  const progressBar = document.getElementById('progress');

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  document.getElementById('numbers').innerText = `${completeTasks} / ${totalTask}`;

};

function updateTasksList() 
{
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task, index) => 
    {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked'  : ''}>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Edit" class="edit-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" class="delete-btn">
        </div>
      </div>
    `;
    

    const checkbox = listItem.querySelector(".checkbox");
    checkbox.style.accentColor = "green"; 
    checkbox.addEventListener('change', () => toggleTaskComplete(index));

    const editBtn = listItem.querySelector(".edit-btn");
    editBtn.addEventListener('click', () => editTask(index));
    
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener('click', () => deleteTask(index));
    list.appendChild(listItem);
  });
}

document.getElementById("newtask").addEventListener('click', function (e) 
{
  e.preventDefault();
  addTask();
});




