import React, { useState, useContext } from "react";
import "./index.css";
import { Context } from "./context";

export default function TodoItem({ title, id, completed }) {
  const { deleteItem, toogleTodo } = useContext(Context);

  const cls = completed ? "todo completed" : "todo";

  return (
    <li className={cls}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toogleTodo(id)}
        />
        <span>{title}</span>

        <i className="material-icons red-text" onClick={() => deleteItem(id)}>
          delete
        </i>
      </label>
    </li>
  );
}
