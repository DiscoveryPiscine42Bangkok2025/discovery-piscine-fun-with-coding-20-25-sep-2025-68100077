ex03/
├── index.html
└── todo.js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>To do or not to do</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      text-align: center;
    }

    #ft_list {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      margin-top: 20px;
    }

    .todo {
      background-color: #f3f3f3;
      border: 1px solid #ccc;
      padding: 10px 20px;
      margin: 5px;
      width: 300px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .todo:hover {
      background-color: #ffecec;
    }

    #new-btn {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <button id="new-btn">New</button>

  <div id="ft_list"></div>

  <script src="todo.js"></script>
</body>
</html>
// ฟังก์ชันโหลด TODO จาก cookie
function loadTodos() {
  const saved = getCookie("todos");
  if (saved) {
    try {
      const todos = JSON.parse(saved);
      todos.forEach(todoText => addTodo(todoText));
    } catch (e) {
      console.error("Failed to parse cookie:", e);
    }
  }
}

// ฟังก์ชันบันทึก TODO ไปยัง cookie
function saveTodos() {
  const todos = [];
  const todoElements = document.querySelectorAll("#ft_list .todo");
  todoElements.forEach(el => todos.unshift(el.innerText)); // บันทึกจากล่างขึ้นบน
  document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

// ฟังก์ชันเพิ่ม TODO ใหม่
function addTodo(text) {
  if (!text) return;

  const todo = document.createElement("div");
  todo.className = "todo";
  todo.innerText = text;

  todo.addEventListener("click", () => {
    const confirmed = confirm("Do you really want to delete this task?");
    if (confirmed) {
      todo.remove();
      saveTodos();
    }
  });

  const list = document.getElementById("ft_list");
  list.appendChild(todo);

  saveTodos();
}

// ฟังก์ชันดึง cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  ret
