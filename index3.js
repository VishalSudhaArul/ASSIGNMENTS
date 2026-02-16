// MERN STACK FOUNDATION – TASK MANAGER

let tasks = [];
let nextId = 1;


const addTask = (title) => {

  if (!title || title.trim() === "") {
    console.log(" Task title cannot be empty");
    return;
  }

  const newTask = {
    id: nextId++,
    title,
    status: "pending"
  };

  tasks.push(newTask);
  console.log(` Task added: ${title}`);
};


// GET ALL TASKS (console.table)

const getAllTasks = () => {

  if (tasks.length === 0) {
    console.log("No tasks available");
    return;
  }

  console.log("\n ALL TASKS");
  console.table(tasks);
};


// 
// COMPLETE TASK (Using find + map)

const completeTask = (id) => {

  const task = tasks.find(task => task.id === id);

  if (!task) {
    console.log("Task not found");
    return;
  }
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, status: "completed" }
      : task
  );

  console.log(` Task ${id} marked as completed`);
};


// DELETE TASK (Using filter)


const deleteTask = (id) => {

  const taskExists = tasks.find(task => task.id === id);

  if (!taskExists) {
    console.log(" Task not found");
    return;
  }

  tasks = tasks.filter(task => task.id !== id);

  console.log(`Task ${id} deleted successfully`);
};



console.log("\n********TASK MANAGER START *********");

// Add tasks
addTask("Learn JavaScript");
addTask("Practice MERN Stack");
addTask("Build Portfolio Project");

// View tasks
getAllTasks();

// Complete a task
completeTask(2);

// View again
getAllTasks();

// Delete a task
deleteTask(1);

// Final view
getAllTasks();

console.log("\n TASK MANAGER END ");
