import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { Context } from "./context";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "First todo", completed: false },
    { id: 2, title: "Second todo", completed: true }
  ]);

  const [todoTitle, setTodoTitle] = useState("");

  const handleClick = () => {
    console.log("click");
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [todos]);

  const changeInput = ({ target: { value } }) => {
    setTodoTitle(value);
  };

  const addItem = event => {
    if (event.key === "Enter") {
      setTodos([
        ...todos,
        { id: Date.now(), title: todoTitle, completed: false }
      ]);
      setTodoTitle("");
    }
  };

  const deleteItem = id => {
    setTodos(
      todos.filter(item => {
        return item.id !== id;
      })
    );
  };

  const toogleTodo = id => {
    setTodos(
      todos.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    );
  };

  return (
    <Context.Provider value={{ deleteItem, toogleTodo }}>
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={changeInput}
            onKeyPress={addItem}
          />
          <label>Todo name</label>
        </div>

        <TodoList todos={todos} />
      </div>
    </Context.Provider>
  );
}
