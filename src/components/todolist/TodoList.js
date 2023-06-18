import React from "react";
import "./todolist.styles.scss";
import { useTodos } from "../../contexts/todoContext";
import Todo from "../todo/Todo";
import { MdAdd } from "react-icons/md";

const TodoList = () => {
  // get state and setter function from Custom Hook
  const { todos, handleAdd, setTodoText, todoText } = useTodos();

  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  // clear function to clear the input when user submit
  const clear = () => {
    setTodoText("");
  };

  return (
    <div className="todolist-container">
      <h1>TODO</h1>
      <form
        onSubmit={(e) => {
          handleAdd(e, todoText);
          clear();
        }}
        className="todolist-input"
      >
        <input
          type="text"
          placeholder="Add todo"
          value={todoText}
          onChange={handleChange}
        />
        <button>
          <MdAdd />
        </button>
      </form>
      <div className="listItem">
        <ul>
          {todos &&
            todos.map((todo, i) => {
              return (
                <li key={i}>
                  <Todo {...todo} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
