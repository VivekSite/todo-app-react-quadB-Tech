import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");
  // const [id, setId] = useState();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    setTodos(storedTodos ? JSON.parse(storedTodos) : []);

    if(!storedTodos) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedData = JSON.parse(storedTodos);

      const newData = {
        id: Date.now(),
        text: desc,
        completed: false,
      };
      parsedData.push(newData);
      localStorage.setItem("todos", JSON.stringify(parsedData));
      setTodos(parsedData);
    }
  };

  const toggleCompleted = (id) => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      let parsedData = JSON.parse(storedTodos);
      const filteredData = parsedData.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      setTodos(filteredData);
      localStorage.setItem("todos", JSON.stringify(filteredData));
    }
  };

  const deleteTodo = (id) => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      let parsedData = JSON.parse(storedTodos);
      const filteredData = parsedData.filter((todo) => todo.id !== id);

      setTodos(filteredData);
      localStorage.setItem("todos", JSON.stringify(filteredData));
    }
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new todo..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="desc"
        />
        <button className="add_todo_btn" type="submit">Add Todo</button>
      </form>

    {/* Populate all the Todos */}
      <table>
        <thead>
          <tr>
            <th className="table_col">Id</th>
            <th className="table_col">Description</th>
            <th className="table_col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleCompleted={toggleCompleted}
              onDelete={deleteTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
